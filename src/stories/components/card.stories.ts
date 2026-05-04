import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiCard from '../../components/card/UiCard.vue'
import {
  CARD_DEFAULT_VARIANT,
  CARD_VARIANTS,
  type CardVariant,
} from '../../components/card/types'

type CardStoryArgs = {
  variant: CardVariant
  content: string
}

const meta = {
  title: 'Components/Card',
  component: UiCard,
  tags: ['autodocs'],
  args: {
    variant: CARD_DEFAULT_VARIANT,
    content: 'Card content',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: CARD_VARIANTS },
    content: { control: 'text' },
  },
} satisfies Meta<CardStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiCard },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <UiCard :variant="args.variant" class="max-w-[536px]">
          <div class="min-h-[196px] p-4 text-fg-primary">
            <div class="mb-2 text-xs uppercase tracking-[0.1em] text-fg-secondary">
              {{ args.variant }}
            </div>
            <div class="text-body">
              {{ args.content }}
            </div>
          </div>
        </UiCard>
      </div>
    `,
  }),
}

export const VariantsMatrix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiCard },
    setup() {
      return {
        variants: CARD_VARIANTS,
      }
    },
    template: `
      <div class="space-y-6 bg-bg-deep p-6">
        <section
          v-for="variant in variants"
          :key="variant"
          class="rounded-2xl border border-white/10 bg-black/10 p-4"
        >
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-white/50">
            {{ variant }}
          </div>

          <div class="grid gap-4 lg:grid-cols-[536px_328px]">
            <UiCard :variant="variant">
              <div class="min-h-[196px] p-4 text-fg-primary">
                <div class="text-body">Wide card</div>
              </div>
            </UiCard>

            <UiCard :variant="variant">
              <div class="min-h-[196px] p-4 text-fg-primary">
                <div class="text-body">Compact card</div>
              </div>
            </UiCard>
          </div>
        </section>
      </div>
    `,
  }),
}
