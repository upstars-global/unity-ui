import { type Config } from 'tailwindcss'

import colorsPreset from './colors.preset.ts'
import layoutPreset from './layout.preset.ts'
import typographyPreset from './typography.preset.ts'

const theme = {
    ...typographyPreset.theme,
    ...layoutPreset.theme,
    ...colorsPreset.theme,
    extend: {
        ...typographyPreset.theme?.extend,
        ...layoutPreset.theme?.extend,
        ...colorsPreset.theme?.extend,
    },
}

const preset: Partial<Config> = {
    theme,
    plugins: [
        ...(typographyPreset.plugins ?? []),
        ...(layoutPreset.plugins ?? []),
        ...(colorsPreset.plugins ?? []),
    ],
}

export default preset
