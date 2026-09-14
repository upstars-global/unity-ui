import { type Config } from 'tailwindcss'

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
}

export default preset
