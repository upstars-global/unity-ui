import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin.js'

const preset: Partial<Config> = {
    theme: {
        screens: {
            xxs: '320px',
            xs: '352px',
            sm: '544px',
            md: '752px',
            lg: '1088px',
            xl: '1280px',
            '2xl': '1440px',
            '3xl': '1664px',
        },
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant('mobile-landscape', '@media (max-width: 754px) and (orientation: landscape)')
        }),
    ],
}

export default preset
