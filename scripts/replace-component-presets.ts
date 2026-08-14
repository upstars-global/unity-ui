#!/usr/bin/env node

import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import ts from 'typescript'

const rootDir = process.cwd()
const componentsDir = path.join(rootDir, 'src/components')
const themesRootDir = path.join(rootDir, 'src/themes')
const commonPresetPaths = [
    path.join(rootDir, 'src/tailwind/presets/colors.preset.ts'),
    path.join(rootDir, 'src/tailwind/presets/layout.preset.ts'),
    path.join(rootDir, 'src/tailwind/presets/typography.preset.ts'),
]

const args = new Set(process.argv.slice(2))
const shouldWrite = args.has('--write')

const CSS_VAR_DEFINITION_REGEX = /(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/g
const CSS_VAR_REFERENCE_REGEX = /var\((--[A-Za-z0-9-]+)\)/g

type Predicate = (filePath: string) => boolean
type CssDefinitions = Map<string, string>
type ResolvedCssValue = {
    kind: 'var' | 'literal'
    value: string
}
type CommonValueEntry = {
    template: string
}
type CommonThemeLookup = {
    varToTheme: Map<string, CommonValueEntry>
    literalToTheme: Map<string, CommonValueEntry>
}
type TransformMeta = {
    replacements: number
    unresolved: Set<string>
}
type TextReplacement = {
    start: number
    end: number
    text: string
}
type GeneratedPresetFileResult = {
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

function statSyncSafe(filePath: string) {
    try {
        return statSync(filePath)
    } catch {
        return null
    }
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

function resolveValueThroughAliases(cssVarName: string, definitions: CssDefinitions): ResolvedCssValue | null {
    const seen = new Set<string>()
    let current = cssVarName

    while (current && !seen.has(current)) {
        seen.add(current)
        const definition = definitions.get(current)

        if (!definition) {
            return {
                kind: 'var',
                value: current,
            }
        }

        const aliasMatch = definition.match(/^var\((--[A-Za-z0-9-]+)\)$/)

        if (!aliasMatch) {
            return {
                kind: 'literal',
                value: definition,
            }
        }

        current = aliasMatch[1]
    }

    return null
}

function resolveComponentValue(cssVarName: string, definitions: CssDefinitions): ResolvedCssValue | null {
    const seen = new Set<string>()
    let current = cssVarName

    while (current && !seen.has(current)) {
        seen.add(current)
        const definition = definitions.get(current)

        if (!definition) {
            return {
                kind: 'var',
                value: current,
            }
        }

        const aliasMatch = definition.match(/^var\((--[A-Za-z0-9-]+)\)$/)

        if (!aliasMatch) {
            return {
                kind: 'literal',
                value: definition,
            }
        }

        const nextVarName = aliasMatch[1]

        if (!nextVarName.startsWith('--component-')) {
            return {
                kind: 'var',
                value: nextVarName,
            }
        }

        current = nextVarName
    }

    return null
}

function getPropertyKeyName(name: ts.PropertyName): string | null {
    if (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) {
        return name.text
    }

    return null
}

function collectThemeStringEntries(filePath: string): Array<{ path: string, expression: string }> {
    const source = readFileSync(filePath, 'utf8')
    const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    const entries: Array<{ path: string, expression: string }> = []

    function collectFromObject(node: ts.ObjectLiteralExpression, pathParts: string[]) {
        for (const property of node.properties) {
            if (!ts.isPropertyAssignment(property)) {
                continue
            }

            const propertyName = getPropertyKeyName(property.name)

            if (!propertyName) {
                continue
            }

            const nextPathParts = propertyName === 'extend'
                ? pathParts
                : [...pathParts, propertyName]

            if (ts.isObjectLiteralExpression(property.initializer)) {
                collectFromObject(property.initializer, nextPathParts)
                continue
            }

            if (ts.isStringLiteralLike(property.initializer)) {
                entries.push({
                    path: nextPathParts.join('.'),
                    expression: property.initializer.text.trim(),
                })
            }
        }
    }

    function visit(node: ts.Node) {
        if (!ts.isVariableDeclaration(node) || !node.initializer || !ts.isObjectLiteralExpression(node.initializer)) {
            return ts.forEachChild(node, visit)
        }

        const themeProperty = node.initializer.properties.find((property) => {
            return ts.isPropertyAssignment(property)
                && getPropertyKeyName(property.name) === 'theme'
                && ts.isObjectLiteralExpression(property.initializer)
        })

        if (themeProperty && ts.isPropertyAssignment(themeProperty) && ts.isObjectLiteralExpression(themeProperty.initializer)) {
            collectFromObject(themeProperty.initializer, [])
        }

        return ts.forEachChild(node, visit)
    }

    visit(sourceFile)

    return entries
}

function registerThemeEntry(
    _themePath: string,
    expression: string,
    definitions: CssDefinitions,
    lookup: CommonThemeLookup,
) {
    const trimmedExpression = expression.trim()

    if (!trimmedExpression.includes('var(--')) {
        lookup.literalToTheme.set(trimmedExpression, {
            template: trimmedExpression,
        })
        return
    }

    const alphaColorMatch = trimmedExpression.match(/^(rgb|rgba)\(var\((--[A-Za-z0-9-]+)\)\s*(\/|,)\s*<alpha-value>\)$/)

    if (alphaColorMatch) {
        const colorFunction = alphaColorMatch[1]
        const variableName = alphaColorMatch[2]
        const separator = alphaColorMatch[3]
        const template = separator === '/'
            ? `${colorFunction}(var(${variableName}) / <alpha-value>)`
            : `${colorFunction}(var(${variableName}), <alpha-value>)`

        lookup.varToTheme.set(variableName, {
            template,
        })
        return
    }

    const directVarMatch = trimmedExpression.match(/^var\((--[A-Za-z0-9-]+)\)$/)

    if (directVarMatch) {
        lookup.varToTheme.set(directVarMatch[1], {
            template: trimmedExpression,
        })

        const resolvedValue = resolveValueThroughAliases(directVarMatch[1], definitions)

        if (resolvedValue?.kind === 'literal') {
            lookup.literalToTheme.set(resolvedValue.value, {
                template: trimmedExpression,
            })
        }

        return
    }

    const singleVarReference = Array.from(trimmedExpression.matchAll(CSS_VAR_REFERENCE_REGEX))

    if (singleVarReference.length === 1) {
        lookup.varToTheme.set(singleVarReference[0][1], {
            template: trimmedExpression,
        })
    }
}

function buildCommonThemeLookup(definitions: CssDefinitions): CommonThemeLookup {
    const lookup: CommonThemeLookup = {
        varToTheme: new Map(),
        literalToTheme: new Map(),
    }

    for (const presetPath of commonPresetPaths) {
        for (const entry of collectThemeStringEntries(presetPath)) {
            registerThemeEntry(entry.path, entry.expression, definitions, lookup)
        }
    }

    return lookup
}

function normalizeOpacityValue(opacityValue: string): string {
    if (!/^\d{1,3}$/.test(opacityValue)) {
        return opacityValue
    }

    return String(Number(opacityValue) / 100)
}

function buildCommonExpression(commonEntry: CommonValueEntry, opacityValue?: string): string {
    if (!commonEntry.template.includes('<alpha-value>')) {
        return commonEntry.template
    }

    const alphaValue = opacityValue ? normalizeOpacityValue(opacityValue) : '1'
    return commonEntry.template.replace('<alpha-value>', alphaValue)
}

function resolveCommonExpressionForVar(varName: string, lookup: CommonThemeLookup): string | null {
    const directThemeEntry = lookup.varToTheme.get(varName)

    if (directThemeEntry) {
        return buildCommonExpression(directThemeEntry)
    }

    const opacityMatch = varName.match(/^(--(?:color|bg|fg|content)-.+)-(\d{1,3})$/)

    if (!opacityMatch) {
        return null
    }

    const baseVarName = opacityMatch[1]
    const opacityValue = opacityMatch[2]
    const baseThemeEntry = lookup.varToTheme.get(baseVarName)

    if (!baseThemeEntry) {
        return null
    }

    return buildCommonExpression(baseThemeEntry, opacityValue)
}

function mapComponentVariable({
    componentVarName,
    definitions,
    lookup,
    meta,
}: {
    componentVarName: string
    definitions: CssDefinitions
    lookup: CommonThemeLookup
    meta: TransformMeta
}): string {
    const resolvedValue = resolveComponentValue(componentVarName, definitions)

    if (!resolvedValue?.value) {
        meta.unresolved.add(componentVarName)
        return `var(${componentVarName})`
    }

    meta.replacements += 1

    if (resolvedValue.kind === 'var') {
        const commonExpression = resolveCommonExpressionForVar(resolvedValue.value, lookup)

        if (commonExpression) {
            return commonExpression
        }

        return `var(${resolvedValue.value})`
    }

    const literalThemeEntry = lookup.literalToTheme.get(resolvedValue.value)

    if (literalThemeEntry) {
        return buildCommonExpression(literalThemeEntry)
    }

    return resolvedValue.value
}

function mapCssVariable({
    varName,
    definitions,
    lookup,
    meta,
}: {
    varName: string
    definitions: CssDefinitions
    lookup: CommonThemeLookup
    meta: TransformMeta
}): string {
    if (varName.startsWith('--component-')) {
        return mapComponentVariable({
            componentVarName: varName,
            definitions,
            lookup,
            meta,
        })
    }

    const resolvedValue = resolveValueThroughAliases(varName, definitions)

    if (!resolvedValue?.value) {
        meta.unresolved.add(varName)
        return `var(${varName})`
    }

    if (resolvedValue.kind === 'var') {
        const commonExpression = resolveCommonExpressionForVar(varName, lookup)
            ?? resolveCommonExpressionForVar(resolvedValue.value, lookup)

        if (commonExpression) {
            return commonExpression
        }

        return `var(${resolvedValue.value})`
    }

    const literalThemeEntry = lookup.literalToTheme.get(resolvedValue.value)

    if (literalThemeEntry) {
        return buildCommonExpression(literalThemeEntry)
    }

    return resolvedValue.value
}

function applyTextReplacements(source: string, replacements: TextReplacement[]): string {
    return replacements
        .sort((left, right) => right.start - left.start)
        .reduce((nextSource, replacement) => {
            return `${nextSource.slice(0, replacement.start)}${replacement.text}${nextSource.slice(replacement.end)}`
        }, source)
}

function buildStringLiteralReplacement({
    literalText,
    definitions,
    lookup,
    meta,
}: {
    literalText: string
    definitions: CssDefinitions
    lookup: CommonThemeLookup
    meta: TransformMeta
}): string {
    return JSON.stringify(literalText.replace(CSS_VAR_REFERENCE_REGEX, (_fullMatch, varName) => {
        return mapCssVariable({
            varName,
            definitions,
            lookup,
            meta,
        })
    }))
}

function transformPresetSource({
    filePath,
    source,
    definitions,
    lookup,
}: {
    filePath: string
    source: string
    definitions: CssDefinitions
    lookup: CommonThemeLookup
}): { transformedSource: string, replacements: number, unresolved: string[] } {
    const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    const meta: TransformMeta = {
        replacements: 0,
        unresolved: new Set<string>(),
    }
    const replacements: TextReplacement[] = []

    function visit(node: ts.Node) {
        if (ts.isStringLiteralLike(node) && node.text.includes('var(--')) {
            const nextValue = buildStringLiteralReplacement({
                literalText: node.text,
                definitions,
                lookup,
                meta,
            })

            replacements.push({
                start: node.getStart(sourceFile),
                end: node.getEnd(),
                text: nextValue,
            })
        }

        ts.forEachChild(node, visit)
    }

    visit(sourceFile)

    return {
        transformedSource: applyTextReplacements(source, replacements),
        replacements: meta.replacements,
        unresolved: Array.from(meta.unresolved),
    }
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

function rewriteLocalImportSpecifiers(source: string, originalFilePath: string, generatedFilePath: string): string {
    return source.replace(/(from\s+['"]|import\s+['"])(.+?)(['"])/g, (fullMatch, prefix, specifier, suffix) => {
        if (!specifier.startsWith('.')) {
            return fullMatch
        }

        const resolvedImportPath = resolveLocalImport(originalFilePath, specifier)

        if (!resolvedImportPath) {
            return fullMatch
        }

        let relativePath = path.relative(path.dirname(generatedFilePath), resolvedImportPath).replace(/\\/g, '/')

        if (!relativePath.startsWith('.')) {
            relativePath = `./${relativePath}`
        }

        if (!path.extname(specifier)) {
            relativePath = relativePath.replace(/\.(ts|js)$/, '').replace(/\/index$/, '')
        }

        return `${prefix}${relativePath}${suffix}`
    })
}

function getGeneratedPresetPath(filePath: string, themeDir: string): string {
    const componentName = path.basename(path.dirname(filePath))
    return path.join(themeDir, 'components', componentName, 'preset.generated.ts')
}

function generateFileHeader(source: string): string {
    return [
        '// Auto-generated by scripts/replace-component-presets.ts',
        '// Do not edit manually. Update preset.ts or CSS token mappings and rerun the generator.',
        '',
        source,
    ].join('\n')
}

async function generatePresetFile({
    filePath,
    themeDir,
    definitions,
    lookup,
}: {
    filePath: string
    themeDir: string
    definitions: CssDefinitions
    lookup: CommonExpressionLookup
}): Promise<GeneratedPresetFileResult> {
    const source = readFileSync(filePath, 'utf8')
    const generatedFilePath = getGeneratedPresetPath(filePath, themeDir)
    const previousGeneratedSource = statSyncSafe(generatedFilePath)?.isFile()
        ? readFileSync(generatedFilePath, 'utf8')
        : null
    const transformed = transformPresetSource({
        filePath,
        source,
        definitions,
        lookup,
    })
    const generatedSource = generateFileHeader(
        rewriteLocalImportSpecifiers(transformed.transformedSource, filePath, generatedFilePath),
    )

    if (shouldWrite) {
        mkdirSync(path.dirname(generatedFilePath), { recursive: true })
        writeFileSync(generatedFilePath, generatedSource)
    }

    return {
        changed: generatedSource !== previousGeneratedSource,
        filePath,
        generatedFilePath,
        replacements: transformed.replacements,
        unresolved: transformed.unresolved,
    }
}

async function main() {
    const themeDirs = readdirSync(themesRootDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(themesRootDir, entry.name))
    const presetFiles = walkFiles(componentsDir, (filePath) => path.basename(filePath) === 'preset.ts')

    const perThemeResults = []

    for (const themeDir of themeDirs) {
        const themeStylesDir = path.join(themeDir, 'style')
        const cssFiles = walkFiles(themeStylesDir, (filePath) => filePath.endsWith('.css'))
        const definitions = parseCssVariables(cssFiles)
        const lookup = buildCommonThemeLookup(definitions)
        const results = await Promise.all(presetFiles.map((filePath) => generatePresetFile({
            filePath,
            themeDir,
            definitions,
            lookup,
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
        console.log('No generated preset files need updates.')
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
        console.log('Run with --write to emit generated preset files.')
    }
}

await main()
