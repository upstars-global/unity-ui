import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { markRaw, ref } from 'vue'
import UiBadge from '../../components/badge/UiBadge.vue'
import UiButton from '../../components/button/UiButton.vue'
import UiCard from '../../components/card/UiCard.vue'
import UiProgressBar from '../../components/progress/linear/UiProgressBar.vue'
import ModalController from '../../components/modal/ModalController.vue'
import modalApi from '../../plugins/modal'
import type { ModalFooterDefaultType } from '../../components/modal/footers/default/types'
import ModalStoryContent, {
  type ModalStoryContentVariant,
  type ModalStoryFooter,
  type ModalStoryHeader,
  type ModalStoryOptions,
} from './ModalStoryContent.vue'

type ModalStoryArgs = {
  title: string
  hug: boolean
  header: ModalStoryHeader
  content: ModalStoryContentVariant
  footerType: ModalStoryFooter
  showFooter: boolean
  hideHeaderToolbar: boolean
  hideScrollFade: boolean
  hideCloseButton: boolean
  blockCloseOverlay: boolean
  fullScreen: boolean
}

const FOOTER_TYPES: ModalStoryFooter[] = ['slot', 'single', 'horizontal', 'vertical']
const HEADER_VARIANTS: ModalStoryHeader[] = ['title', 'back', 'logo', 'custom']
const CONTENT_VARIANTS: ModalStoryContentVariant[] = ['compact', 'short', 'long', 'list', 'dynamic']

const meta = {
  title: 'Components/Modal',
  component: ModalController,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Important update',
    hug: false,
    header: 'title',
    content: 'short',
    footerType: 'vertical',
    showFooter: true,
    hideHeaderToolbar: false,
    hideScrollFade: false,
    hideCloseButton: false,
    blockCloseOverlay: false,
    fullScreen: false,
  },
  argTypes: {
    title: { control: 'text' },
    hug: { control: 'boolean' },
    header: { control: 'inline-radio', options: HEADER_VARIANTS },
    content: { control: 'inline-radio', options: CONTENT_VARIANTS },
    footerType: { control: 'inline-radio', options: FOOTER_TYPES },
    showFooter: { control: 'boolean' },
    hideHeaderToolbar: { control: 'boolean' },
    hideScrollFade: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
    blockCloseOverlay: { control: 'boolean' },
    fullScreen: { control: 'boolean' },
  },
} satisfies Meta<ModalStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

const CARD_ROWS = [
  {
    title: 'Active promotions',
    cards: [
      { name: 'Welcome bonus', badge: 'status-success', label: 'ACTIVE', progress: 72, note: '72% wagered' },
      { name: 'Weekly cashback', badge: 'navigation-new', label: 'NEW', progress: 30, note: '30% completed' },
      { name: 'Free spins', badge: 'status-warning', label: 'ENDING', progress: 91, note: 'Ends in 2 days' },
    ],
  },
  {
    title: 'Tournaments',
    cards: [
      { name: 'Slots race', badge: 'navigation-default', label: 'LIVE', progress: 45, note: 'Rank #128' },
      { name: 'Live casino cup', badge: 'neutral', label: 'SOON', progress: 0, note: 'Starts tomorrow' },
      { name: 'Jackpot drop', badge: 'status-error', label: 'CLOSED', progress: 100, note: 'Finished' },
    ],
  },
  {
    title: 'Missions',
    cards: [
      { name: 'Daily login', badge: 'status-success', label: 'DONE', progress: 100, note: '7 / 7 days' },
      { name: 'Make a deposit', badge: 'personal', label: 'FOR YOU', progress: 10, note: '1 / 10 steps' },
      { name: 'Verify profile', badge: 'status-warning', label: 'PENDING', progress: 50, note: 'Step 2 of 4' },
    ],
  },
]

export const Playground: Story = {
  render: (args) => ({
    components: { ModalController, UiBadge, UiButton, UiCard, UiProgressBar },
    setup() {
      const counter = ref(0)

      function createModal(overrides: Partial<ModalStoryOptions> = {}): ModalStoryOptions {
        counter.value += 1

        return {
          name: overrides.name ?? `storybook-modal-${counter.value}`,
          title: overrides.title ?? args.title,
          hug: overrides.hug ?? args.hug,
          footerType: overrides.footerType ?? args.footerType,
          footer: {
            type: (overrides.footerType ?? args.footerType) === 'slot' ? undefined : (overrides.footerType ?? args.footerType) as ModalFooterDefaultType,
            primaryLabel: 'Confirm',
            secondaryLabel: 'Cancel',
          },
          headerVariant: overrides.headerVariant ?? args.header,
          contentVariant: overrides.contentVariant ?? args.content,
          showFooter: overrides.showFooter ?? args.showFooter,
          hideHeaderToolbar: overrides.hideHeaderToolbar ?? args.hideHeaderToolbar,
          hideScrollFade: overrides.hideScrollFade ?? args.hideScrollFade,
          hideCloseButton: overrides.hideCloseButton ?? args.hideCloseButton,
          blockCloseOverlay: overrides.blockCloseOverlay ?? args.blockCloseOverlay,
          fullScreen: overrides.fullScreen ?? args.fullScreen,
          component: markRaw(ModalStoryContent),
        }
      }

      type Launcher = { label: string; open: () => void }
      const show = (options: Partial<ModalStoryOptions>) => () => modalApi.show(createModal(options))

      const groups: { title: string; launchers: Launcher[] }[] = [
        {
          title: 'Layout',
          launchers: [
            { label: 'Playground (controls)', open: show({}) },
            { label: 'Hug', open: show({ name: 'modal-hug', title: 'Hug', hug: true, contentVariant: 'compact' }) },
            { label: 'Full screen', open: show({ name: 'modal-fullscreen', title: 'Full screen', fullScreen: true, showFooter: false, contentVariant: 'long' }) },
            { label: 'Blocked overlay', open: show({ name: 'modal-blocked', title: 'Overlay is blocked', blockCloseOverlay: true }) },
          ],
        },
        {
          title: 'Header',
          launchers: [
            { label: 'Title', open: show({ name: 'header-title', title: 'Title', headerVariant: 'title' }) },
            { label: 'Long title', open: show({ name: 'header-long', title: 'A very long modal title that does not fit and gets an ellipsis', headerVariant: 'title' }) },
            { label: 'Arrow back', open: show({ name: 'header-back', title: 'Arrow back', headerVariant: 'back' }) },
            { label: 'Logo', open: show({ name: 'header-logo', title: 'Logo', headerVariant: 'logo' }) },
            { label: 'Custom title slot', open: show({ name: 'header-custom', title: 'Custom title', headerVariant: 'custom' }) },
            { label: 'Without close', open: show({ name: 'header-no-close', title: 'Without close button', hideCloseButton: true }) },
            { label: 'No header', open: show({ name: 'header-none', hideHeaderToolbar: true }) },
          ],
        },
        {
          title: 'Content & scroll fade',
          launchers: [
            { label: 'Fits (no fade)', open: show({ name: 'content-short', title: 'Content fits', contentVariant: 'short' }) },
            { label: 'Long text', open: show({ name: 'content-long', title: 'Long text', contentVariant: 'long' }) },
            { label: 'Long list', open: show({ name: 'content-list', title: 'Transactions', contentVariant: 'list', footerType: 'single' }) },
            { label: 'Dynamic content', open: show({ name: 'content-dynamic', title: 'Add / remove content', contentVariant: 'dynamic', footerType: 'single' }) },
            { label: 'Long, fade off', open: show({ name: 'content-no-fade', title: 'Scroll fade hidden', contentVariant: 'long', hideScrollFade: true }) },
            { label: 'Long, no header & footer', open: show({ name: 'content-bare', contentVariant: 'long', hideHeaderToolbar: true, showFooter: false }) },
          ],
        },
        {
          title: 'Footer',
          launchers: [
            { label: 'Single', open: show({ name: 'footer-single', title: 'Single button', footerType: 'single' }) },
            { label: 'Horizontal', open: show({ name: 'footer-horizontal', title: 'Two buttons', footerType: 'horizontal' }) },
            { label: 'Vertical', open: show({ name: 'footer-vertical', title: 'Two buttons, column', footerType: 'vertical' }) },
            { label: 'Slot', open: show({ name: 'footer-slot', title: 'Custom footer', footerType: 'slot' }) },
            { label: 'No footer', open: show({ name: 'footer-none', title: 'No footer', showFooter: false }) },
          ],
        },
      ]

      return { groups, rows: CARD_ROWS, openModal: () => modalApi.show(createModal()) }
    },
    template: `
      <div class="min-h-screen bg-page-deep text-page-primary">
        <div class="container flex flex-col gap-24 py-24 container-safezone-x container-safezone-bottom">
          <header class="flex flex-wrap items-center justify-between gap-16">
            <div class="flex flex-col gap-4">
              <h1 class="text-title-md">Mock page</h1>
              <p class="text-body text-page-secondary">
                Page content to check overlay, blur and layout behind the modal.
              </p>
            </div>
            <div class="flex items-center gap-8">
              <UiBadge variant="status-success" label="ONLINE" />
              <UiBadge variant="personal" label="VIP" />
            </div>
          </header>

          <UiCard variant="gradient">
            <div class="flex flex-col gap-16 py-16 md:py-24">
              <div class="flex flex-wrap items-center gap-8">
                <UiBadge variant="navigation-new" label="NEW" />
                <span class="text-caption text-page-secondary">Modal launcher</span>
              </div>
              <h2 class="text-title-md">Open a modal</h2>
              <div
                v-for="(group, index) in groups"
                :key="group.title"
                class="flex flex-col gap-8"
              >
                <span class="text-caption text-page-secondary">{{ group.title }}</span>
                <div class="flex flex-wrap gap-8">
                  <UiButton
                    v-for="item in group.launchers"
                    :key="item.label"
                    :variant="index === 0 && item === group.launchers[0] ? 'primary' : 'secondary'"
                    size="sm"
                    @click="item.open"
                  >
                    {{ item.label }}
                  </UiButton>
                </div>
              </div>
            </div>
          </UiCard>

          <section v-for="row in rows" :key="row.title" class="flex flex-col gap-12">
            <h2 class="text-subtitle">{{ row.title }}</h2>
            <div class="grid grid-cols-1 gap-16 md:grid-cols-3">
              <UiCard v-for="card in row.cards" :key="card.name" variant="default">
                <div class="flex flex-col gap-12 p-16">
                  <div class="flex items-center justify-between gap-8">
                    <span class="text-subtitle">{{ card.name }}</span>
                    <UiBadge :variant="card.badge" :label="card.label" />
                  </div>
                  <UiProgressBar :progress="card.progress" />
                  <span class="text-caption text-page-secondary">{{ card.note }}</span>
                </div>
              </UiCard>
            </div>
          </section>
        </div>

        <ModalController />
      </div>
    `,
  }),
}
