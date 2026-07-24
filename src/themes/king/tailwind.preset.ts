import { type Config } from 'tailwindcss'

import buttonPreset from './components/button/preset.generated.ts'
import switcherPreset from './components/switcher/preset.generated.ts'

const preset: Partial<Config> = {
  plugins: [
    ...(buttonPreset.plugins ?? []),
    ...(switcherPreset.plugins ?? []),
  ],
}

export default preset
