import { type Config } from 'tailwindcss'

import commonPreset from '../../tailwind/presets/index.ts'
import themePreset from './tailwind.preset.ts'

export const UiKitTailwindPresets: NonNullable<Config['presets']> = [
  commonPreset,
  themePreset,
]

export const UiKitTailwindPreset: Partial<Config> = {
  presets: UiKitTailwindPresets,
  content: ['./src/**/*.{vue,ts,tsx,css}', './.storybook/**/*.{ts,css}'],
}

export default UiKitTailwindPreset
