import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        colors: {
            transparent: 'var(--color-transparent)',
            black: 'var(--color-black)',
            white: 'var(--color-white',
            'bg-deep': 'var(--bg-deep)',
            'bg-surface': 'var(--bg-surface)',
            'bg-surface-alt': 'var(--bg-surface-alt)',
            'fg-brand': 'var(--fg-brand)',
            'fg-pending': 'var(--fg-pending)',
            'fg-primary': 'var(--fg-primary)',
            'fg-secondary': 'var(--fg-secondary)',
            'fg-link-default': 'var(--fg-link-default)',
            'fg-link-hover': 'var(--fg-link-hover)',
            'fg-link-underline-default': 'var(--fg-link-underline-default)',
            'fg-link-underline-hover': 'var(--fg-link-underline-hover)',
            'fg-status-error': 'var(--fg-status-error)',
            'fg-status-success': 'var(--fg-status-success)',
            'fg-status-warning': 'var(--fg-status-warning)',
            'primary-50': 'rgb(var(--color-primary-50) / <alpha-value>)',
            'primary-100': 'rgb(var(--color-primary-100) / <alpha-value>)',
            'primary-200': 'rgb(var(--color-primary-200) / <alpha-value>)',
            'primary-300': 'rgb(var(--color-primary-300) / <alpha-value>)',
            'primary-400': 'rgb(var(--color-primary-400) / <alpha-value>)',
            'primary-500': 'rgb(var(--color-primary-500) / <alpha-value>)',
            'secondary-50': 'rgb(var(--color-secondary-50) / <alpha-value>)',
            'secondary-100': 'rgb(var(--color-secondary-100) / <alpha-value>)',
            'secondary-200': 'rgb(var(--color-secondary-200) / <alpha-value>)',
            'secondary-300': 'rgb(var(--color-secondary-300) / <alpha-value>)',
            'secondary-400': 'rgb(var(--color-secondary-400) / <alpha-value>)',
            'neutral-100': 'rgb(var(--color-neutral-100) / <alpha-value>)',
            'neutral-200': 'rgb(var(--color-neutral-200) / <alpha-value>)',
            'neutral-300': 'rgb(var(--color-neutral-300) / <alpha-value>)',
            'neutral-400': 'rgb(var(--color-neutral-400) / <alpha-value>)',
            'neutral-50': 'rgb(var(--color-neutral-50) / <alpha-value>)',
            'neutral-500': 'rgb(var(--color-neutral-500) / <alpha-value>)',
            'neutral-600': 'rgb(var(--color-neutral-600) / <alpha-value>)',
            'neutral-700': 'rgb(var(--color-neutral-700) / <alpha-value>)',
            'neutral-800': 'rgb(var(--color-neutral-800) / <alpha-value>)',
            'neutral-900': 'rgb(var(--color-neutral-900) / <alpha-value>)',
            'error-100': 'rgb(var(--color-error-100) / <alpha-value>)',
            'warning-100': 'rgb(var(--color-warning-100) / <alpha-value>)',
            'success-100': 'rgb(var(--color-success-100) / <alpha-value>)',
            'gradient-transparent': 'var(--gradient-transparent)',
        },
        extend: {
            backgroundImage: {
                'gradient-transparent': 'linear-gradient(var(--gradient-transparent))',
            },
        }
    },
}

export default preset
