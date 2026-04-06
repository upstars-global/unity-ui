import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import { computed } from 'vue'
import { createMemoryHistory, createRouter, useRoute } from 'vue-router'
import UiTabs from '../../components/tabs/UiTabs.vue'
import type { UiTabsItem } from '../../components/tabs/types'

type TabsStoryArgs = {
  menu: UiTabsItem[]
}

const TAB_COUNT = 9
const tabRoutes = Array.from({ length: TAB_COUNT }, (_, index) => {
  const tabNumber = index + 1
  const path = `/tab-${tabNumber}`

  return {
    path,
    component: { template: '<div />' },
  }
})

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', redirect: '/tab-1' },
    ...tabRoutes,
  ],
})

setup((app) => {
  app.use(router)
})

const defaultTabs: UiTabsItem[] = Array.from({ length: TAB_COUNT }, (_, index) => {
  const tabNumber = index + 1

  return {
    label: `Tab ${tabNumber}`,
    to: `/tab-${tabNumber}`,
    accent: tabNumber === 2 || tabNumber === 7,
    disabled: tabNumber === 9,
  }
})

const meta = {
  title: 'Components/Tabs',
  component: UiTabs,
  tags: ['autodocs'],
  args: {
    menu: defaultTabs,
  },
  argTypes: {
    menu: { control: false },
  },
} satisfies Meta<TabsStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

function createRouteNavigationStory(initialPath: string, hint: string): Story {
  return {
    parameters: {
      controls: { disable: true },
    },
    loaders: [
      async () => {
        await router.replace(initialPath)
        await router.isReady()

        return {}
      },
    ],
    render: (args) => ({
      components: { UiTabs },
      setup() {
        const route = useRoute()
        const currentPath = computed(() => route.path)
        const currentSection = computed(() => {
          const matchedTab = args.menu.find((item) => item.to === route.path)

          if (!matchedTab) {
            return 'Unknown route'
          }

          return `${matchedTab.label} content`
        })

        return {
          args,
          currentPath,
          currentSection,
          hint,
        }
      },
      template: `
        <div class="space-y-4 bg-bg-deep p-6">
          <div class="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div class="mb-3 text-caption uppercase tracking-[0.1em] text-fg-secondary">
              {{ hint }}
            </div>

            <UiTabs :menu="args.menu" />
          </div>

          <div class="rounded-3xl border border-white/10 bg-white/5 p-4 text-fg-primary">
            <div class="mb-2 text-caption uppercase tracking-[0.1em] text-fg-secondary">
              Current route
            </div>

            <div class="text-body">{{ currentPath }}</div>
            <div class="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4 text-body">
              {{ currentSection }}
            </div>
          </div>
        </div>
      `,
    }),
  }
}

export const RouteNavigation: Story = createRouteNavigationStory(
  '/tab-1',
  'Click tabs to change route',
)

export const ScrollToSeventhOnMount: Story = createRouteNavigationStory(
  '/tab-7',
  'Starts with tab 7 active to verify mount scroll',
)
