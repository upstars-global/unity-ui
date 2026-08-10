import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        extend: {
            keyframes: {
                'rotate-180': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(180deg)' },
                },
            },
            animation: {
                'rotate-180': 'rotate-180 0.2s ease-in-out forwards',
            },
            transitionProperty: {
                height: 'height, max-height',
            },
        },
    },
}

export default preset
