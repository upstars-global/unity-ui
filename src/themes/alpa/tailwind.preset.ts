import { type Config } from 'tailwindcss'

import commonPreset from '../../tailwind/presets/index.ts'
import buttonPreset from './components/button/preset.generated.ts'
import selectPreset from './components/select/preset.generated.ts'
import suggestPreset from './components/suggest/preset.generated.ts'
import switcherPreset from './components/switcher/preset.generated.ts'

const preset: Partial<Config> = {
  presets: [commonPreset],
  plugins: [
    ...(buttonPreset.plugins ?? []),
    ...(selectPreset.plugins ?? []),
    ...(suggestPreset.plugins ?? []),
    ...(switcherPreset.plugins ?? []),
  ],
}

export default preset
