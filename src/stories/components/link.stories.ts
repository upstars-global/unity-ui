import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiLink from '../../components/link/UiLink.vue'
import { LINK_SiZES, type LinkSize } from '../../components/link/types'

type LinkStoryArgs = {
  label: string
  to?: string
  size: LinkSize
}

const meta = {
  title: 'Components/Link',
  component: UiLink,
  tags: ['autodocs'],
  args: {
    label: 'Open account details',
    to: 'https://example.com',
    size: 'default',
  },
  argTypes: {
    label: { control: 'text' },
    to: { control: 'text' },
    size: { control: 'inline-radio', options: LINK_SiZES },
  },
} satisfies Meta<LinkStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiLink },
    setup() {
      return { args }
    },
    template: `
      <div class="p-6 bg-bg-deep">
        <UiLink :to="args.to" :size="args.size">
          {{ args.label }}
        </UiLink>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiLink },
    setup() {
      return {
        sizes: LINK_SiZES,
      }
    },
    template: `
      <div class="space-y-4 p-6 bg-bg-deep">
        <div
          v-for="size in sizes"
          :key="size"
          class="rounded-2xl border border-black/10 bg-white p-4"
        >
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-black/45">{{ size }}</div>
          <UiLink :size="size" class="text-tit" to="https://example.com">
            Link for size {{ size }}
          </UiLink>
        </div>
      </div>
    `,
  }),
}

export const LinkKinds: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiLink },
    template: `
      <div class="space-y-4 p-6 bg-bg-deep">
        <div class="rounded-2xl border border-black/10 bg-white p-4">
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-black/45">External</div>
          <UiLink to="https://example.com">External link</UiLink>
        </div>

        <div class="rounded-2xl border border-black/10 bg-white p-4">
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-black/45">Phone</div>
          <UiLink to="tel:+380441234567">Call support</UiLink>
        </div>

        <div class="rounded-2xl border border-black/10 bg-white p-4">
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-black/45">Mailto</div>
          <UiLink to="mailto:test@example.com">Write us an email</UiLink>
        </div>

        <div class="rounded-2xl border border-black/10 bg-white p-4">
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-black/45">Anchor</div>
          <UiLink to="#section-details">Jump to section</UiLink>
        </div>

        <div class="rounded-2xl border border-black/10 bg-white p-4">
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-black/45">Without to</div>
          <UiLink>Static text link</UiLink>
        </div>
      </div>
    `,
  }),
}