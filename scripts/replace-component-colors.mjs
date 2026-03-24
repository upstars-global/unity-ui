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

const DEFAULT_SPACING_VALUE_TO_KEY = new Map([
    ['0rem', '0'],
    ['0px', '0'],
    ['0.125rem', '0.5'],
    ['0.25rem', '1'],
    ['0.375rem', '1.5'],
    ['0.5rem', '2'],
    ['0.625rem', '2.5'],
    ['0.75rem', '3'],
    ['0.875rem', '3.5'],
    ['1rem', '4'],
    ['1.25rem', '5'],
    ['1.5rem', '6'],
    ['1.75rem', '7'],
    ['2rem', '8'],
    ['2.5rem', '10'],
    ['3rem', '12'],
    ['3.5rem', '14'],
    ['4rem', '16'],
    ['4.5rem', '18'],
    ['5rem', '20'],
    ['5.5rem', '22'],
    ['6rem', '24'],
    ['6.5rem', '26'],
    ['6.75rem', '27'],
    ['6.875rem', '27.5'],
    ['7rem', '28'],
    ['7.5rem', '30'],
    ['8rem', '32'],
    ['9rem', '36'],
    ['9.5rem', '38'],
    ['10rem', '40'],
])

const CLASS_TOKEN_REGEX = /[!@%\w:[\]/.-]+-\[var\((--[a-z0-9-]+)\)\]/gi
const ARBITRARY_PROPERTY_REGEX = /(?:[!@%\w:-]+:)*\[[a-z-]+:var\((--[a-z0-9-]+)\)\]/gi
const PRESET_ENTRY_REGEX = /^\s*(?:'([^']+)'|([A-Za-z0-9_-]+)):\s*'[^']*var\((--[A-Za-z0-9-]+)\)[^']*'/gm
const CSS_VAR_DEFINITION_REGEX = /(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/g
const PRESET_SECTION_REGEX = /([A-Za-z0-9_-]+):\s*{([\s\S]*?)^\s*}/gm
const PRESET_VALUE_ENTRY_REGEX = /^\s*(?:'([^']+)'|([A-Za-z0-9_.-]+)):\s*["']([^"']+)["']/gm
const RUNTIME_IMPORT_REGEX = /^\s*import\s+(?!type\b)(?:[\s\S]*?\sfrom\s+)?['"](.+?)['"]/gm
function walkFiles(dirPath, predicate) {
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

function parsePresetVars(filePath) {
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

function parseValuePresetMap(filePath, sectionNames) {
    const source = readFileSync(filePath, 'utf8')
    const valueToKey = new Map()

    for (const sectionMatch of source.matchAll(PRESET_SECTION_REGEX)) {
        const sectionName = sectionMatch[1]
        const sectionBody = sectionMatch[2]

        if (!sectionName || !sectionBody || !sectionNames.has(sectionName)) {
            continue
        }

        for (const entryMatch of sectionBody.matchAll(PRESET_VALUE_ENTRY_REGEX)) {
            const key = entryMatch[1] ?? entryMatch[2]
            const value = entryMatch[3]?.trim()

            if (!key || !value) {
                continue
            }

            valueToKey.set(value, key)
        }
    }

    return valueToKey
}

function resolvePresetScalarValue(value, definitions) {
    const aliasMatch = value.match(/^var\((--[A-Za-z0-9-]+)\)$/)

    if (!aliasMatch) {
        return value
    }

    const resolvedValue = resolveCssValue(aliasMatch[1], definitions, new Map())
    return resolvedValue?.value ?? value
}

function parseResolvedValuePresetMap(filePath, sectionNames, definitions) {
    const rawValueToKey = parseValuePresetMap(filePath, sectionNames)
    const resolvedValueToKey = new Map()

    for (const [value, key] of rawValueToKey.entries()) {
        resolvedValueToKey.set(resolvePresetScalarValue(value, definitions), key)
    }

    return resolvedValueToKey
}

function parseCssVariables(filePaths) {
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

function resolveCssValue(cssVarName, definitions, presetVars) {
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

function getUtilityBase(classToken) {
    const arbitraryValueIndex = classToken.indexOf('-[var(')

    if (arbitraryValueIndex === -1) {
        return null
    }

    const utilityBase = classToken.slice(0, arbitraryValueIndex)
    const lastSegment = utilityBase.split(':').pop() ?? utilityBase
    const normalizedUtility = lastSegment.startsWith('!') ? lastSegment.slice(1) : lastSegment

    return COLOR_UTILITIES.has(normalizedUtility) || SPACING_UTILITIES.has(normalizedUtility)
        ? utilityBase
        : null
}

function statSyncSafe(filePath) {
    try {
        return statSync(filePath)
    } catch {
        return null
    }
}

function getGeneratedThemePath(filePath, themeDir) {
    const componentName = path.basename(path.dirname(filePath))
    return path.join(themeDir, 'components', componentName, 'theme.generated.ts')
}

function normalizeArbitraryValue(value) {
    return value.replace(/\s+/g, '_')
}

function getNormalizedUtility(utilityBase) {
    const lastSegment = utilityBase.split(':').pop() ?? utilityBase
    return lastSegment.startsWith('!') ? lastSegment.slice(1) : lastSegment
}

function isColorValue(resolvedValue) {
    if (resolvedValue.kind === 'var') {
        return /^(--(?:color|bg|fg|content)-)/.test(resolvedValue.value)
    }

    return /^(rgb|rgba|hsl|hsla|#)/.test(resolvedValue.value)
}

function buildArbitraryUtilityClass(utilityBase, resolvedValue) {
    if (resolvedValue.kind === 'var') {
        return `${utilityBase}-[var(${resolvedValue.value})]`
    }

    return `${utilityBase}-[${normalizeArbitraryValue(resolvedValue.value)}]`
}

function getRadiusKey(resolvedValue, radiusValueToKey) {
    if (resolvedValue.kind === 'var') {
        return resolvedValue.value === '--radius-full' ? 'full' : null
    }

    if (resolvedValue.value === '100%') {
        return 'full'
    }

    return radiusValueToKey.get(resolvedValue.value) ?? null
}

function buildColorClass(utilityBase, resolvedValue, presetVars) {
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

function buildScaleClass(utilityBase, resolvedValue, spacingValueToKey, radiusValueToKey) {
    const normalizedUtility = getNormalizedUtility(utilityBase)

    if (normalizedUtility.startsWith('rounded')) {
        const radiusKey = getRadiusKey(resolvedValue, radiusValueToKey)

        if (radiusKey) {
            return radiusKey === 'DEFAULT' ? utilityBase : `${utilityBase}-${radiusKey}`
        }
    } else if (resolvedValue.kind === 'literal') {
        const spacingKey = spacingValueToKey.get(resolvedValue.value)

        if (spacingKey) {
            return `${utilityBase}-${spacingKey}`
        }
    }

    return buildArbitraryUtilityClass(utilityBase, resolvedValue)
}

function buildUtilityClass(utilityBase, resolvedValue, presetVars, spacingValueToKey, radiusValueToKey) {
    return isColorValue(resolvedValue)
        ? buildColorClass(utilityBase, resolvedValue, presetVars)
        : buildScaleClass(utilityBase, resolvedValue, spacingValueToKey, radiusValueToKey)
}

function buildArbitraryPropertyClass(classToken, resolvedValue, borderWidthValueToKey) {
    const propertyMatch = classToken.match(/^((?:[!@%\w:-]+:)*)\[([a-z-]+):var\(--component-[a-z0-9-]+\)\]$/i)

    if (!propertyMatch) {
        return classToken
    }

    const prefixes = propertyMatch[1] ?? ''
    const propertyName = propertyMatch[2]

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

function transformClassString(classString, definitions, presetVars, spacingValueToKey, radiusValueToKey, borderWidthValueToKey, meta) {
    const utilityTransformed = classString.replace(CLASS_TOKEN_REGEX, (classToken, componentVarName) => {
        const utilityBase = getUtilityBase(classToken)

        if (!utilityBase) {
            return classToken
        }

        const resolvedValue = resolveCssValue(componentVarName, definitions, presetVars)

        if (!resolvedValue?.value) {
            meta.unresolved.add(componentVarName)
            return classToken
        }

        meta.replacements += 1
        return buildUtilityClass(utilityBase, resolvedValue, presetVars, spacingValueToKey, radiusValueToKey)
    })

    const arbitraryPropertyTransformed = utilityTransformed.replace(ARBITRARY_PROPERTY_REGEX, (classToken, componentVarName) => {
        const resolvedValue = resolveCssValue(componentVarName, definitions, presetVars)

        if (!resolvedValue?.value) {
            meta.unresolved.add(componentVarName)
            return classToken
        }

        meta.replacements += 1
        return buildArbitraryPropertyClass(classToken, resolvedValue, borderWidthValueToKey)
    })

    return arbitraryPropertyTransformed
        .replace(/((?:[!@%\w:-]+:)*rounded(?:-[trbl]{1,2})?)-\[var\((--[a-z0-9-]+)\)\]/gi, (classToken, utilityBase, cssVarName) => {
            const resolvedValue = resolveCssValue(cssVarName, definitions, presetVars)

            if (!resolvedValue?.value) {
                return classToken
            }

            const radiusKey = getRadiusKey(resolvedValue, radiusValueToKey)
            return radiusKey ? `${utilityBase}-${radiusKey}` : classToken
        })
        .replace(/\s+/g, ' ')
        .trim()
}

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function transformRuntimeThemeValue(value, definitions, presetVars, spacingValueToKey, radiusValueToKey, borderWidthValueToKey, meta) {
    if (typeof value === 'string') {
        return transformClassString(value, definitions, presetVars, spacingValueToKey, radiusValueToKey, borderWidthValueToKey, meta)
    }

    if (Array.isArray(value)) {
        const transformedItems = value.map((item) => transformRuntimeThemeValue(
            item,
            definitions,
            presetVars,
            spacingValueToKey,
            radiusValueToKey,
            borderWidthValueToKey,
            meta,
        ))

        if (transformedItems.every((item) => typeof item === 'string')) {
            return transformedItems.filter(Boolean).join(' ').trim()
        }

        return transformedItems
    }

    if (isPlainObject(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [
                key,
                transformRuntimeThemeValue(item, definitions, presetVars, spacingValueToKey, radiusValueToKey, borderWidthValueToKey, meta),
            ]),
        )
    }

    return value
}

function serializeTsValue(value, indentLevel = 0) {
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

function extractTypeAliasName(source) {
    const match = source.match(/export\s+type\s+([A-Za-z0-9_]+)\s*=\s*typeof\s+button/)
    return match?.[1] ?? null
}

function resolveLocalImport(importerPath, specifier) {
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

function rewriteLocalImportSpecifiers(source, importerPath) {
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

function collectRuntimeDependencies(filePath, seen = new Set()) {
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

function transpileThemeModuleGraph(entryFilePath) {
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

async function loadThemeRuntime(filePath) {
    const transpiledEntryPath = transpileThemeModuleGraph(filePath)
    const moduleUrl = `${pathToFileURL(transpiledEntryPath).href}?t=${Date.now()}`
    const loadedModule = await import(moduleUrl)

    return loadedModule.default
}

async function buildGeneratedSource(filePath, source, definitions, presetVars, spacingValueToKey, radiusValueToKey, borderWidthValueToKey) {
    const runtimeTheme = await loadThemeRuntime(filePath)
    const meta = {
        unresolved: new Set(),
        replacements: 0,
    }
    const transformedTheme = transformRuntimeThemeValue(
        runtimeTheme,
        definitions,
        presetVars,
        spacingValueToKey,
        radiusValueToKey,
        borderWidthValueToKey,
        meta,
    )
    const typeAliasName = extractTypeAliasName(source)
    const generatedLines = [
        '// Auto-generated by scripts/replace-component-colors.mjs',
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

async function generateThemeFile(filePath, themeDir, definitions, presetVars, spacingValueToKey, radiusValueToKey, borderWidthValueToKey) {
    const source = readFileSync(filePath, 'utf8')
    const generatedFilePath = getGeneratedThemePath(filePath, themeDir)
    const previousGeneratedSource = statSyncSafe(generatedFilePath)?.isFile()
        ? readFileSync(generatedFilePath, 'utf8')
        : null
    const nextGenerated = await buildGeneratedSource(
        filePath,
        source,
        definitions,
        presetVars,
        spacingValueToKey,
        radiusValueToKey,
        borderWidthValueToKey,
    )

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
        const spacingValueToKey = new Map([
            ...DEFAULT_SPACING_VALUE_TO_KEY,
            ...parseValuePresetMap(layoutPresetPath, new Set(['spacing', 'height', 'maxWidth', 'minWidth', 'width'])),
        ])
        const definitions = parseCssVariables(cssFiles)
        const radiusValueToKey = new Map([
            ['0', '0'],
            ['0rem', '0'],
            ...parseResolvedValuePresetMap(layoutPresetPath, new Set(['borderRadius']), definitions),
        ])
        const borderWidthValueToKey = parseValuePresetMap(layoutPresetPath, new Set(['borderWidth']))

        const results = await Promise.all(themeFiles.map((filePath) => generateThemeFile(
            filePath,
            themeDir,
            definitions,
            presetVars,
            spacingValueToKey,
            radiusValueToKey,
            borderWidthValueToKey,
        )))

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
