import { type Config } from 'tailwindcss'

import commonPreset from '../../tailwind/presets/index.ts'
import buttonPreset from './components/button/preset.generated.ts'
import switcherPreset from './components/switcher/preset.generated.ts'

const preset: Partial<Config> = {
  presets: [commonPreset],
  plugins: [
    ...(buttonPreset.plugins ?? []),
    ...(switcherPreset.plugins ?? []),
  ],
}

export default preset
