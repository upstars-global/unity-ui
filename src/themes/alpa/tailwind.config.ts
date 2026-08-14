import { type Config } from 'tailwindcss'

import themePreset from './tailwind.preset.ts'

export const UiKitTailwindPresets: NonNullable<Config['presets']> = [
  themePreset,
]

export const UiKitTailwindPreset: Partial<Config> = {
  presets: UiKitTailwindPresets,
  content: ['./src/**/*.{vue,ts,tsx,css}', './.storybook/**/*.{ts,css}'],
}

export default UiKitTailwindPreset
