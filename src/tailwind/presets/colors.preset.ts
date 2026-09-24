import { type Config } from 'tailwindcss'

const preset: Partial<Config> = {
    theme: {
        extend: {
            colors: {
                transparent: 'var(--color-transparent)',
                black: 'var(--color-black)',
                white: 'rgb(var(--color-white))',
                primary: {
                    '50': 'rgb(var(--color-primary-50) / <alpha-value>)',
                    '100': 'rgb(var(--color-primary-100) / <alpha-value>)',
                    '200': 'rgb(var(--color-primary-200) / <alpha-value>)',
                    '300': 'rgb(var(--color-primary-300) / <alpha-value>)',
                    '400': 'rgb(var(--color-primary-400) / <alpha-value>)',
                    '500': 'rgb(var(--color-primary-500) / <alpha-value>)',
                },
                secondary: {
                    '50': 'rgb(var(--color-secondary-50) / <alpha-value>)',
                    '100': 'rgb(var(--color-secondary-100) / <alpha-value>)',
                    '200': 'rgb(var(--color-secondary-200) / <alpha-value>)',
                    '300': 'rgb(var(--color-secondary-300) / <alpha-value>)',
                    '400': 'rgb(var(--color-secondary-400) / <alpha-value>)',
                },
                neutral: {
                    '50': 'rgb(var(--color-neutral-50) / <alpha-value>)',
                    '100': 'rgb(var(--color-neutral-100) / <alpha-value>)',
                    '200': 'rgb(var(--color-neutral-200) / <alpha-value>)',
                    '300': 'rgb(var(--color-neutral-300) / <alpha-value>)',
                    '400': 'rgb(var(--color-neutral-400) / <alpha-value>)',
                    '500': 'rgb(var(--color-neutral-500) / <alpha-value>)',
                    '600': 'rgb(var(--color-neutral-600) / <alpha-value>)',
                    '700': 'rgb(var(--color-neutral-700) / <alpha-value>)',
                    '800': 'rgb(var(--color-neutral-800) / <alpha-value>)',
                    '900': 'rgb(var(--color-neutral-900) / <alpha-value>)',
                },
                'error-100': 'rgb(var(--color-error-100) / <alpha-value>)',
                'warning-100': 'rgb(var(--color-warning-100) / <alpha-value>)',
                'success-100': 'rgb(var(--color-success-100) / <alpha-value>)',
            },
            backgroundColor: {
                'page-deep': 'var(--bg-page-deep)',
                'page-surface': 'var(--bg-page-surface)',
                'page-surface-alt': 'var(--bg-page-surface-alt)',
            },
            textColor: {
                'page-brand': 'var(--fg-page-brand)',
                'page-pending': 'var(--fg-page-pending)',
                'page-primary': 'var(--fg-page-primary)',
                'page-secondary': 'var(--fg-page-secondary)',
                'page-link-default': 'var(--fg-page-link-default)',
                'page-link-hover': 'var(--fg-page-link-hover)',
                'page-link-underline-default': 'var(--fg-page-link-underline-default)',
                'page-link-underline-hover': 'var(--fg-page-link-underline-hover)',
                'page-status-error': 'var(--fg-page-status-error)',
                'page-status-success': 'var(--fg-page-status-success)',
                'page-status-warning': 'var(--fg-page-status-warning)',
            },
            backgroundImage: {
                'gradient-transparent': 'linear-gradient(var(--gradient-transparent))',
                'gradient-personal': 'linear-gradient(var(--gradient-personal))',
                'gradient-card': 'linear-gradient(var(--gradient-card))',
            },
            boxShadow: {
                'fg-default': 'var(--shadow-fg-default)',
            }
        }
    },
}

export default preset
