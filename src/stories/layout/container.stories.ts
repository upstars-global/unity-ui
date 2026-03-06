import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { onBeforeUnmount, onMounted, ref } from 'vue'


const breakpoints = [
  { name: 'xxs', min: 320, containerPadding: '16px' },
  { name: 'xs', min: 390, containerPadding: '16px' },
  { name: 'sm', min: 500, containerPadding: '16px' },
  { name: 'md', min: 760, containerPadding: '24px' },
  { name: 'lg', min: 1020, containerPadding: '32px' },
  { name: 'xl', min: 1280, containerPadding: '40px' },
  { name: '2xl', min: 1440, containerPadding: '40px' },
  { name: '3xl', min: 1600, containerPadding: '40px' },
  { name: '4xl', min: 1800, containerPadding: '40px' },
]

const meta = {
  title: 'Foundation/Layout/Container',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    setup() {
      const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

      const onResize = () => {
        width.value = window.innerWidth
      }

      onMounted(() => {
        window.addEventListener('resize', onResize)
      })

      onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize)
      })

      return { args, breakpoints, width }
    },
    template: `
      <div class="mt-2">
        <div class="container rounded-lg border border-black/10 bg-white p-4 mb-4 shadow-sm">
          <div class="text-sm font-medium">Container demo</div>
          <div class="mt-1 text-xs text-black/60">
            Измени ширину viewport в Storybook. Внутренний блок всегда имеет класс <code>.container</code>.
          </div>
          <div class="mt-3 flex flex-wrap gap-2 text-xs">
            <span class="rounded bg-black/5 px-2 py-1">viewport: {{ width }}px</span>
            <span
              v-for="bp in breakpoints"
              :key="bp.name"
              class="rounded bg-black/5 px-2 py-1"
              :class="{ 'bg-black text-white': width >= bp.min }"
            >
              {{ bp.name }} ({{ bp.min }}+) / px {{ bp.containerPadding }}
            </span>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-xl border border-black/10 bg-[#f6f8fb] py-6">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 w-8 bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0.08)_6px,transparent_6px,transparent_12px)] md:w-12 lg:w-16 xl:w-20"
          />
          <div
            class="pointer-events-none absolute inset-y-0 right-0 w-8 bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0.08)_6px,transparent_6px,transparent_12px)] md:w-12 lg:w-16 xl:w-20"
          />

          <div class="container relative">
            <div class="rounded-lg border-2 border-dashed border-black/30 bg-white p-5">
              <div class="text-xs uppercase tracking-wider text-black/50">.container</div>
              <div class="mt-2 text-sm">
                Этот блок центрируется через <code>container.center</code> и получает боковые отступы через
                <code>container.padding</code> из <code>tailwind.config.ts</code>.
              </div>
              <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div class="rounded bg-black/5 p-3 text-xs">Card 1</div>
                <div class="rounded bg-black/5 p-3 text-xs">Card 2</div>
                <div class="rounded bg-black/5 p-3 text-xs">Card 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
