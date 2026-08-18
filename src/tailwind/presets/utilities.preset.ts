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
                80: '.80',
                45: '.45',
            },
        },
    },
}

export default preset
