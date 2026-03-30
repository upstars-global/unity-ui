import type { Meta, StoryObj } from '@storybook/vue3-vite'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { computed } from 'vue'
import UiTimer from '../../components/timer/UiTimer.vue'
import type { UiTimerLabels } from '../../components/timer/types'

dayjs.extend(utc)

type TimerStoryArgs = {
  startLabel: string
  finishLabel: string
  expiredLabel: string
  labels: UiTimerLabels
  enableStartAt: boolean
  startAt?: number
  finishAt: number
}

function createTimerValue(offsetMs: number) {
  return dayjs.utc().add(offsetMs, 'millisecond')
}

function toTimestamp(value: Dayjs) {
  return value.valueOf()
}

const meta = {
  title: 'Components/Timer',
  component: UiTimer,
  tags: ['autodocs'],
  args: {
    startLabel: 'Starts in:',
    finishLabel: 'Finishes in:',
    expiredLabel: 'Event is over',
    labels: {
      d: 'd',
      h: 'h',
      m: 'm',
      s: 's',
    },
    enableStartAt: true,
    startAt: toTimestamp(createTimerValue(6 * 60 * 60 * 1000)),
    finishAt: toTimestamp(createTimerValue((24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000))),
  },
  argTypes: {
    config: {
      control: false,
      table: { disable: true },
    },
    variant: {
      control: false,
      table: { disable: true },
    },
    startLabel: {
      control: 'text',
      description: 'Label shown while timer counts down to startAt.',
      table: { category: 'Labels' },
    },
    finishLabel: {
      control: 'text',
      description: 'Main label shown while timer counts down to finishAt.',
      table: { category: 'Labels' },
    },
    expiredLabel: {
      control: 'text',
      description: 'Text shown after finishAt has passed.',
      table: { category: 'Labels' },
    },
    enableStartAt: {
      control: 'boolean',
      description: 'Quickly enable or disable startAt to test cases without a start phase.',
      table: { category: 'Timeline' },
    },
    startAt: {
      control: 'date',
      description: 'Optional start date. Before this moment the timer uses the start label and yellow marker.',
      table: { category: 'Timeline' },
    },
    finishAt: {
      control: 'date',
      description: 'Required finish date. Until this moment the timer uses the finish label and green marker.',
      table: { category: 'Timeline' },
    },
  },
} satisfies Meta<TimerStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiTimer },
    setup() {
      return {
        args,
        timerConfig: computed(() => ({
          startAt: args.enableStartAt && args.startAt ? {
            label: args.startLabel,
            value: dayjs.utc(args.startAt),
          } : undefined,
          finishAt: {
            label: args.finishLabel,
            value: dayjs.utc(args.finishAt),
          },
          expired: {
            label: args.expiredLabel,
          },
        })),
      }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="flex gap-4">
          <div class="space-y-2">
            <div class="text-xs font-medium uppercase text-white">filled</div>
            <div class="inline-flex rounded-2xl border border-white/10 bg-white p-4">
              <UiTimer
                variant="filled"
                :config="timerConfig"
                :labels="args.labels"
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-xs font-medium uppercase  text-white">ghost</div>
            <div class="inline-flex rounded-2xl bg-bg-surface p-4">
              <UiTimer
                variant="ghost"
                :config="timerConfig"
                :labels="args.labels"
              />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const VariantsMatrix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiTimer },
    setup() {
      return {
        startConfig: {
          startAt: {
            label: 'Starts in:',
            value: createTimerValue((24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000)),
          },
          finishAt: {
            label: 'Finishes in:',
            value: createTimerValue((48 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000)),
          },
          expired: {
            label: 'Event is over',
          },
        },
        finishConfig: {
          finishAt: {
            label: 'Finishes in:',
            value: createTimerValue((10 * 60 * 60 * 1000) + (12 * 60 * 1000)),
          },
          expired: {
            label: 'Event is over',
          },
        },
        overConfig: {
          finishAt: {
            label: 'Finishes in:',
            value: createTimerValue(-5 * 60 * 1000),
          },
          expired: {
            label: 'Event is over',
          },
        },
      }
    },
    template: `
      <div class="space-y-6 bg-bg-deep p-6">
        <div class="text-xs font-medium uppercase text-white">filled</div>
        <section class="flex gap-2 rounded-2xl border border-white/10 bg-bg-surface-alt p-4">
          <UiTimer :config="startConfig" />
          <UiTimer :config="finishConfig" />
          <UiTimer :config="overConfig" />
        </section>

        <div class="text-xs font-medium uppercase text-white">ghost</div>
        <section class="flex gap-2 rounded-2xl bg-bg-surface p-4">
          <UiTimer :config="startConfig" variant="ghost" />
          <UiTimer :config="finishConfig" variant="ghost" />
          <UiTimer :config="overConfig" variant="ghost" />
        </section>
      </div>
    `,
  }),
}
