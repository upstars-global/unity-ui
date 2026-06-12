#!/usr/bin/env node

import { mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const rootDir = process.cwd()
const colorsPresetPath = path.join(rootDir, 'src/tailwind/presets/colors.preset.ts')
const layoutPresetPath = path.join(rootDir, 'src/tailwind/presets/layout.preset.ts')
const componentsDir = path.join(rootDir, 'src/components')
const themesRootDir = path.join(rootDir, 'src/themes')

const args = new Set(process.argv.slice(2))
const shouldWrite = args.has('--write')

const COLOR_UTILITIES = new Set([
    'accent',
    'bg',
    'border',
    'caret',
    'decoration',
    'fill',
    'from',
    'outline',
    'placeholder',
    'ring',
    'stroke',
    'text',
    'to',
    'via',
])

const SPACING_UTILITIES = new Set([
    'bottom',
    'gap',
    'h',
    'inset',
    'inset-x',
    'inset-y',
    'left',
    'm',
    'max-h',
    'max-w',
    'mb',
    'min-h',
    'min-w',
    'ml',
    'mr',
    'mt',
    'mx',
    'my',
    'p',
    'pb',
    'pl',
    'pr',
    'pt',
    'px',
    'py',
    'right',
    'rounded',
    'rounded-b',
    'rounded-bl',
    'rounded-br',
    'rounded-l',
    'rounded-r',
    'rounded-t',
    'rounded-tl',
    'rounded-tr',
    'top',
    'w',
])

const CLASS_TOKEN_REGEX = /[!@%\w:[\]/.-]+-\[var\((--[a-z0-9-]+)\)\]/gi
const ARBITRARY_PROPERTY_REGEX = /((?:[!@%\w./\[\]-]+:|\[[^\]]+\]:)*)\[([a-z-]+):([^\]]*var\(--component-[a-z0-9-]+\)[^\]]*)\]/gi
const PRESET_ENTRY_REGEX = /^\s*(?:'([^']+)'|([A-Za-z0-9_-]+)):\s*'[^']*var\((--[A-Za-z0-9-]+)\)[^']*'/gm
const CSS_VAR_DEFINITION_REGEX = /(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/g
const PRESET_SECTION_REGEX = /([A-Za-z0-9_-]+):\s*{([\s\S]*?)^\s*}/gm
const PRESET_VALUE_ENTRY_REGEX = /^\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z0-9_.-]+)):\s*["']([^"']+)["']/gm
const RUNTIME_IMPORT_REGEX = /^\s*import\s+(?!type\b)(?:[\s\S]*?\sfrom\s+)?['"](.+?)['"]/gm

type Predicate = (filePath: string) => boolean
type PresetVars = Map<string, string>
type ValueToKeyMap = Map<string, string>
type CssDefinitions = Map<string, string>
type ResolvedCssValue = {
    kind: 'literal' | 'var'
    value: string
    lastVar: string
    presetVar: string | null
}
type TransformMeta = {
    unresolved: Set<string>
    replacements: number
}
type BaseTransformContext = {
    definitions: CssDefinitions
    presetVars: PresetVars
    spacingValueToKey: ValueToKeyMap
    radiusValueToKey: ValueToKeyMap
    borderWidthValueToKey: ValueToKeyMap
    opacityValueToKey: ValueToKeyMap
}
type RuntimeTransformContext = BaseTransformContext & {
    meta: TransformMeta
}
type GeneratedThemeOutput = {
    generatedSource: string
    replacements: number
    unresolved: string[]
}
type GeneratedThemeFileResult = {
    changed: boolean
    filePath: string
    generatedFilePath: string
    replacements: number
    unresolved: string[]
}

function walkFiles(dirPath: string, predicate: Predicate): string[] {
    const result = []

    for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
        const entryPath = path.join(dirPath, entry.name)

        if (entry.isDirectory()) {
            result.push(...walkFiles(entryPath, predicate))
            continue
        }

        if (predicate(entryPath)) {
            result.push(entryPath)
        }
    }

    return result
}

function parsePresetVars(filePath: string): PresetVars {
    const source = readFileSync(filePath, 'utf8')
    const varToTailwindColor = new Map()

    for (const match of source.matchAll(PRESET_ENTRY_REGEX)) {
        const colorKey = match[1] ?? match[2]
        const cssVarName = match[3]

        if (!colorKey || !cssVarName) {
            continue
        }

        varToTailwindColor.set(cssVarName, colorKey)
    }

    return varToTailwindColor
}

function parseValuePresetMap(filePath: string, sectionNames: Set<string>): ValueToKeyMap {
    const source = readFileSync(filePath, 'utf8')
    const valueToKey = new Map()

    for (const sectionMatch of source.matchAll(PRESET_SECTION_REGEX)) {
        const sectionName = sectionMatch[1]
        const sectionBody = sectionMatch[2]

        if (!sectionName || !sectionBody || !sectionNames.has(sectionName)) {
            continue
        }

        for (const entryMatch of sectionBody.matchAll(PRESET_VALUE_ENTRY_REGEX)) {
            const key = entryMatch[1] ?? entryMatch[2] ?? entryMatch[3]
            const value = entryMatch[4]?.trim()

            if (!key || !value) {
                continue
            }

            valueToKey.set(value, key)
        }
    }

    return valueToKey
}

function resolvePresetScalarValue(value: string, definitions: CssDefinitions): string {
    const aliasMatch = value.match(/^var\((--[A-Za-z0-9-]+)\)$/)

    if (!aliasMatch) {
        return value
    }

    const resolvedValue = resolveCssValue({
        cssVarName: aliasMatch[1],
        definitions,
        presetVars: new Map(),
    })
    return resolvedValue?.value ?? value
}

function parseResolvedValuePresetMap({
    filePath,
    sectionNames,
    definitions,
}: {
    filePath: string
    sectionNames: Set<string>
    definitions: CssDefinitions
}): ValueToKeyMap {
    const rawValueToKey = parseValuePresetMap(filePath, sectionNames)
    const resolvedValueToKey = new Map()

    for (const [value, key] of rawValueToKey.entries()) {
        resolvedValueToKey.set(resolvePresetScalarValue(value, definitions), key)
    }

    return resolvedValueToKey
}

function parseCssVariables(filePaths: string[]): CssDefinitions {
    const definitions = new Map()

    for (const filePath of filePaths) {
        const source = readFileSync(filePath, 'utf8')

        for (const match of source.matchAll(CSS_VAR_DEFINITION_REGEX)) {
            const variableName = match[1]
            const value = match[2]?.trim()

            if (!variableName || !value) {
                continue
            }

            definitions.set(variableName, value)
        }
    }

    return definitions
}

function resolveCssValue({
    cssVarName,
    definitions,
    presetVars,
}: {
    cssVarName: string
    definitions: CssDefinitions
    presetVars: PresetVars
}): ResolvedCssValue {
    const seen = new Set()
    let current = cssVarName
    let presetVar = null
    let lastVar = cssVarName

    while (current && !seen.has(current)) {
        lastVar = current

        if (presetVars.has(current)) {
            presetVar = current

            return {
                kind: 'var',
                value: current,
                lastVar,
                presetVar,
            }
        }

        seen.add(current)
        const definition = definitions.get(current)

        if (!definition) {
            return {
                kind: 'var',
                value: current,
                lastVar,
                presetVar,
            }
        }

        const aliasMatch = definition.match(/^var\((--[A-Za-z0-9-]+)\)$/)

        if (!aliasMatch) {
            return {
                kind: 'literal',
                value: definition,
                lastVar,
                presetVar,
            }
        }

        current = aliasMatch[1]
    }

    return {
        kind: 'var',
        value: current,
        lastVar,
        presetVar,
    }
}

function getUtilityBase(classToken: string): string | null {
    const arbitraryValueIndex = classToken.indexOf('-[var(')

    if (arbitraryValueIndex === -1) {
        return null
    }

    const utilityBase = classToken.slice(0, arbitraryValueIndex)
    const lastSegment = utilityBase.split(':').pop() ?? utilityBase
    const normalizedUtility = lastSegment.startsWith('!') ? lastSegment.slice(1) : lastSegment

    return ARBITRARY_VALUE_UTILITIES.has(normalizedUtility)
        ? utilityBase
        : null
}

function statSyncSafe(filePath: string) {
    try {
        return statSync(filePath)
    } catch {
        return null
    }
}

function getGeneratedThemePath(filePath: string, themeDir: string): string {
    const componentName = path.basename(path.dirname(filePath))
    return path.join(themeDir, 'components', componentName, 'theme.generated.ts')
}

function normalizeArbitraryValue(value: string): string {
    return value.replace(/\s+/g, '_')
}

function getNormalizedUtility(utilityBase: string): string {
    const lastSegment = utilityBase.split(':').pop() ?? utilityBase
    return lastSegment.startsWith('!') ? lastSegment.slice(1) : lastSegment
}

function normalizeScalarForLookup(value: string): string {
    const normalized = value.trim()

    if (/^(?:0?\.\d+|[1-9]\d*(?:\.\d+)?)$/.test(normalized)) {
        return String(Number(normalized))
    }

    return normalized
}

function isColorValue(resolvedValue: ResolvedCssValue): boolean {
    if (resolvedValue.kind === 'var') {
        return /^(--(?:color|bg|fg|content)-)/.test(resolvedValue.value)
    }

    return /^(rgb|rgba|hsl|hsla|#)/.test(resolvedValue.value)
}

function buildArbitraryUtilityClass(utilityBase: string, resolvedValue: ResolvedCssValue): string {
    if (resolvedValue.kind === 'var') {
        return `${utilityBase}-[var(${resolvedValue.value})]`
    }

    return `${utilityBase}-[${normalizeArbitraryValue(resolvedValue.value)}]`
}

function getRadiusKey(resolvedValue: ResolvedCssValue, radiusValueToKey: ValueToKeyMap): string | null {
    if (resolvedValue.kind === 'var') {
        return resolvedValue.value === '--radius-full' ? 'full' : null
    }

    if (resolvedValue.value === '100%') {
        return 'full'
    }

    return radiusValueToKey.get(resolvedValue.value) ?? null
}

function buildColorClass({
    utilityBase,
    resolvedValue,
    presetVars,
}: {
    utilityBase: string
    resolvedValue: ResolvedCssValue
    presetVars: PresetVars
}): string {
    const preferredPresetVar = resolvedValue.presetVar ?? (resolvedValue.kind === 'var' ? resolvedValue.value : null)
    const opacitySourceVar = resolvedValue.lastVar ?? preferredPresetVar

    if (preferredPresetVar) {
        const presetColor = presetVars.get(preferredPresetVar)

        if (presetColor) {
            return `${utilityBase}-${presetColor}`
        }
    }

    if (opacitySourceVar) {
        const opacityMatch = opacitySourceVar.match(/^(--(?:color|bg|fg|content)-.+)-(\d{1,3})$/)

        if (opacityMatch) {
            const baseVarName = opacityMatch[1]
            const opacity = opacityMatch[2]
            const basePresetColor = presetVars.get(baseVarName)

            if (basePresetColor) {
                return `${utilityBase}-${basePresetColor}/${opacity}`
            }
        }
    }

    if (resolvedValue.kind === 'var') {
        return `${utilityBase}-[var(${resolvedValue.value})]`
    }

    return `${utilityBase}-[${normalizeArbitraryValue(resolvedValue.value)}]`
}

function buildScaleClass({
    utilityBase,
    resolvedValue,
    spacingValueToKey,
    radiusValueToKey,
    borderWidthValueToKey,
    opacityValueToKey,
}: {
    utilityBase: string
    resolvedValue: ResolvedCssValue
    spacingValueToKey: ValueToKeyMap
    radiusValueToKey: ValueToKeyMap
    borderWidthValueToKey: ValueToKeyMap
    opacityValueToKey: ValueToKeyMap
}): string {
    const normalizedUtility = getNormalizedUtility(utilityBase)

    if (normalizedUtility.startsWith('rounded')) {
        const radiusKey = getRadiusKey(resolvedValue, radiusValueToKey)

        if (radiusKey) {
            return radiusKey === 'DEFAULT' ? utilityBase : `${utilityBase}-${radiusKey}`
        }
    } else if (normalizedUtility === 'border' && resolvedValue.kind === 'literal') {
        const borderWidthKey = borderWidthValueToKey.get(resolvedValue.value)

        if (borderWidthKey) {
            return borderWidthKey === 'DEFAULT' ? utilityBase : `${utilityBase}-${borderWidthKey}`
        }
    } else if (normalizedUtility === 'opacity' && resolvedValue.kind === 'literal') {
        const opacityKey = opacityValueToKey.get(normalizeScalarForLookup(resolvedValue.value))

        if (opacityKey) {
            return `${utilityBase}-${opacityKey}`
        }
    } else if (resolvedValue.kind === 'literal') {
        const spacingKey = spacingValueToKey.get(resolvedValue.value)

        if (spacingKey) {
            return `${utilityBase}-${spacingKey}`
        }
    }

    return buildArbitraryUtilityClass(utilityBase, resolvedValue)
}

function buildUtilityClass({
    utilityBase,
    resolvedValue,
    presetVars,
    spacingValueToKey,
    radiusValueToKey,
    borderWidthValueToKey,
    opacityValueToKey,
}: {
    utilityBase: string
    resolvedValue: ResolvedCssValue
    presetVars: PresetVars
    spacingValueToKey: ValueToKeyMap
    radiusValueToKey: ValueToKeyMap
    borderWidthValueToKey: ValueToKeyMap
    opacityValueToKey: ValueToKeyMap
}): string {
    return isColorValue(resolvedValue)
        ? buildColorClass({ utilityBase, resolvedValue, presetVars })
        : buildScaleClass({
            utilityBase,
            resolvedValue,
            spacingValueToKey,
            radiusValueToKey,
            borderWidthValueToKey,
            opacityValueToKey,
        })
}

function resolveArbitraryPropertyValue({
    propertyValue,
    definitions,
    presetVars,
    meta,
}: {
    propertyValue: string
    definitions: CssDefinitions
    presetVars: PresetVars
    meta: TransformMeta
}): string {
    return propertyValue.replace(/var\((--component-[a-z0-9-]+)\)/gi, (fullMatch, componentVarName) => {
        const resolvedValue = resolveCssValue({
            cssVarName: componentVarName,
            definitions,
            presetVars,
        })

        if (!resolvedValue?.value) {
            meta.unresolved.add(componentVarName)
            return fullMatch
        }

        meta.replacements += 1

        if (resolvedValue.kind === 'var') {
            return `var(${resolvedValue.value})`
        }

        return normalizeArbitraryValue(resolvedValue.value)
    })
}

function buildArbitraryPropertyClass({
    prefixes,
    propertyName,
    propertyValue,
    definitions,
    presetVars,
    borderWidthValueToKey,
    meta,
}: {
    prefixes: string
    propertyName: string
    propertyValue: string
    definitions: CssDefinitions
    presetVars: PresetVars
    borderWidthValueToKey: ValueToKeyMap
    meta: TransformMeta
}): string {
    const singleVarMatch = propertyValue.match(/^var\((--component-[a-z0-9-]+)\)$/i)

    if (singleVarMatch) {
        const resolvedValue = resolveCssValue({
            cssVarName: singleVarMatch[1],
            definitions,
            presetVars,
        })

        if (!resolvedValue?.value) {
            meta.unresolved.add(singleVarMatch[1])
            return `${prefixes}[${propertyName}:${propertyValue}]`
        }

        meta.replacements += 1

        if (resolvedValue.kind === 'literal' && propertyName === 'border-width') {
            const borderWidthKey = borderWidthValueToKey.get(resolvedValue.value)

            if (borderWidthKey) {
                return borderWidthKey === 'DEFAULT' ? `${prefixes}border` : `${prefixes}border-${borderWidthKey}`
            }
        }

        if (resolvedValue.kind === 'var') {
            return `${prefixes}[${propertyName}:var(${resolvedValue.value})]`
        }

        return `${prefixes}[${propertyName}:${normalizeArbitraryValue(resolvedValue.value)}]`
    }

    const resolvedPropertyValue = resolveArbitraryPropertyValue({
        propertyValue,
        definitions,
        presetVars,
        meta,
    })
    return `${prefixes}[${propertyName}:${resolvedPropertyValue}]`
}

function transformClassString({
    classString,
    definitions,
    presetVars,
    spacingValueToKey,
    radiusValueToKey,
    borderWidthValueToKey,
    opacityValueToKey,
    meta,
}: {
    classString: string
    definitions: CssDefinitions
    presetVars: PresetVars
    spacingValueToKey: ValueToKeyMap
    radiusValueToKey: ValueToKeyMap
    borderWidthValueToKey: ValueToKeyMap
    opacityValueToKey: ValueToKeyMap
    meta: TransformMeta
}): string {
    const utilityTransformed = classString.replace(CLASS_TOKEN_REGEX, (classToken, componentVarName) => {
        const utilityBase = getUtilityBase(classToken)

        if (!utilityBase) {
            return classToken
        }

        const resolvedValue = resolveCssValue({
            cssVarName: componentVarName,
            definitions,
            presetVars,
        })

        if (!resolvedValue?.value) {
            meta.unresolved.add(componentVarName)
            return classToken
        }

        meta.replacements += 1
        return buildUtilityClass({
            utilityBase,
            resolvedValue,
            presetVars,
            spacingValueToKey,
            radiusValueToKey,
            borderWidthValueToKey,
            opacityValueToKey,
        })
    })

    const arbitraryPropertyTransformed = utilityTransformed.replace(ARBITRARY_PROPERTY_REGEX, (_classToken, prefixes, propertyName, propertyValue) => {
        return buildArbitraryPropertyClass({
            prefixes: prefixes ?? '',
            propertyName,
            propertyValue,
            definitions,
            presetVars,
            borderWidthValueToKey,
            meta,
        })
    })

    return arbitraryPropertyTransformed
        .replace(/((?:[!@%\w:-]+:)*rounded(?:-[trbl]{1,2})?)-\[var\((--[a-z0-9-]+)\)\]/gi, (classToken, utilityBase, cssVarName) => {
            const resolvedValue = resolveCssValue({
                cssVarName,
                definitions,
                presetVars,
            })

            if (!resolvedValue?.value) {
                return classToken
            }

            const radiusKey = getRadiusKey(resolvedValue, radiusValueToKey)
            return radiusKey ? `${utilityBase}-${radiusKey}` : classToken
        })
        .replace(/\s+/g, ' ')
        .trim()
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function transformRuntimeThemeValue(value: unknown, context: RuntimeTransformContext): unknown {
    if (typeof value === 'string') {
        return transformClassString({
            classString: value,
            ...context,
        })
    }

    if (Array.isArray(value)) {
        const transformedItems = value.map((item) => transformRuntimeThemeValue(item, context))

        if (transformedItems.every((item) => typeof item === 'string')) {
            return transformedItems.filter(Boolean).join(' ').trim()
        }

        return transformedItems
    }

    if (isPlainObject(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [
                key,
                transformRuntimeThemeValue(item, context),
            ]),
        )
    }

    return value
}

function serializeTsValue(value: unknown, indentLevel = 0): string {
    const indent = '    '.repeat(indentLevel)
    const nextIndent = '    '.repeat(indentLevel + 1)

    if (typeof value === 'string') {
        return JSON.stringify(value)
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value)
    }

    if (value === null) {
        return 'null'
    }

    if (Array.isArray(value)) {
        if (!value.length) {
            return '[]'
        }

        return `[\n${value.map((item) => `${nextIndent}${serializeTsValue(item, indentLevel + 1)}`).join(',\n')}\n${indent}]`
    }

    if (isPlainObject(value)) {
        const entries = Object.entries(value)

        if (!entries.length) {
            return '{}'
        }

        return `{\n${entries.map(([key, item]) => `${nextIndent}${JSON.stringify(key)}: ${serializeTsValue(item, indentLevel + 1)}`).join(',\n')}\n${indent}}`
    }

    return 'undefined'
}

function extractTypeAliasName(source: string): string | null {
    const match = source.match(/export\s+type\s+([A-Za-z0-9_]+)\s*=\s*typeof\s+button/)
    return match?.[1] ?? null
}

function resolveLocalImport(importerPath: string, specifier: string): string | null {
    const basePath = path.resolve(path.dirname(importerPath), specifier)
    const candidates = [
        basePath,
        `${basePath}.ts`,
        `${basePath}.js`,
        path.join(basePath, 'index.ts'),
        path.join(basePath, 'index.js'),
    ]

    for (const candidate of candidates) {
        if (statSyncSafe(candidate)?.isFile()) {
            return candidate
        }
    }

    return null
}

function rewriteLocalImportSpecifiers(source: string, importerPath: string): string {
    return source.replace(/(from\s+['"]|import\s+['"])(.+?)(['"])/g, (fullMatch, prefix, specifier, suffix) => {
        if (!specifier.startsWith('.')) {
            return fullMatch
        }

        const resolvedImportPath = resolveLocalImport(importerPath, specifier)

        if (!resolvedImportPath) {
            return fullMatch
        }

        const relativePath = path.relative(path.dirname(importerPath), resolvedImportPath).replace(/\\/g, '/')
        const normalizedPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`
        const jsPath = normalizedPath.replace(/\.ts$/, '.mjs').replace(/\.js$/, '.mjs')

        return `${prefix}${jsPath}${suffix}`
    })
}

function collectRuntimeDependencies(filePath: string, seen = new Set<string>()): Set<string> {
    if (seen.has(filePath)) {
        return seen
    }

    seen.add(filePath)

    const source = readFileSync(filePath, 'utf8')
    for (const match of source.matchAll(RUNTIME_IMPORT_REGEX)) {
        const specifier = match[1]

        if (!specifier?.startsWith('.')) {
            continue
        }

        const resolvedImportPath = resolveLocalImport(filePath, specifier)

        if (!resolvedImportPath || !resolvedImportPath.endsWith('.ts')) {
            continue
        }

        collectRuntimeDependencies(resolvedImportPath, seen)
    }

    return seen
}

function transpileThemeModuleGraph(entryFilePath: string): string {
    const tempRoot = mkdtempSync(path.join(tmpdir(), 'unity-ui-theme-'))
    const runtimeFiles = collectRuntimeDependencies(entryFilePath)

    for (const runtimeFilePath of runtimeFiles) {
        const source = readFileSync(runtimeFilePath, 'utf8')
        const transpiled = ts.transpileModule(source, {
            compilerOptions: {
                module: ts.ModuleKind.ES2022,
                target: ts.ScriptTarget.ES2022,
                verbatimModuleSyntax: false,
            },
            fileName: runtimeFilePath,
        }).outputText
        const relativeFilePath = path.relative(rootDir, runtimeFilePath)
        const targetFilePath = path.join(tempRoot, relativeFilePath).replace(/\.ts$/, '.mjs')

        mkdirSync(path.dirname(targetFilePath), { recursive: true })
        writeFileSync(targetFilePath, rewriteLocalImportSpecifiers(transpiled, runtimeFilePath))
    }

    return path.join(tempRoot, path.relative(rootDir, entryFilePath)).replace(/\.ts$/, '.mjs')
}

async function loadThemeRuntime(filePath: string): Promise<unknown> {
    const transpiledEntryPath = transpileThemeModuleGraph(filePath)
    const moduleUrl = `${pathToFileURL(transpiledEntryPath).href}?t=${Date.now()}`
    const loadedModule = await import(moduleUrl)

    return loadedModule.default
}

async function buildGeneratedSource({
    filePath,
    source,
    transformContext,
}: {
    filePath: string
    source: string
    transformContext: BaseTransformContext
}): Promise<GeneratedThemeOutput> {
    const runtimeTheme = await loadThemeRuntime(filePath)
    const meta: TransformMeta = {
        unresolved: new Set<string>(),
        replacements: 0,
    }
    const transformedTheme = transformRuntimeThemeValue(runtimeTheme, {
        ...transformContext,
        meta,
    })
    const typeAliasName = extractTypeAliasName(source)
    const generatedLines = [
        '// Auto-generated by scripts/replace-component-colors.ts',
        '// Do not edit manually. Update theme.ts or CSS token mappings and rerun the generator.',
        '',
        `const button = ${serializeTsValue(transformedTheme)} as const`,
        '',
        ...(typeAliasName ? [`export type ${typeAliasName} = typeof button`, ''] : []),
        'export default button',
    ]

    return {
        generatedSource: generatedLines.join('\n'),
        replacements: meta.replacements,
        unresolved: Array.from(meta.unresolved),
    }
}

async function generateThemeFile({
    filePath,
    themeDir,
    transformContext,
}: {
    filePath: string
    themeDir: string
    transformContext: BaseTransformContext
}): Promise<GeneratedThemeFileResult> {
    const source = readFileSync(filePath, 'utf8')
    const generatedFilePath = getGeneratedThemePath(filePath, themeDir)
    const previousGeneratedSource = statSyncSafe(generatedFilePath)?.isFile()
        ? readFileSync(generatedFilePath, 'utf8')
        : null
    const nextGenerated = await buildGeneratedSource({
        filePath,
        source,
        transformContext,
    })

    if (shouldWrite) {
        mkdirSync(path.dirname(generatedFilePath), { recursive: true })
        writeFileSync(generatedFilePath, nextGenerated.generatedSource)
    }

    return {
        changed: nextGenerated.generatedSource !== previousGeneratedSource,
        filePath,
        generatedFilePath,
        replacements: nextGenerated.replacements,
        unresolved: nextGenerated.unresolved,
    }
}

async function main() {
    if (!statSync(colorsPresetPath).isFile()) {
        throw new Error(`Colors preset not found: ${colorsPresetPath}`)
    }

    const themeDirs = readdirSync(themesRootDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(themesRootDir, entry.name))

    const themeFiles = walkFiles(componentsDir, (filePath) => path.basename(filePath) === 'theme.ts')

    const perThemeResults = []

    for (const themeDir of themeDirs) {
        const themeStylesDir = path.join(themeDir, 'style')
        const cssFiles = walkFiles(themeStylesDir, (filePath) => filePath.endsWith('.css'))

        const presetVars = parsePresetVars(colorsPresetPath)
        const definitions = parseCssVariables(cssFiles)
        const spacingValueToKey = parseResolvedValuePresetMap(
            layoutPresetPath,
            new Set(['spacing', 'height', 'maxWidth', 'minWidth', 'width']),
            definitions,
        )
        const radiusValueToKey = new Map([
            ['0', '0'],
            ['0rem', '0'],
            ...parseResolvedValuePresetMap({
                filePath: layoutPresetPath,
                sectionNames: new Set(['borderRadius']),
                definitions,
            }),
        ])
        const borderWidthValueToKey = parseValuePresetMap(layoutPresetPath, new Set(['borderWidth']))
        const opacityValueToKey = new Map(
            Array.from(parseValuePresetMap(layoutPresetPath, new Set(['opacity'])).entries()).map(([value, key]) => [
                normalizeScalarForLookup(value),
                key,
            ]),
        )
        const transformContext: BaseTransformContext = {
            definitions,
            presetVars,
            spacingValueToKey,
            radiusValueToKey,
            borderWidthValueToKey,
            opacityValueToKey,
        }

        const results = await Promise.all(themeFiles.map((filePath: string) => generateThemeFile({
            filePath,
            themeDir,
            transformContext,
        })))

        perThemeResults.push({
            themeDir,
            results,
        })
    }

    const results = perThemeResults.flatMap((entry) => entry.results)
    const changedFiles = results.filter((result) => result.changed)
    const totalReplacements = results.reduce((sum, result) => sum + result.replacements, 0)
    const unresolved = Array.from(
        new Set(results.flatMap((result) => result.unresolved).sort()),
    )

    if (!changedFiles.length) {
        console.log('No generated theme files need updates.')
    } else {
        console.log(
            `${shouldWrite ? 'Generated' : 'Prepared'} ${totalReplacements} replacement(s) in ${changedFiles.length} file(s):`,
        )

        for (const result of changedFiles) {
            console.log(
                `- ${path.relative(rootDir, result.generatedFilePath)} from ${path.relative(rootDir, result.filePath)} (${result.replacements})`,
            )
        }
    }

    if (unresolved.length) {
        console.log('Unresolved component variables:')

        for (const variableName of unresolved) {
            console.log(`- ${variableName}`)
        }

        process.exitCode = 1
    }

    if (!shouldWrite) {
        console.log('Run with --write to emit generated theme files.')
    }
}

await main()
