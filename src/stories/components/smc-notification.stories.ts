import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import UiButton from '../../components/button/UiButton.vue'
import SMCNotification from '../../components/notifications/smcNotification/SMCNotification.vue'
import alpaGift from '../../themes/alpa/icons/flat/gift.svg?url'
import kingGift from '../../themes/king/icons/flat/gift.svg?url'

const meta = {
  title: 'Components/SMC Notification',
  component: SMCNotification,
  tags: ['autodocs'],
  args: {
    titleHtml: 'Enter example of title',
    messageHtml: 'Here is example of main message of the text used in notification',
    imageUrl: '',
    dismissLabel: 'Skip for now',
    duration: 7,
  },
  argTypes: {
    titleHtml: { control: 'text' },
    messageHtml: { control: 'text' },
    imageUrl: { control: 'text' },
    dismissLabel: { control: 'text' },
    duration: { control: 'number' },
  },
} satisfies Meta<typeof SMCNotification>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args, context) => ({
    components: { SMCNotification, UiButton },
    setup() {
      const visible = ref(true)
      return { args, visible, defaultImageUrl: context.globals.productTheme === 'king' ? kingGift : alpaGift }
    },
    template: `
      <div class="min-h-screen bg-page-deep md:p-16">
        <SMCNotification v-if="visible" v-bind="args" :image-url="args.imageUrl || defaultImageUrl" @dismiss="visible = false">
          <template #actions>
            <UiButton layout="standard" variant="primary" size="md">Deposit</UiButton>
            <UiButton layout="standard" variant="secondary" size="md">Secondary</UiButton>
          </template>
        </SMCNotification>
        <UiButton v-if="!visible" class="m-16" layout="standard" variant="primary" size="md" @click="visible = true">Show notification</UiButton>
      </div>
    `,
  }),
}

const variants = [
  {
    name: 'Two actions · plain text',
    titleHtml: 'Your reward is ready',
    messageHtml: 'Open the offer to see your bonus details.',
    actionCount: 2,
  },
  {
    name: 'One action · plain text',
    titleHtml: 'Your reward is ready',
    messageHtml: 'Open the offer to see your bonus details.',
    actionCount: 1,
  },
  {
    name: 'No actions · plain text',
    titleHtml: 'Your reward is ready',
    messageHtml: 'Open the offer to see your bonus details.',
    actionCount: 0,
  },
  {
    name: 'No title',
    titleHtml: '',
    messageHtml: 'Open the offer to see your bonus details.',
    actionCount: 0,
  },
  {
    name: 'HTML title and message',
    titleHtml: 'Your <strong>reward</strong> is ready',
    messageHtml: 'Open the <a href="#">offer</a> to see your <b>bonus details</b>.',
    actionCount: 2,
  },
]

const renderVariants: Story['render'] = (args, context) => ({
  components: { SMCNotification, UiButton },
  setup() {
    return {
      args,
      variants,
      defaultImageUrl: context.globals.productTheme === 'king' ? kingGift : alpaGift,
    }
  },
  template: `
    <div class="flex min-h-screen flex-wrap items-start gap-24 bg-page-deep md:p-16">
      <div v-for="variant in variants" :key="variant.name" class="w-full md:w-auto">
        <div class="mb-8 px-16 text-body-sm text-page-primary md:px-0">{{ variant.name }}</div>
        <SMCNotification
          :title-html="variant.titleHtml"
          :message-html="variant.messageHtml"
          :image-url="args.imageUrl || defaultImageUrl"
          :dismiss-label="args.dismissLabel"
          :duration="60"
        >
          <template v-if="variant.actionCount" #actions>
            <UiButton layout="standard" variant="primary" size="md">Deposit</UiButton>
            <UiButton v-if="variant.actionCount === 2" layout="standard" variant="secondary" size="md">Secondary</UiButton>
          </template>
        </SMCNotification>
      </div>
    </div>
  `,
})

export const MobileVariants: Story = {
  name: 'Mobile · all variants',
  globals: { viewport: { value: 'xs', isRotated: false } },
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: renderVariants,
}

export const DesktopVariants: Story = {
  name: 'Desktop · all variants',
  globals: { viewport: { value: 'lg', isRotated: false } },
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: renderVariants,
}
