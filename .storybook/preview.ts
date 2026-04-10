import type { Preview } from '@storybook/vue3-vite'
import { provide } from 'vue'
import './css/tailwind.css'
import '../src/themes/alpa/style/tailwind.css'
import '../src/themes/king/style/tailwind.css'
import { AppConfigSymbol } from '../src/composables/useAppConfig'
import { EventBusSymbol } from '../src/composables/useEventBus'
import toast from '../src/plugins/toast'
import type { UiToastClosePayload, UiToastEventBus, UiToastItem } from '../src/components/notifications/toast/types'
import { getThemeConfig } from '../src/themes/registry'

function createStorybookEventBus(): UiToastEventBus {
    const toastShowHandlers = new Set<(toast: UiToastItem) => void>()
    const toastCloseHandlers = new Set<(toast: UiToastClosePayload) => void>()

    return {
        $on(event, handler) {
            if (event === 'toast.show') {
                toastShowHandlers.add(handler)
                return
            }

            toastCloseHandlers.add(handler)
        },
        $off(event, handler) {
            if (event === 'toast.show') {
                toastShowHandlers.delete(handler)
                return
            }

            toastCloseHandlers.delete(handler)
        },
        $emit(event, payload) {
            if (event === 'toast.show') {
                toastShowHandlers.forEach((handler) => handler(payload))
                return
            }

            toastCloseHandlers.forEach((handler) => handler(payload))
        },
    }
}

const storybookEventBus = createStorybookEventBus()
toast.init(storybookEventBus)

const TAILWIND_VIEWPORTS = {
    xxs: {
        name: 'xxs (320px)',
        styles: { width: '320px', height: '568px' },
        type: 'mobile',
    },
    xs: {
        name: 'xs (352px)',
        styles: { width: '352px', height: '844px' },
        type: 'mobile',
    },
    sm: {
        name: 'sm (545px)',
        styles: { width: '545px', height: '900px' },
        type: 'mobile',
    },
    md: {
        name: 'md (752px)',
        styles: { width: '752px', height: '1024px' },
        type: 'tablet',
    },
    lg: {
        name: 'lg (1088px)',
        styles: { width: '1088px', height: '768px' },
        type: 'desktop',
    },
    xl: {
        name: 'xl (1280px)',
        styles: { width: '1280px', height: '800px' },
        type: 'desktop',
    },
    '2xl': {
        name: '2xl (1440px)',
        styles: { width: '1440px', height: '900px' },
        type: 'desktop',
    },
    '3xl': {
        name: '3xl (1600px)',
        styles: { width: '1600px', height: '900px' },
        type: 'desktop',
    },
    '4xl': {
        name: '4xl (1800)',
        styles: { width: '1800px', height: '900px' },
        type: 'desktop',
    },
} as const

type ThemeKey = 'alpa' | 'king'
type ThemeChoice = 'default' | ThemeKey

export const globalTypes = {
    productTheme: {
        name: 'Theme',
        description: 'Product theme',
        defaultValue: 'alpa',
        toolbar: {
            icon: 'paintbrush',
            items: [
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
        const activeTheme = choice === 'default' ? 'alpa' : choice

        if (choice === 'default') {
            document.documentElement.removeAttribute('data-product')
        } else {
            document.documentElement.setAttribute('data-product', choice)
        }

        const Story = story()
        return {
            components: { Story },
            setup() {
                provide(AppConfigSymbol, getThemeConfig(activeTheme))
                provide(EventBusSymbol, storybookEventBus)
                return {}
            },
            template: '<Story />',
        }
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
