import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiBadge from '../../components/badge/UiBadge.vue'
import {
  BADGE_DEFAULT_VARIANT,
  BADGE_VARIANT_GROUPS,
  BADGE_VARIANTS,
  type BadgeVariant,
} from '../../components/badge/types'

type BadgeStoryArgs = {
  label: string
  variant: BadgeVariant
}

const meta = {
  title: 'Components/Badge',
  component: UiBadge,
  tags: ['autodocs'],
  args: {
    label: 'Status',
    variant: BADGE_DEFAULT_VARIANT,
  },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: BADGE_VARIANTS },
  },
} satisfies Meta<BadgeStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="inline-flex rounded-2xl border border-white/10 bg-black/10 p-4">
          <UiBadge :variant="args.variant">
            {{ args.label }}
          </UiBadge>
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
    components: { UiBadge },
    setup() {
      return {
        statusVariants: BADGE_VARIANT_GROUPS.status,
        navigationVariants: BADGE_VARIANT_GROUPS.navigation,
        neutralVariants: BADGE_VARIANT_GROUPS.neutral,
      }
    },
    template: `
      <div class="space-y-8 bg-bg-deep p-6">
        <section class="inline-flex rounded-2xl border border-white/10 bg-black/10 p-4">
          <div class="space-y-4">
            <div class="text-xs uppercase tracking-[0.1em] text-white/50">badge-status</div>

            <div class="space-y-4 rounded-xl border border-white/10 bg-black/10 p-4">
              <UiBadge
                v-for="variant in statusVariants"
                :key="variant"
                :variant="variant"
              >
                Status
              </UiBadge>
            </div>
          </div>
        </section>

        <section class="inline-flex rounded-2xl border border-white/10 bg-black/10 p-4">
          <div class="space-y-4">
            <div class="text-xs uppercase tracking-[0.1em] text-white/50">badge-navigation</div>

            <div class="space-y-4 rounded-xl border border-white/10 bg-black/10 p-4">
              <UiBadge
                v-for="variant in navigationVariants"
                :key="variant"
                :variant="variant"
              >
                Status
              </UiBadge>
            </div>
          </div>
        </section>

        <section class="inline-flex rounded-2xl bg-white p-4">
          <div class="space-y-4">
            <div class="text-xs uppercase tracking-[0.1em] text-black/45">badge-neutral</div>

            <div class="space-y-4 rounded-xl bg-neutral-50 p-4">
              <UiBadge
                v-for="variant in neutralVariants"
                :key="variant"
                :variant="variant"
              >
                Status
              </UiBadge>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
}
