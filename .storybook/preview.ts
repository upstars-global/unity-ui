import type { Preview } from '@storybook/vue3-vite'
import './css/tailwind.css'
import '../src/themes/alpa/tailwind.css'
import '../src/themes/king/tailwind.css'

const TAILWIND_VIEWPORTS = {
    xxs: {
        name: 'xxs (320)',
        styles: { width: '320px', height: '568px' },
        type: 'mobile',
    },
    xs: {
        name: 'xs (390)',
        styles: { width: '390px', height: '844px' },
        type: 'mobile',
    },
    sm: {
        name: 'sm (500)',
        styles: { width: '500px', height: '900px' },
        type: 'mobile',
    },
    md: {
        name: 'md (760)',
        styles: { width: '760px', height: '1024px' },
        type: 'tablet',
    },
    lg: {
        name: 'lg (1020)',
        styles: { width: '1020px', height: '768px' },
        type: 'desktop',
    },
    xl: {
        name: 'xl (1280)',
        styles: { width: '1280px', height: '800px' },
        type: 'desktop',
    },
    '2xl': {
        name: '2xl (1440)',
        styles: { width: '1440px', height: '900px' },
        type: 'desktop',
    },
    '3xl': {
        name: '3xl (1600)',
        styles: { width: '1600px', height: '900px' },
        type: 'desktop',
    },
} as const

type ThemeKey = 'alpa' | 'king'
type ThemeChoice = 'default' | ThemeKey

export const globalTypes = {
    productTheme: {
        name: 'Theme',
        description: 'Product theme',
        defaultValue: 'default',
        toolbar: {
            icon: 'paintbrush',
            items: [
                { value: 'default', title: 'Storybook default' },
                { value: 'alpa', title: 'Alpa' },
                { value: 'king', title: 'King' },
            ],
            showName: true,
        },
    },
}

export const decorators = [
    (story, context) => {
        const choice = (context.globals.productTheme || 'default') as ThemeChoice

        if (choice === 'default') {
            document.documentElement.removeAttribute('data-product')
        } else {
            document.documentElement.setAttribute('data-product', choice)
        }

        return story()
    },
]

const preview: Preview = {
    initialGlobals: {
        viewport: { value: 'xs', isRotated: false },
    },
    parameters: {
        viewport: {
            disable: false,
            options: TAILWIND_VIEWPORTS,
        },
    },
}

export default preview
