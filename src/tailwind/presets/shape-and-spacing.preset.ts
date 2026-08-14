import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        borderWidth: {
            0: '0px',
            DEFAULT: '1px',
            2: '0.125rem',
            4: '0.25rem',
            8: '0.5rem',
        },
        extend: {
            spacing: {
                0: 'var(--spacing-0)',
                2: 'var(--spacing-2)',
                4: 'var(--spacing-4)',
                6: "var(--spacing-6)",
                8: 'var(--spacing-8)',
                12: 'var(--spacing-12)',
                14: 'var(--spacing-14)',
                16: 'var(--spacing-16)',
                20: 'var(--spacing-20)',
                24: 'var(--spacing-24)',
                32: 'var(--spacing-32)',
                36: 'var(--spacing-36)',
                40: 'var(--spacing-40)',
                auto: 'auto',
            },
            borderRadius: {
                0: '0',
                2: 'var(--radius-2)',
                4: 'var(--radius-4)',
                8: 'var(--radius-8)',
                12: 'var(--radius-12)',
                16: 'var(--radius-16)',
                24: 'var(--radius-24)',
            },
        },
    },
}

export default preset
