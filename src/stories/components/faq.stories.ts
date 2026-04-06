import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiFaq from '../../components/faq/UiFaq.vue'
import type { IQuestionItem } from '../../components/faq/types'

type FaqStoryArgs = {
  title: string
  questions: IQuestionItem[]
}

const meta = {
  title: 'Components/Accordions/FAQ',
  component: UiFaq,
  tags: ['autodocs'],
  args: {
    title: 'Frequently asked questions',
    questions: [
      {
        question: 'How do I pass data into the component?',
        answer:
          'Pass a title and a questions array. Each question item should contain question and answer fields as strings.',
      },
      {
        question: 'Can I customize the title markup?',
        answer:
          'Yes. The component exposes a title slot, so you can render your own heading while keeping the same FAQ body.',
      },
      {
        question: 'What is the expected content shape for answers?',
        answer:
          'Answers are rendered as plain text content inside the accordion body, which makes the component a good fit for compact help and onboarding sections.',
      },
    ],
  },
  argTypes: {
    title: { control: 'text' },
    questions: { control: 'object' },
  },
} satisfies Meta<FaqStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiFaq },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6 text-fg-primary">
        <div class="bg-black/10 p-6">
          <UiFaq
            :title="args.title"
            :questions="args.questions"
          />
        </div>
      </div>
    `,
  }),
}
