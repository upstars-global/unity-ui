import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiRadialProgress from '../../components/progress/radial/UiRadialProgress.vue'
import {
  RADIAL_PROGRESS_START_POSITIONS,
  type UiRadialProgressStartPosition,
} from '../../components/progress/radial/types'

type RadialProgressStoryArgs = {
  progress: number
  progressWidth: number
  max: number
  size: number
  startAngle: UiRadialProgressStartPosition
  gap: number
  rounded: boolean
  isAnimation: boolean
}

const POSITION_LABELS: Record<UiRadialProgressStartPosition, string> = {
  top: 'top',
  'top-right': 'top-right',
  right: 'right',
  'bottom-right': 'bottom-right',
  bottom: 'bottom',
  'bottom-left': 'bottom-left',
  left: 'left',
  'top-left': 'top-left',
}

const meta = {
  title: 'Components/RadialProgress',
  component: UiRadialProgress,
  tags: ['autodocs'],
  args: {
    progress: 72,
    progressWidth: 8,
    max: 100,
    size: 120,
    startAngle: 'bottom',
    gap: 0,
    rounded: false,
    isAnimation: true,
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    progressWidth: {
      control: { type: 'range', min: 1, max: 24, step: 1 },
    },
    max: {
      control: { type: 'number', min: 1, step: 1 },
    },
    size: {
      control: { type: 'range', min: 40, max: 240, step: 4 },
    },
    startAngle: {
      control: 'select',
      options: RADIAL_PROGRESS_START_POSITIONS,
    },
    gap: {
      control: { type: 'range', min: 0, max: 180, step: 1 },
    },
    rounded: {
      control: 'boolean',
    },
    isAnimation: {
      control: 'boolean',
    },
  },
} satisfies Meta<RadialProgressStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiRadialProgress },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="inline-flex rounded-3xl border border-white/10 bg-bg-surface p-8">
          <UiRadialProgress v-bind="args">
            <template #default="{ progress, max }">
              <div class="flex flex-col items-center">
                <div class="text-2xl font-semibold text-fg-primary">{{ progress }}</div>
                <div class="text-xs uppercase tracking-[0.1em] text-fg-secondary">of {{ max }}</div>
              </div>
            </template>
          </UiRadialProgress>
        </div>
      </div>
    `,
  }),
}

export const PositionsMatrix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiRadialProgress },
    setup() {
      return {
        positions: RADIAL_PROGRESS_START_POSITIONS,
        labels: POSITION_LABELS,
      }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <section
            v-for="position in positions"
            :key="position"
            class="rounded-2xl border border-white/10 bg-bg-surface p-5"
          >
            <div class="mb-4 text-xs uppercase tracking-[0.1em] text-fg-secondary">
              {{ labels[position] }}
            </div>

            <div class="flex items-center justify-center">
              <UiRadialProgress
                :progress="72"
                :progress-width="8"
                :size="112"
                :gap="32"
                rounded
                :start-angle="position"
              >
                <template #default="{ progress }">
                  <div class="text-xl font-semibold text-fg-primary">{{ progress }}%</div>
                </template>
              </UiRadialProgress>
            </div>
          </section>
        </div>
      </div>
    `,
  }),
}
