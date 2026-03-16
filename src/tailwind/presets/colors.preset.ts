import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        colors: {
            transparent: 'var(--color-transparent)',
            black: 'var(--color-black)',
            white: 'var(--color-white)',
            'bg-deep': 'var(--bg-deep)',
            'bg-surface': 'var(--bg-surface)',
            'bg-surface-alt': 'var(--bg-surface-alt)',
            'content-status-error': 'var(--content-status-error)',
            'content-status-success': 'var(--content-status-success)',
            'content-status-warning': 'var(--content-status-warning)',
            'content-text-primary': 'var(--content-text-primary)',
            'content-text-secondary': 'var(--content-text-secondary)',
            'primary-200': 'var(--color-primary-200)',
            'primary-300': 'var(--color-primary-300)',
        },
    },
}

export default preset
