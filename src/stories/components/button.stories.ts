import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiButton from '../../components/button/UiButton.vue'
import { BUTTON_HTML_TYPES, BUTTON_LAYOUTS, BUTTON_SIZES, BUTTON_VARIANTS, type ButtonHtmlType, type ButtonLayout, type ButtonSize, type ButtonVariant } from '../../components/button/types'

type ButtonStoryArgs = {
  label: string
  caption: string
  layout: ButtonLayout
  type: ButtonHtmlType
  variant: ButtonVariant
  size: ButtonSize
  disabled: boolean
  fullWidth: boolean
  fullWidthMobile: boolean
  loading: boolean
  iconName: 'line_plus'
  leadingIconName?: 'line_plus'
  trailingIconName?: 'line_arrow_next'
}

const GRID_LAYOUTS: ButtonLayout[] = ['standard', 'icon', 'caption', 'slab', 'action']
const GRID_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive']
const GRID_SIZES: ButtonSize[] = ['sm', 'md', 'lg']

const LAYOUT_SUPPORTED_SIZES: Record<ButtonLayout, ButtonSize[]> = {
  standard: ['sm', 'md', 'lg'],
  icon: ['sm', 'md', 'lg'],
  caption: ['sm', 'md', 'lg'],
  slab: ['sm'],
  action: ['sm'],
}

function getLabel(layout: ButtonLayout, label = 'Button') {
  if (layout === 'caption') return label
  return label
}

function getCaption(layout: ButtonLayout, caption = 'Caption text') {
  return layout === 'caption' ? caption : ''
}

function getVariantNote(variant: ButtonVariant) {
  if (variant === 'primary') return 'Filled'
  if (variant === 'secondary') return 'Outline'
  if (variant === 'tertiary') return 'Tertiary'
  if (variant === 'ghost') return 'Ghost'
  return 'Destructive'
}

const meta = {
  title: 'Components/Button',
  component: UiButton,
  tags: ['autodocs'],
  args: {
    label: 'Button',
    caption: 'Caption text',
    layout: 'standard',
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
    fullWidthMobile: false,
    loading: false,
    iconName: 'line_plus',
    leadingIconName: 'line_plus',
    trailingIconName: 'line_arrow_next',
  },
  argTypes: {
    label: { control: 'text' },
    caption: { control: 'text' },
    layout: { control: 'inline-radio', options: BUTTON_LAYOUTS },
    type: { control: 'inline-radio', options: BUTTON_HTML_TYPES },
    variant: {
      control: {
        type: 'inline-radio',
        labels: {
          primary: 'primary',
          secondary: 'secondary',
          tertiary: 'tertiary',
          ghost: 'ghost',
          destructive: 'destructive',
        },
      },
      options: BUTTON_VARIANTS,
    },
    size: { control: 'inline-radio', options: BUTTON_SIZES },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    fullWidthMobile: { control: 'boolean' },
    loading: { control: 'boolean' },
    iconName: { control: 'text' },
    leadingIconName: { control: 'text' },
    trailingIconName: { control: 'text' },
  },
} satisfies Meta<ButtonStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { UiButton },
    setup() {
      return {
        args,
        layoutSupportedSizes: LAYOUT_SUPPORTED_SIZES,
        getLabel,
        getCaption,
      }
    },
    template: `
      <div class="p-6 bg-bg-deep">
        <div class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div class="mb-4 text-xs uppercase tracking-[0.1em] text-black/45">
            layout: {{ args.layout }}, type: {{ args.type }}
          </div>

          <div class="flex min-h-32 items-center">
            <UiButton
              v-bind="args"
              :size="layoutSupportedSizes[args.layout].includes(args.size) ? args.size : layoutSupportedSizes[args.layout][0]"
              :caption="getCaption(args.layout, args.caption)"
            >
              <template v-if="args.layout !== 'icon'">{{ getLabel(args.layout, args.label) }}</template>
            </UiButton>
          </div>
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
    components: { UiButton },
    setup() {
      return {
        gridLayouts: GRID_LAYOUTS,
        gridVariants: GRID_VARIANTS,
        gridSizes: GRID_SIZES,
        layoutSupportedSizes: LAYOUT_SUPPORTED_SIZES,
        getLabel,
        getCaption,
        getVariantNote,
      }
    },
    template: `
      <div class="space-y-8 p-6">
        <section
          v-for="layout in gridLayouts"
          :key="layout"
          class="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
        >
          <div class="mb-4">
            <div class="text-sm font-semibold uppercase tracking-[0.12em] text-black/45">{{ layout }}</div>
            <div class="text-xs text-black/55">
              Supported sizes: {{ layoutSupportedSizes[layout].join(', ') }}
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="variant in gridVariants"
              :key="variant"
              class="grid gap-3 rounded-xl border border-black/5 bg-black/[0.02] p-4 md:grid-cols-[140px_repeat(3,minmax(0,1fr))]"
            >
              <div class="flex items-center text-sm font-medium text-black/70">
                <div>
                  <div class="capitalize">{{ variant }}</div>
                  <div class="text-xs font-normal text-black/45">{{ getVariantNote(variant) }}</div>
                </div>
              </div>

              <div
                v-for="size in gridSizes"
                :key="size"
                class="flex min-h-24 flex-col items-start justify-center gap-2 rounded-lg bg-white px-3 py-3"
              >
                <div class="text-[11px] uppercase tracking-[0.1em] text-black/40">{{ size }}</div>

                <UiButton
                  v-if="layoutSupportedSizes[layout].includes(size)"
                  :layout="layout"
                  :variant="variant"
                  :size="size"
                  :caption="getCaption(layout)"
                  icon-name="line_plus"
                  leading-icon-name="line_plus"
                  trailing-icon-name="line_arrow_next"
                >
                  <template v-if="layout !== 'icon'">{{ getLabel(layout) }}</template>
                </UiButton>

                <div v-else class="text-xs text-black/35">Not supported</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiButton },
    setup() {
      return {
        variants: GRID_VARIANTS,
      }
    },
    template: `
      <div class="space-y-4 p-6">
        <div
          v-for="variant in variants"
          :key="variant"
          class="grid gap-3 rounded-2xl border border-black/10 bg-white p-4 md:grid-cols-5"
        >
          <div class="flex items-center text-sm font-medium capitalize text-black/70">{{ variant }}</div>
          <UiButton :variant="variant" layout="standard" size="md" icon-name="line_plus" leading-icon-name="line_plus">
            Default
          </UiButton>
          <UiButton :variant="variant" layout="standard" size="md" icon-name="line_plus" loading>
            Loading
          </UiButton>
          <UiButton :variant="variant" layout="standard" size="md" icon-name="line_plus" disabled>
            Disabled
          </UiButton>
          <UiButton :variant="variant" layout="standard" size="md" icon-name="line_plus" full-width>
            Full width
          </UiButton>
        </div>
      </div>
    `,
  }),
}

export const NativeTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiButton },
    setup() {
      return {
        types: BUTTON_HTML_TYPES,
      }
    },
    template: `
      <div class="space-y-4 p-6">
        <div class="rounded-2xl border border-black/10 bg-white p-4">
          <div class="mb-4 text-sm font-medium text-black/70">
            Native button types
          </div>

          <div class="flex flex-wrap gap-3">
            <UiButton
              v-for="buttonType in types"
              :key="buttonType"
              layout="standard"
              variant="secondary"
              size="md"
              :type="buttonType"
            >
              {{ buttonType }}
            </UiButton>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ResponsiveWidth: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiButton },
    template: `
      <div class="space-y-4 p-6">
        <div class="grid gap-4 rounded-2xl border border-black/10 bg-white p-4 md:grid-cols-2">
          <div class="space-y-3">
            <div class="text-sm font-medium text-black/70">fullWidth</div>
            <UiButton
              layout="standard"
              variant="primary"
              size="md"
              full-width
            >
              Always full width
            </UiButton>
          </div>

          <div class="space-y-3">
            <div class="text-sm font-medium text-black/70">fullWidthMobile</div>
            <UiButton
              layout="standard"
              variant="primary"
              size="md"
              full-width-mobile
            >
              Full width below md
            </UiButton>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Composition: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiButton },
    template: `
      <div class="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
          <div class="text-xs uppercase tracking-[0.1em] text-black/45">Primary / Filled</div>
          <UiButton
            layout="standard"
            variant="primary"
            size="md"
            icon-name="line_plus"
            leading-icon-name="line_plus"
            trailing-icon-name="line_arrow_next"
          >
            Continue
          </UiButton>
        </div>

        <div class="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
          <div class="text-xs uppercase tracking-[0.1em] text-black/45">Secondary / Outline</div>
          <UiButton
            layout="standard"
            variant="secondary"
            size="md"
            icon-name="line_plus"
            leading-icon-name="line_plus"
            trailing-icon-name="line_arrow_next"
          >
            Cashier
          </UiButton>
        </div>

        <div class="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
          <div class="text-xs uppercase tracking-[0.1em] text-black/45">Tertiary</div>
          <UiButton
            layout="standard"
            variant="tertiary"
            size="md"
            icon-name="line_plus"
            leading-icon-name="line_plus"
          >
            Promo
          </UiButton>
        </div>

        <div class="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
          <div class="text-xs uppercase tracking-[0.1em] text-black/45">Ghost / Caption</div>
          <UiButton
            layout="caption"
            variant="ghost"
            size="md"
            caption="Available balance"
            icon-name="line_plus"
          >
            1 250 UAH
          </UiButton>
        </div>

        <div class="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
          <div class="text-xs uppercase tracking-[0.1em] text-black/45">Ghost / Slab</div>
          <UiButton
            layout="slab"
            variant="ghost"
            size="sm"
            icon-name="line_plus"
          >
            Deposit
          </UiButton>
        </div>

        <div class="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
          <div class="text-xs uppercase tracking-[0.1em] text-black/45">Destructive / Action</div>
          <UiButton
            layout="action"
            variant="destructive"
            size="sm"
            icon-name="line_plus"
          >
            Delete
          </UiButton>
        </div>
      </div>
    `,
  }),
}
