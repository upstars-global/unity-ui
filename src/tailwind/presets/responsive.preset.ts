import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        screens: {
            xxs: '320px',   // min-width, крайня межа
            xs: '352px',    // адаптація для малих телефонів
            sm: '545px',    // max-width для контейнера на мобайлі
            md: '752px',    // таблет страховий
            lg: '1088px',   // перехід у 2 колонки
            xl: '1280px',   // десктоп: вимикаємо таббар, збіг з СС
            '2xl': '1440px', // базовий десктоп
            '3xl': '1600px', // extra-large+
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
    },
}

export default preset
