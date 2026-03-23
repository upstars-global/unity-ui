import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        colors: {
            transparent: 'var(--color-transparent)',
            black: 'var(--color-black)',
            white: 'var(--color-white)',
            'bg-deep': 'rgb(var(--bg-deep) / <alpha-value>)',
            'bg-surface': 'rgb(var(--bg-surface) / <alpha-value>)',
            'bg-surface-alt': 'rgb(var(--bg-surface-alt) / <alpha-value>)',
            'fg-brand': 'rgb(var(--fg-brand) / <alpha-value>)',
            'fg-pending': 'rgb(var(--fg-pending) / <alpha-value>)',
            'fg-primary': 'var(--fg-primary)',
            'fg-secondary': 'rgb(var(--fg-secondary) / <alpha-value>)',
            'fg-link-default': 'rgb(var(--fg-link-default) / <alpha-value>)',
            'fg-link-hover': 'rgb(var(--fg-link-hover) / <alpha-value>)',
            'fg-link-underline-default': 'var(--fg-link-underline-default)',
            'fg-link-underline-hover': 'rgb(var(--fg-link-underline-hover) / <alpha-value>)',
            'fg-status-error': 'rgb(var(--fg-status-error) / <alpha-value>)',
            'fg-status-success': 'rgb(var(--fg-status-success) / <alpha-value>)',
            'fg-status-warning': 'rgb(var(--fg-status-warning) / <alpha-value>)',
            'primary-100': 'rgb(var(--color-primary-100) / <alpha-value>)',
            'primary-200': 'rgb(var(--color-primary-200) / <alpha-value>)',
            'primary-300': 'rgb(var(--color-primary-300) / <alpha-value>)',
            'secondary-100': 'rgb(var(--color-secondary-100) / <alpha-value>)',
            'secondary-200': 'rgb(var(--color-secondary-200) / <alpha-value>)',
            'secondary-300': 'rgb(var(--color-secondary-300) / <alpha-value>)',
            'neutral-100': 'rgb(var(--color-neutral-100) / <alpha-value>)',
            'neutral-200': 'rgb(var(--color-neutral-200) / <alpha-value>)',
            'neutral-300': 'rgb(var(--color-neutral-300) / <alpha-value>)',
            'neutral-400': 'rgb(var(--color-neutral-400) / <alpha-value>)',
            'neutral-500': 'rgb(var(--color-neutral-500) / <alpha-value>)',
            'neutral-600': 'rgb(var(--color-neutral-600) / <alpha-value>)',
            'neutral-700': 'rgb(var(--color-neutral-700) / <alpha-value>)',
            'neutral-800': 'rgb(var(--color-neutral-800) / <alpha-value>)',
            'neutral-900': 'rgb(var(--color-neutral-900) / <alpha-value>)',
            'error-100': 'rgb(var(--color-error-100) / <alpha-value>)',
        },
    },
}

export default preset
