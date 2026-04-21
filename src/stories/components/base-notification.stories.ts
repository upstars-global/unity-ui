import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiBaseNotification from '../../components/notifications/baseNotification/UiBaseNotification.vue'
import {
  BASE_NOTIFICATION_VARIANTS,
  type BaseNotificationVariants,
} from '../../components/notifications/baseNotification/types'

type BaseNotificationStoryArgs = {
  variant: BaseNotificationVariants
  content: string
}

const meta = {
  title: 'Components/Base Notification',
  component: UiBaseNotification,
  tags: ['autodocs'],
  args: {
    variant: 'neutral',
    content: 'This is a compact notification message for status feedback.',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: BASE_NOTIFICATION_VARIANTS },
    content: { control: 'text' },
  },
} satisfies Meta<BaseNotificationStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiBaseNotification },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="max-w-[420px] rounded-2xl border border-black/10 bg-bg-surface-alt p-4">
          <UiBaseNotification :variant="args.variant" class="px-4 py-3">
            {{ args.content }}
          </UiBaseNotification>
        </div>
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiBaseNotification },
    setup() {
      return {
        items: [
          {
            variant: 'neutral',
            label: 'neutral',
            content: 'General information for the current screen or next step.',
          },
          {
            variant: 'success',
            label: 'success',
            content: 'Everything is saved and the action completed successfully.',
          },
          {
            variant: 'error',
            label: 'error',
            content: 'Something went wrong. Please review the data and try again.',
          },
        ] satisfies Array<{
          variant: BaseNotificationVariants
          label: string
          content: string
        }>,
      }
    },
    template: `
      <div class="space-y-4 bg-bg-deep p-6">
        <section
          v-for="item in items"
          :key="item.variant"
          class="max-w-[520px] rounded-2xl border border-black/10 bg-bg-surface-alt p-4"
        >
          <div class="mb-3 text-xs uppercase tracking-[0.1em] text-fg-secondary">
            {{ item.label }}
          </div>

          <UiBaseNotification :variant="item.variant" class="px-4 py-3">
            {{ item.content }}
          </UiBaseNotification>
        </section>
      </div>
    `,
  }),
}
