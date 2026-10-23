import { type Config } from 'tailwindcss'
import { BREAKPOINTS } from '../breakpoints'

const preset: Partial<Config> = {
    theme: {
        screens: {
            ...Object.fromEntries(
                Object.entries(BREAKPOINTS).map(([name, minWidth]) => [name, `${minWidth}px`]),
            ),
        },
    },
}

export default preset
