import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiButton from '../../components/button/UiButton.vue'
import UiToast from '../../components/notifications/toast/UiToast.vue'
import toast from '../../plugins/toast'
import { type BaseNotificationVariants } from '../../components/notifications/baseNotification/types'
import type { UiToastItem } from '../../components/notifications/toast/types'

type ToastStoryArgs = {
  variant: BaseNotificationVariants
  icon?: UiToastItem['icon']
  title: string
  text: string
  time?: number
}

const meta = {
  title: 'Components/Toast',
  component: UiToast,
  tags: ['autodocs'],
  args: {
    icon: 'fill_check_input',
    title: 'Operation completed',
    text: 'Toast is emitted through the Storybook EventBus mock.',
    time: 0,
  },
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    text: { control: 'text' },
    time: { control: 'number' },
  },
} satisfies Meta<ToastStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiButton, UiToast },
    setup() {
      function showToast(variant: BaseNotificationVariants, showMessage: boolean = true) {
        toast.show({
          variant: variant,
          icon: args.icon || undefined,
          title: args.title,
          text: showMessage ? args.text : '',
          time: args.time,
        })
      }

      return { showToast }
    },
    template: `
      <div class="min-h-screen bg-page-deep p-6">
        <p class="text-subtitle text-page-secondary mb-2">Without Message</p>
        <div class="mb-6 flex gap-16">
          <UiButton
            @click="showToast('neutral')"
          >
            Show toast neutral
          </UiButton>
          <UiButton
              @click="showToast('success')"
          >
            Show toast success
          </UiButton>
          <UiButton
              @click="showToast('error')"
          >
            Show toast error
          </UiButton>
        </div>

        <p class="text-subtitle text-page-secondary mb-2">Without Message</p>
        <div class="mb-6 flex gap-16">
          <UiButton
              @click="showToast('neutral', false)"
          >
            Show toast neutral
          </UiButton>
          <UiButton
              @click="showToast('success', false)"
          >
            Show toast success
          </UiButton>
          <UiButton
              @click="showToast('error', false)"
          >
            Show toast error
          </UiButton>
        </div>

        <UiToast />
      </div>
    `,
  }),
}
