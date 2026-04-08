import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiReadMore from '../../components/readMore/UiReadMore.vue'
import type { UiReadMoreProps } from '../../components/readMore/types'

type ReadMoreStoryArgs = {
  startHeight: number
  showLessButton: boolean
  buttonLabel: UiReadMoreProps['buttonLabel']
  content: string
}

const meta = {
  title: 'Components/Accordions/ReadMore',
  component: UiReadMore,
  tags: ['autodocs'],
  args: {
    startHeight: 96,
    showLessButton: true,
    content: `Unity UI helps teams keep a shared visual language while moving quickly across product surfaces.

The read more pattern is useful when we want to keep dense content compact on first paint, but still let the reader expand it without leaving the flow of the page.

This example uses a few paragraphs so the gradient mask and the toggle state are both easy to review in Storybook.`,
    buttonLabel: {
      more: 'Read more',
      less: 'Read less',
    },
  },
  argTypes: {
    startHeight: { control: { type: 'number', min: 10, step: 4 } },
    showLessButton: { control: 'boolean' },
    buttonLabel: { control: 'object' },
    content: { control: 'text' },
  },
} satisfies Meta<ReadMoreStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiReadMore },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="max-w-2xl rounded-2xl border border-white/10 bg-black/10 p-5 text-fg-primary">
          <UiReadMore
            :start-height="args.startHeight"
            :show-less-button="args.showLessButton"
            :button-label="args.buttonLabel"
          >
            <h2 class="mb-4">T&C</h2>
            <div class="space-y-4 text-body">
              <p
                v-for="(paragraph, index) in args.content.split('\\n\\n')"
                :key="index"
              >
                {{ paragraph }}
              </p>
            </div>
          </UiReadMore>
        </div>
      </div>
    `,
  }),
}
