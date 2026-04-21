import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiInlineNotification from '../../components/notifications/inlineNotification/UiInlineNotification.vue'
import { BASE_NOTIFICATION_VARIANTS, type BaseNotificationVariants } from '../../components/notifications/baseNotification/types'
import type { UiInlineNotificationProps } from '../../components/notifications/inlineNotification/types'

type InlineNotificationStoryArgs = {
  variant: BaseNotificationVariants
  message: string
}

const meta = {
  title: 'Components/Inline Notification',
  component: UiInlineNotification,
  tags: ['autodocs'],
  args: {
    variant: 'neutral',
    message: 'Your changes are ready to review.',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: BASE_NOTIFICATION_VARIANTS },
    message: { control: 'text' },
  },
} satisfies Meta<InlineNotificationStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiInlineNotification },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-bg-deep p-2 flex gap-2">
        <div class="max-w-[520px] rounded-2xl py-4 px-2">
          <UiInlineNotification
            :variant="args.variant"
            icon-name="fill_info"
            :message="args.message"
          />
        </div>
        <div class="max-w-[520px] rounded-2xl p-4">
          <UiInlineNotification
              :variant="args.variant"
              :message="args.message"
          />
        </div>
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiInlineNotification },
    setup() {
      return {
        items: [
          {
            variant: 'neutral',
            iconName: 'fill_info',
            label: 'neutral',
            message: 'We saved your draft locally and it is ready for the next step.',
          },
          {
            variant: 'success',
            iconName: 'fill_check',
            label: 'success',
            message: 'Verification completed successfully and your profile is now active.',
          },
          {
            variant: 'error',
            iconName: 'fill_close',
            label: 'error',
            message: 'We could not submit the form. Please check the required fields and try again.',
          },
        ] satisfies Array<{
          variant: BaseNotificationVariants
          iconName: UiInlineNotificationProps['iconName']
          label: string
          message: string
        }>,
      }
    },
    template: `
      <div class="bg-bg-deep flex gap-2 p-2">
        <div class="p-2 flex flex-col gap-2">
          <section
              v-for="item in items"
              :key="item.variant"
              class="p-2 flex flex-col gap-2"
          >
            <div class="mb-3 text-xs uppercase tracking-[0.1em] text-fg-secondary">
              {{ item.label }}
            </div>

            <UiInlineNotification
                :variant="item.variant"
                :icon-name="item.iconName"
                :message="item.message"
            />
          </section>
          
        </div>
        <div class="p-2 flex flex-col gap-2">
          <section
              v-for="item in items"
              :key="item.variant"
              class="p-2 flex flex-col gap-2"
          >
            <div class="mb-3 text-xs uppercase tracking-[0.1em] text-fg-secondary">
              {{ item.label }}
            </div>

            <UiInlineNotification
                :variant="item.variant"
                :message="item.message"
            />
          </section>
          
        </div>
      </div>
    `,
  }),
}
