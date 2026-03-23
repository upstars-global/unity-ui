import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        screens: {
            "xxs": "320px",   // min-width, крайня межа
            "xs":  "352px",   // адаптація для малих телефонів
            "sm":  "545px",   // max-width для контейнера на мобайлі
            "md":  "752px",   // таблет страховий
            "lg":  "1088px",  // перехід у 2 колонки
            "xl":  "1280px",  // десктоп: вимикаємо таббар, збіг з СС
            "2xl": "1440px",  // базовий десктоп
            "3xl": "1600px"   // extra-large+
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                md: '3.5rem',
                '2xl': '0',
                '3xl': '0',
            },
            screens: {
                '2xl': '80rem',
                '3xl': '104rem',
            },
        },
        borderRadius: {
            0: '0',
            4: 'var(--radius-4)',
            8: 'var(--radius-8)',
            12: 'var(--radius-12)',
            16: 'var(--radius-16)',
            24: 'var(--radius-24)',
        },
        borderWidth: {
            0: '0px',
            DEFAULT: '1px',
            2: '0.125rem',
            4: '0.25rem',
            8: '0.5rem',
        },
        extend: {
            content: {
                empty: "''",
            },
            keyframes: {
                "rotate-180": {
                    "0%":   { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(180deg)" },
                },
            },
            animation: {
                "rotate-180": "rotate-180 0.2s ease-in-out forwards",
            },
            gridAutoColumns: {
                "full": "100%",
                "columns-auto": "minmax(0, auto)",
            },
            zIndex: {
                0: 0,
                1: 1,
                2: 2,
                99: 99,
                100: 100,
                1000: 1000,
                9999: 9999,
            },
            height: {
                inherit: "inherit",
            },
            spacing: {
                18: '4.5rem',
                27: "6.75rem",
                27.5: "6.875rem",
                30: "7.5rem",
                84: "21rem",
                120: "30rem",
                auto: "auto",
            },
            maxWidth: {
                layout: "var(--main-layout-width)",
            },
            opacity: {
                '80': '.80',
            }
        },
    },
}

export default preset
