import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import UiBadge from '../../components/badge/UiBadge.vue'

const containerRules = [
  { name: 'base', range: '320–543px', min: 320, full: '100%', centred: '100%', safezoneX: '1rem', safezoneBottom: '3rem' },
  { name: 'sm', range: '544–1087px', min: 544, full: '100%', centred: '32rem', safezoneX: '1.5rem', safezoneBottom: '3rem' },
  { name: 'lg', range: '1088–1279px', min: 1088, full: '65rem', centred: '65rem', safezoneX: '0', safezoneBottom: '5rem' },
  { name: 'xl', range: '1280–1439px', min: 1280, full: '70rem', centred: '65rem', safezoneX: '0', safezoneBottom: '5rem' },
  { name: '2xl', range: '1440–1663px', min: 1440, full: '80rem', centred: '65rem', safezoneX: '0', safezoneBottom: '5rem' },
  { name: '3xl', range: '1664px+', min: 1664, full: '80rem', centred: '65rem', safezoneX: '0', safezoneBottom: '5rem' },
]

const breakpoints = [
  { name: 'xxs', min: 320 },
  { name: 'xs', min: 352 },
  { name: 'sm', min: 544 },
  { name: 'md', min: 752 },
  { name: 'lg', min: 1088 },
  { name: 'xl', min: 1280 },
  { name: '2xl', min: 1440 },
  { name: '3xl', min: 1664 },
]

const meta = {
  title: 'Foundation/Layout/Container',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiBadge },
    setup() {
      const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

      const activeRule = computed(() => {
        return [...containerRules]
          .reverse()
          .find(({ min }) => width.value >= min) ?? containerRules[0]
      })

      const onResize = () => {
        width.value = window.innerWidth
      }

      onMounted(() => {
        window.addEventListener('resize', onResize)
      })

      onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize)
      })

      return { activeRule, breakpoints, containerRules, width }
    },
    template: `
      <div class="min-h-screen bg-bg-deep text-fg-primary">
        <header class="mx-16 xl:mx-auto mb-24 max-w-[80rem] rounded-16 bg-bg-surface p-16 shadow-fg-default md:p-24">
          <div class="flex flex-wrap items-start justify-between gap-16">
            <div>
              <h1 class="text-xl font-bold">Container rules</h1>
              <p class="mt-8 max-w-[44rem] text-sm text-fg-secondary">
                Изменяйте ширину viewport. Цветом бренда показан Full-контейнер, цветом статуса success —
                точечно вложенный Centred-контейнер.
              </p>
            </div>

            <UiBadge variant="navigation-default">
              viewport: {{ width }}px
            </UiBadge>
          </div>

          <div class="mt-16 flex flex-wrap gap-8 text-xs">
            <UiBadge
              v-for="breakpoint in breakpoints"
              :key="breakpoint.name"
              :variant="width >= breakpoint.min ? 'navigation-default' : 'neutral'"
            >
              {{ breakpoint.name }} · {{ breakpoint.min }}+
            </UiBadge>
          </div>

          <dl class="mt-16 grid gap-8 text-xs sm:grid-cols-2 lg:grid-cols-5">
            <div class="rounded-12 bg-primary-50/40 p-12">
              <dt class="text-fg-secondary">Active range</dt>
              <dd class="mt-4 font-bold">{{ activeRule.range }}</dd>
            </div>
            <div class="rounded-12 bg-primary-50/40 p-12">
              <dt class="text-fg-secondary">Full max-width</dt>
              <dd class="mt-4 font-bold">{{ activeRule.full }}</dd>
            </div>
            <div class="rounded-12 bg-success-100/10 p-12">
              <dt class="text-fg-secondary">Centred max-width</dt>
              <dd class="mt-4 font-bold">{{ activeRule.centred }}</dd>
            </div>
            <div class="rounded-12 bg-bg-surface-alt p-12">
              <dt class="text-fg-secondary">Safezone X</dt>
              <dd class="mt-4 font-bold">{{ activeRule.safezoneX }}</dd>
            </div>
            <div class="rounded-12 bg-bg-surface-alt p-12">
              <dt class="text-fg-secondary">Safezone bottom</dt>
              <dd class="mt-4 font-bold">{{ activeRule.safezoneBottom }}</dd>
            </div>
          </dl>
        </header>

        <section class="mb-24 overflow-hidden rounded-16 border border-neutral-200/80 bg-bg-surface py-24">
          <div class="mb-16 px-16 md:px-24">
            <div class="text-sm font-bold">1. Full container</div>
            <p class="mt-4 text-xs text-fg-secondary">
              Safezone-классы добавляются независимо от правила ширины контейнера.
            </p>
          </div>

          <div class="bg-bg-deep py-16">
            <section class="container border-x-2 border-b-2 border-dashed border-primary-300 bg-primary-50/40 pt-16">
              <div class="mb-12 flex items-center justify-between gap-12 px-12 text-xs font-bold text-fg-brand">
                <span>Full · base content</span>
                <span>{{ activeRule.full }}</span>
              </div>
              <div class="flex">
                <div class="h-64 rounded-8 bg-primary-100/40 p-12 text-xs w-full">
                  Mock block
                </div>
              </div>

              <div class="mb-12 flex items-center justify-between gap-12 px-12 py-12 text-xs font-bold text-fg-brand">
                <span>Full · Safezone X</span>
                <span>safezoneX: {{ activeRule.safezoneX }}</span>
              </div>
              <div class="container-safezone-x">
                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div v-for="item in 4" :key="item" class="h-64 rounded-8 bg-primary-100/40 p-12 text-xs">
                    Mock block {{ item }}
                  </div>
                </div>
              </div>

              <div class="mb-12 flex items-center justify-between gap-12 px-12 py-12 text-xs font-bold text-fg-brand">
                <span>Full · Safezone X + Bottom</span>
                <span>{{ activeRule.safezoneX }} / {{ activeRule.safezoneBottom }}</span>
              </div>
              <div class="container-safezone-x container-safezone-bottom">
                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div v-for="item in 4" :key="item" class="h-64 rounded-8 bg-primary-100/40 p-12 text-xs">
                    Mock block {{ item }}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section class="overflow-hidden rounded-16 border border-neutral-200/80 bg-bg-surface py-24">
          <div class="mb-16 px-12 md:px-24">
            <div class="text-sm font-bold">2. Full + Centred section</div>
            <code class="mt-4 block text-xs text-fg-secondary">.container-centred</code>
          </div>

          <div class="bg-bg-deep py-16">
            <section class="container-centred border-x-2 border-b-2 border-dashed border-success-100 bg-success-100/10 pt-16">
                <div class="mb-12 flex items-center justify-between gap-12 text-xs font-bold text-fg-status-success px-12">
                  <span>Centred · one column</span>
                  <span>{{ activeRule.centred }}</span>
                </div>
                <div class="mx-auto h-80 w-1/2 min-w-0 rounded-8 bg-success-100/40 p-12 text-center text-xs">
                  50% centred column
                </div>

              <div class="mb-12 flex items-center justify-between gap-12 py-12 text-xs font-bold text-fg-status-success px-12">
                <span>Centred · Safezone X</span>
                <span>safezoneX: {{ activeRule.safezoneX }}</span>
              </div>
              <div class="container-safezone-x">
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div class="h-80 rounded-8 bg-success-100/40 p-12 text-xs">Column 1</div>
                  <div class="h-80 rounded-8 bg-success-100/40 p-12 text-xs">Column 2</div>
                </div>
              </div>
              <div class="mb-12 flex items-center justify-between gap-12 py-12 text-xs font-bold text-fg-status-success px-12">
                <span>Centred · Safezone X + Bottom</span>
                <span>{{ activeRule.safezoneX }} / {{ activeRule.safezoneBottom }}</span>
              </div>
              <div class="container-safezone-x container-safezone-bottom">
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div class="h-80 rounded-8 bg-success-100/40 p-12 text-xs">Column 1</div>
                  <div class="h-80 rounded-8 bg-success-100/40 p-12 text-xs">Column 2</div>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section class="mx-auto mt-24 max-w-[80rem] overflow-hidden rounded-16 border border-neutral-200/80 bg-bg-surface">
          <div class="border-b border-neutral-200/80 px-16 py-12 text-sm font-bold">Rules matrix</div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[44rem] border-collapse text-left text-xs">
              <thead class="bg-bg-surface-alt text-fg-secondary">
                <tr>
                  <th class="px-12 py-8">Range</th>
                  <th class="px-12 py-8">Breakpoint</th>
                  <th class="px-12 py-8">Full</th>
                  <th class="px-12 py-8">Centred</th>
                  <th class="px-12 py-8">Safezone X</th>
                  <th class="px-12 py-8">Bottom</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="rule in containerRules"
                  :key="rule.name"
                  class="border-t border-neutral-200/80"
                  :class="activeRule.name === rule.name ? 'bg-warning-100/10' : ''"
                >
                  <td class="px-12 py-8 font-bold">{{ rule.range }}</td>
                  <td class="px-12 py-8">{{ rule.name }}</td>
                  <td class="px-12 py-8">{{ rule.full }}</td>
                  <td class="px-12 py-8">{{ rule.centred }}</td>
                  <td class="px-12 py-8">{{ rule.safezoneX }}</td>
                  <td class="px-12 py-8">{{ rule.safezoneBottom }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,
  }),
}
