import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { markRaw, ref } from 'vue'
import UiButton from '../../components/button/UiButton.vue'
import ModalController from '../../components/modal/ModalController.vue'
import ModalStoryContent from './ModalStoryContent.vue'
import modalApi from '../../plugins/modal'
import type { IModalOptions, ModalSize } from '../../components/modal/types'

type ModalStoryArgs = {
  title: string
  size: ModalSize
  showFooter: boolean
  hideHeaderToolbar: boolean
  hideCloseButton: boolean
  blockCloseOverlay: boolean
  fullScreen: boolean
}

const meta = {
  title: 'Components/Modal',
  component: ModalController,
  tags: ['autodocs'],
  args: {
    title: 'Important update',
    size: 'm',
    showFooter: true,
    hideHeaderToolbar: false,
    hideCloseButton: false,
    blockCloseOverlay: false,
    fullScreen: false,
  },
  argTypes: {
    title: { control: 'text' },
    size: { control: 'inline-radio', options: ['s', 'm', 'l', 'xl'] },
    showFooter: { control: 'boolean' },
    hideHeaderToolbar: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
    blockCloseOverlay: { control: 'boolean' },
    fullScreen: { control: 'boolean' },
  },
} satisfies Meta<ModalStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { ModalController, UiButton },
    setup() {
      const counter = ref(0)

      function createModal(overrides: Partial<IModalOptions> = {}): IModalOptions {
        counter.value += 1

        return {
          name: overrides.name ?? `storybook-modal-${counter.value}`,
          title: overrides.title ?? args.title,
          size: overrides.size ?? args.size,
          showFooter: overrides.showFooter ?? args.showFooter,
          hideHeaderToolbar: overrides.hideHeaderToolbar ?? args.hideHeaderToolbar,
          hideCloseButton: overrides.hideCloseButton ?? args.hideCloseButton,
          blockCloseOverlay: overrides.blockCloseOverlay ?? args.blockCloseOverlay,
          fullScreen: overrides.fullScreen ?? args.fullScreen,
          component: markRaw(ModalStoryContent),
          callback: overrides.callback,
        }
      }

      function openModal() {
        modalApi.show(createModal())
      }

      function openBlockingModal() {
        modalApi.show(createModal({
          name: 'blocking-modal',
          title: 'Overlay is blocked',
          blockCloseOverlay: true,
          showFooter: false
        }))
      }
      function openFullScreenModal() {
        modalApi.show(createModal({
          name: 'blocking-modal',
          title: 'Full Screen',
          fullScreen: true,
          showFooter: false
        }))
      }

      return {
        openModal,
        openBlockingModal,
        openFullScreenModal
      }
    },
    template: `
      <div class="min-h-screen bg-bg-deep p-6 h-[120dvh]">
        <div class="mx-auto flex max-w-3xl flex-col gap-4">
          <div class="rounded-24 bg-bg-base p-6 shadow-sm">
            <h3 class="mb-2 text-title-4 text-fg-primary">Modal controller playground</h3>
            <p class="mb-6 text-body text-fg-secondary">
              Story uses the same \`useModalController()\` composable for open and close actions.
            </p>

            <div class="flex flex-wrap gap-3">
              <UiButton variant="primary" @click="openModal">
                Open modal
              </UiButton>
              <UiButton variant="secondary" @click="openBlockingModal">
                Open blocking modal
              </UiButton>
              <UiButton variant="secondary" @click="openFullScreenModal">
                Open full screen
              </UiButton>
            </div>
          </div>
        </div>

        <ModalController />
      </div>
    `,
  }),
}
