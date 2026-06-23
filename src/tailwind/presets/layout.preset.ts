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
            transitionProperty: {
                height: 'height, max-height'
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
            /*spacing: {
                "0": "var(--spacing-0)",
                "2": "var(--spacing-2)",
                "4": "var(--spacing-4)",
                "8": "var(--spacing-8)",
                "12": "var(--spacing-12)",
                "16": "var(--spacing-16)",
                "20": "var(--spacing-20)",
                "24": "var(--spacing-24)",
                "32": "var(--spacing-32)",
                "40": "var(--spacing-40)",
                auto: "auto",
            },*/
            borderRadius: {
                0: '0',
                4: 'var(--radius-4)',
                8: 'var(--radius-8)',
                12: 'var(--radius-12)',
                16: 'var(--radius-16)',
                24: 'var(--radius-24)',
            },
            width: {
                '84': '21rem',
            },
            opacity: {
                '80': '.80',
                '45': '.45',
            }
        },
    },
}

export default preset
