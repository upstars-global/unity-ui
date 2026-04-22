import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiProgressBar from '../../components/progress/linear/UiProgressBar.vue'

type LinearProgressStoryArgs = {
  progress: number
  title: string
  caption: string
}

const meta = {
  title: 'Components/LinearProgress',
  component: UiProgressBar,
  tags: ['autodocs'],
  args: {
    progress: 64,
    title: 'Uploading files',
    caption: '4 of 6 files processed',
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    title: {
      control: 'text',
    },
    caption: {
      control: 'text',
    },
  },
} satisfies Meta<LinearProgressStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiProgressBar },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6 flex flex-col gap-4">
        <div class="w-full rounded-3xl border border-white/10 bg-bg-surface p-6">
          <UiProgressBar :progress="args.progress">
            <template #top>
              <div class="flex items-center justify-between">
                <span class="text-fg-secondary">{{ args.title }}</span>
                <span class="font-bold text-fg-primary">{{ args.progress }}%</span>
              </div>
            </template>

            <div class="mt-3 text-sm text-fg-secondary">
              {{ args.caption }}
            </div>
          </UiProgressBar>
        </div>

        <div class="w-full rounded-3xl border border-white/10 bg-bg-surface p-6">
          <UiProgressBar :progress="args.progress">
            <template #left>
              {{ args.progress }}%
            </template>
          </UiProgressBar>
        </div>
        <div class="w-full rounded-3xl border border-white/10 bg-bg-surface p-6">
          <UiProgressBar :progress="args.progress">
            <template #bottom>
              <div class="flex items-center justify-between">
                <span class="text-fg-secondary">{{ args.caption }}</span>
                <span class="font-bold text-fg-primary">{{ args.progress }}%</span>
              </div>
            </template>
          </UiProgressBar>
        </div>
      </div>
    `,
  }),
}

