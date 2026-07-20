import { type Config } from 'tailwindcss'

import buttonPreset from './components/button/preset.generated.ts'

const preset: Partial<Config> = {
  plugins: [
    ...(buttonPreset.plugins ?? []),
  ],
}

export default preset
