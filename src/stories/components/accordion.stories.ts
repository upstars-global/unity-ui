import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import UiAccordion from '../../components/accordion/UiAccordion.vue'
import UiButton from '../../components/button/UiButton.vue'

type AccordionStoryArgs = {
  title: string
  content: string
}

const meta = {
  title: 'Components/Accordions/Accordion',
  component: UiAccordion,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    content: `Unity UI helps teams build compact disclosure patterns that stay consistent across themes.

Use the accordion when content should stay hidden until the user intentionally expands a section.

This story mirrors the Figma states with one-line header text and a roomy expanded panel.`,
  },
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
} satisfies Meta<AccordionStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

function renderAccordion(args: AccordionStoryArgs) {
  return {
    components: { UiAccordion, UiButton },
    setup() {
      const appendedBlocks = ref(0)

      const extraContent = computed(() => {
        return Array.from({ length: appendedBlocks.value }, (_, index) => {
          return `Additional content block ${index + 1}. This text is appended to the bottom of the default slot to verify that the accordion recalculates its height correctly when content grows after opening.`
        })
      })

      function appendContent() {
        appendedBlocks.value += 1
      }

      return {
        appendContent,
        args,
        extraContent,
      }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="flex items-start gap-4 mb-4">
          <UiAccordion 
              :title="args.title">
            <div class="text-body text-fg-secondary">
              <p
                v-for="(paragraph, index) in args.content.split('\\n\\n')"
                :key="index"
                class="mb-4 last:mb-0"
              >
                {{ paragraph }}
              </p>
            </div>
          </UiAccordion
          >
          <UiAccordion
            :title="args.title"
            default-opened
          >
            <div class="text-body text-fg-secondary">
              <p
                v-for="(paragraph, index) in args.content.split('\\n\\n')"
                :key="index"
                class="mb-4 last:mb-0"
              >
                {{ paragraph }}
              </p>
            </div>
          </UiAccordion>
        </div>
        <UiAccordion
            title="Accordion with action slot"
            default-opened
        >
          <div class="space-y-4 text-body text-fg-secondary">
            <p
                v-for="(paragraph, index) in args.content.split('\\n\\n')"
                :key="index"
            >
              {{ paragraph }}
            </p>

            <div
                v-for="(paragraph, index) in extraContent"
                :key="'extra-' + index"
            >
              {{ paragraph }}
            </div>
          </div>

          <template #action>
            <UiButton
                variant="secondary"
                size="md"
                @click="appendContent"
            >
              Add content
            </UiButton>
          </template>
        </UiAccordion>
      </div>
    `,
  }
}

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: renderAccordion,
}
