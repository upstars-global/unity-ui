import { type Config } from 'tailwindcss'

import commonPreset from '../../tailwind/presets/index.ts'
import buttonPreset from './components/button/preset.generated.ts'
import basicControlsPreset from './components/basicControls/preset.generated.ts'
import inputPreset from './components/input/preset.generated.ts'
import carouselPreset from './components/carousel/preset.generated.ts'
import selectPreset from './components/select/preset.generated.ts'
import suggestPreset from './components/suggest/preset.generated.ts'
import switcherPreset from './components/switcher/preset.generated.ts'
import textAreaPreset from './components/textArea/preset.generated.ts'

const preset: Partial<Config> = {
  presets: [commonPreset],
  plugins: [
    ...(buttonPreset.plugins ?? []),
    ...(basicControlsPreset.plugins ?? []),
    ...(inputPreset.plugins ?? []),
    ...(carouselPreset.plugins ?? []),
    ...(selectPreset.plugins ?? []),
    ...(suggestPreset.plugins ?? []),
    ...(switcherPreset.plugins ?? []),
    ...(textAreaPreset.plugins ?? []),
  ],
}

export default preset
