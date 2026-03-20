import tailwindPreset from './src/tailwind/presets/index.ts'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindPreset],
  content: ['./src/**/*.{vue,ts,tsx,css}', './.storybook/**/*.{ts,css}'],
}
