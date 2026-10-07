import { type Config } from 'tailwindcss'

import colorsPreset from './colors.preset.ts'
import motionPreset from './motion.preset.ts'
import responsivePreset from './responsive.preset.ts'
import shapeAndSpacingPreset from './shape-and-spacing.preset.ts'
import typographyPreset from './typography.preset.ts'
import utilitiesPreset from './utilities.preset.ts'

const theme = {
    ...typographyPreset.theme,
    ...responsivePreset.theme,
    ...shapeAndSpacingPreset.theme,
    ...motionPreset.theme,
    ...utilitiesPreset.theme,
    ...colorsPreset.theme,
    extend: {
        ...typographyPreset.theme?.extend,
        ...shapeAndSpacingPreset.theme?.extend,
        ...motionPreset.theme?.extend,
        ...utilitiesPreset.theme?.extend,
        ...colorsPreset.theme?.extend,
    },
}

const preset: Partial<Config> = {
    corePlugins: {
        container: false,
    },
    theme,
    plugins: [
        ...(typographyPreset.plugins ?? []),
    ],
}

export default preset
