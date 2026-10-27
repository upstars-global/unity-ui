import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        extend: {
            content: {
                empty: "''",
            },
            gridAutoColumns: {
                full: '100%',
                'columns-auto': 'minmax(0, auto)',
            },
            zIndex: {
                0: '0',
                1: '1',
                2: '2',
                99: '99',
                100: '100',
                1000: '1000',
                9999: '9999',
            },
            height: {
                inherit: 'inherit',
            },
            width: {
                84: '21rem',
            },
            opacity: {
                0:'var(--opacity-0)',
                5:'var(--opacity-5)',
                10:'var(--opacity-10)',
                15:'var(--opacity-15)',
                20:'var(--opacity-20)',
                25:'var(--opacity-25)',
                30:'var(--opacity-30)',
                35:'var(--opacity-35)',
                40:'var(--opacity-40)',
                45:'var(--opacity-45)',
                50:'var(--opacity-50)',
                55:'var(--opacity-55)',
                60:'var(--opacity-60)',
                65:'var(--opacity-65)',
                70:'var(--opacity-70)',
                75:'var(--opacity-75)',
                80:'var(--opacity-80)',
                85:'var(--opacity-85)',
                90:'var(--opacity-90)',
            },
        },
    },
}

export default preset
