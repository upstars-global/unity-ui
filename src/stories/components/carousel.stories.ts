import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import UiCarousel from '../../components/carousel/UiCarousel.vue'
import UiCarouselNavigation from '../../components/carousel/UiCarouselNavigation.vue'

const meta = {
  title: 'Components/Carousel',
  component: UiCarousel,
  tags: ['autodocs'],
  args: {
    activeIndex: 0,
    allowChildrenMismatch: false,
    ariaLabel: 'Featured promotions',
    autoplay: 0,
    centerActiveSlide: false,
    showNavigation: true,
  },
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0, max: 4 } },
    allowChildrenMismatch: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    autoplay: { control: { type: 'number', min: 0, step: 1000 } },
    centerActiveSlide: { control: 'boolean' },
    showNavigation: { control: 'boolean' },
  },
} satisfies Meta<typeof UiCarousel>

export default meta
type Story = StoryObj<typeof meta>

const cards = [
  'Main',
  'Daily rewards',
  'Weekend tournament',
  'New games',
  'Cashback',
  'Deposit',
  'VIP club',
  'Shop',
]

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiCarousel },
    setup() {
      const primaryActiveIndex = ref(args.activeIndex)
      const primaryCenterActiveIndex = ref(args.activeIndex)
      const secondaryActiveIndex = ref(args.activeIndex)
      const secondaryCenterActiveIndex = ref(args.activeIndex)

      return { primaryActiveIndex, secondaryActiveIndex, primaryCenterActiveIndex, secondaryCenterActiveIndex, args, cards }
    },
    template: `
      <div class="bg-page-deep h-full py-16 md:py-32">
        <div class="container">
          <UiCarousel
              v-bind="args"
              v-model:active-index="primaryActiveIndex"
          >
            <article
                v-for="(card, index) in cards"
                :key="card"
                class="flex h-[196px] w-[304px] items-end rounded-16 bg-gradient-card p-16 md:w-[480px]"
            >
              <span class="text-title-sm text-page-primary">{{ index + 1 }}. {{ card }}</span>
            </article>
          </UiCarousel>
        </div>
        <div class="container-centred py-16 md:py-32">
          <UiCarousel
              v-bind="args"
              v-model:active-index="secondaryActiveIndex"
          >
            <article
                v-for="(card, index) in cards"
                :key="card"
                class="flex h-[4rem] w-[180px] items-end rounded-16 bg-gradient-card p-16 md:w-[280px]"
            >
              <span class="text-title-sm text-page-primary">{{ index + 1 }}. {{ card }}</span>
            </article>
          </UiCarousel>
        </div>

        <div class="container">
          <UiCarousel
              v-bind="args"
              center-active-slide
              v-model:active-index="primaryCenterActiveIndex"
          >
            <article
                v-for="(card, index) in cards"
                :key="card"
                class="flex h-[196px] w-[304px] items-end rounded-16 bg-gradient-card p-16 md:w-[480px]"
            >
              <span class="text-title-sm text-page-primary">{{ index + 1 }}. {{ card }}</span>
            </article>
          </UiCarousel>
        </div>
        <div class="container-centred py-16 md:py-32">
          <UiCarousel
              v-bind="args"
              center-active-slide
              v-model:active-index="secondaryCenterActiveIndex"
          >
            <article
                v-for="(card, index) in cards"
                :key="card"
                class="flex h-[4rem] w-[180px] items-end rounded-16 bg-gradient-card p-16 md:w-[280px]"
            >
              <span class="text-title-sm text-page-primary">{{ index + 1 }}. {{ card }}</span>
            </article>
          </UiCarousel>
        </div>
      </div>
    `,
  }),
}

export const CustomNavigation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiCarousel, UiCarouselNavigation },
    setup() {
      return { cards }
    },
    template: `
      <div class="bg-page-deep py-16 md:py-32">
        <UiCarousel aria-label="Games">
          <div
            v-for="card in cards"
            :key="card"
            class="flex h-80 w-80 items-center justify-center rounded-16 bg-gradient-card text-page-primary"
          >
            {{ card }}
          </div>

          <template #navigation="{ backward, forward, change }">
            <UiCarouselNavigation
              :backward="backward"
              :forward="forward"
              previous-label="Previous game"
              next-label="Next game"
              @change="change"
            />
          </template>
        </UiCarousel>
      </div>
    `,
  }),
}
