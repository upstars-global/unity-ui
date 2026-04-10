import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiInlineActionNotification from '../../components/notifications/inlineActionNotification/UiInlineActionNotification.vue'
import UiButton from '../../components/button/UiButton.vue'
import type { UiInlineNotificationProps } from '../../components/notifications/inlineActionNotification/types'

type InlineActionNotificationStoryArgs = Required<Pick<UiInlineNotificationProps, 'title' | 'message'>> & {
  iconName?: UiInlineNotificationProps['iconName']
  primaryActionLabel: string
  secondaryActionLabel: string
}

const meta = {
  title: 'Components/Inline Action Notification',
  component: UiInlineActionNotification,
  tags: ['autodocs'],
  args: {
    title: 'Profile details need attention',
    message: 'Please review your account information before continuing to the next step.',
    iconName: 'fill_info',
    primaryActionLabel: 'Review now',
    secondaryActionLabel: 'Later',
  },
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    iconName: { control: 'text' },
    primaryActionLabel: { control: 'text' },
    secondaryActionLabel: { control: 'text' },
  },
} satisfies Meta<InlineActionNotificationStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiInlineActionNotification, UiButton },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="rounded-2xl border border-black/10 bg-bg-surface-alt p-4">
          <UiInlineActionNotification
            :title="args.title"
            :message="args.message"
            :icon-name="args.iconName"
          >
            <template #actions>
              <UiButton type="standard" variant="primary" size="sm">
                {{ args.primaryActionLabel }}
              </UiButton>
            </template>
          </UiInlineActionNotification>
        </div>
      </div>
    `,
  }),
}

export const Examples: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiInlineActionNotification, UiButton },
    setup() {
      return {
        items: [
          {
            id: 'info',
            iconName: 'fill_info',
            title: 'Complete your verification',
            message: 'We need a few more details to unlock all account features.',
            primaryActionLabel: 'Continue',
            secondaryActionLabel: 'Dismiss',
          },
          {
            id: 'success',
            iconName: 'fill_check',
            title: 'Payout method saved',
            message: 'Your new payout method is ready to use for the next withdrawal.',
            primaryActionLabel: 'View details',
            secondaryActionLabel: 'Close',
          },
          {
            id: 'warning',
            iconName: 'line_attention_line',
            title: 'Session expires soon',
            message: 'Stay signed in by confirming your activity before the timer runs out.',
            primaryActionLabel: 'Stay signed in',
            secondaryActionLabel: 'Logout',
          },
        ],
      }
    },
    template: `
      <div class="space-y-4 bg-bg-deep p-6">
        <div
          v-for="item in items"
          :key="item.id"
          class="rounded-2xl border border-black/10 bg-bg-surface-alt p-4"
        >
          <UiInlineActionNotification
            :title="item.title"
            :message="item.message"
            :icon-name="item.iconName"
          >
            <template #actions>
              <UiButton type="standard" variant="primary" size="sm">
                {{ item.primaryActionLabel }}
              </UiButton>
              <UiButton type="standard" variant="ghost" size="sm">
                {{ item.secondaryActionLabel }}
              </UiButton>
            </template>
          </UiInlineActionNotification>
        </div>
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiInlineActionNotification, UiButton },
    template: `
      <div class="bg-bg-deep p-6">
        <div class="rounded-2xl border border-black/10 bg-bg-surface-alt p-4">
          <UiInlineActionNotification icon-name="fill_info">
            <div class="space-y-2">
              <div class="text-title-xs text-fg-primary">
                Maintenance window tonight
              </div>
              <div class="text-body-sm text-fg-secondary">
                Payments may be temporarily delayed between 02:00 and 02:30 UTC.
              </div>
            </div>

            <template #actions>
              <UiButton type="standard" variant="secondary" size="sm">
                Learn more
              </UiButton>
            </template>
          </UiInlineActionNotification>
        </div>
      </div>
    `,
  }),
}
