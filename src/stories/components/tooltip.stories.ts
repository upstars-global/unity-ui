import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiTooltip from '../../components/tooltip/UiTooltip.vue'
import UiButton from '../../components/button/UiButton.vue'
import UiCard from '../../components/card/UiCard.vue'
import type { UiTooltipProps } from '../../components/tooltip/types'
import type { UiThemeIconName } from '../../themes/registry'

type TooltipStoryArgs = {
  text: string
  placement: NonNullable<UiTooltipProps['placement']>
  trigger: NonNullable<UiTooltipProps['trigger']>
  disabled: boolean
  offsetValue: number
  iconName: UiThemeIconName
}

const TRIGGERS: TooltipStoryArgs['trigger'][] = ['hover', 'click']
const ICON_OPTIONS: TooltipStoryArgs['iconName'][] = [
  'line_plus',
  'line_close',
  'line_check',
  'line_dropdown_down',
  'line_arrow_next',
  'fill_info',
]
const GRID_ITEMS = [
  { id: 'bottom-left', label: 'Top Left', justify: 'justify-start', align: 'items-start' },
  { id: 'bottom-center', label: 'Top Center', justify: 'justify-center', align: 'items-start' },
  { id: 'bottom-right', label: 'Top Right', justify: 'justify-end', align: 'items-start' },
  { id: 'top-left', label: 'Bottom Left', justify: 'justify-start', align: 'items-end' },
  { id: 'top-center', label: 'Bottom Center', justify: 'justify-center', align: 'items-end' },
  { id: 'top-right', label: 'Bottom Right', justify: 'justify-end', align: 'items-end' },
] as const

const meta = {
  title: 'Components/Tooltip',
  component: UiTooltip,
  tags: ['autodocs'],
  args: {
    text: 'Tooltip content for icon trigger',
    trigger: 'hover',
    disabled: false,
    offsetValue: 8,
    iconName: 'line_plus',
  },
  argTypes: {
    text: { control: 'text' },
    trigger: { control: 'inline-radio', options: TRIGGERS },
    disabled: { control: 'boolean' },
    offsetValue: { control: { type: 'number', min: 0, step: 1 } },
    iconName: { control: 'select', options: ICON_OPTIONS },
  },
} satisfies Meta<TooltipStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiTooltip, UiButton, UiCard },
    setup() {
      return {
        args,
        gridItems: GRID_ITEMS,
      }
    },
    template: `
      <div class="min-h-56 bg-bg-deep p-6">
        <div class="grid grid-cols-1 gap-6 rounded-2xl md:grid-cols-3" :key="args.trigger">
          <UiCard
              v-for="item in gridItems"
              :key="item.id"
              variant="outlined"
              :class="[item.justify, item.align]"
              class="p-16 !flex-row h-[10rem]"
          >
              <UiTooltip
                  :text="args.text"
                  :icon-name="args.iconName"
                  :placement="item.id"
                  :trigger="args.trigger"
                  :disabled="args.disabled"
                  :offset-value="args.offsetValue"
              >
                <template #activator>
                  <UiButton
                      layout="icon"
                      variant="secondary"
                      size="md"
                      icon-name="line_plus"
                      :aria-label="'Show tooltip for ' + item.label"
                  />
                </template>
              </UiTooltip>
          </UiCard>
        </div>
      </div>
    `,
  }),
}

export const TriggerModes: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiTooltip, UiButton, UiCard },
    setup() {
      return {
        triggers: TRIGGERS,
      }
    },
    template: `
      <div class="space-y-4 bg-bg-deep p-6">
        <div class="grid gap-4 md:grid-cols-3">
          <UiCard
            v-for="trigger in triggers"
            :key="trigger"
            class="min-h-[10rem] p-16 gap-16"
          >
            <div class="text-body text-fg-primary capitalize">
              {{ trigger }}
            </div>

            <UiTooltip
                :text="'Tooltip trigger: ' + trigger"
                :trigger="trigger"
                placement="bottom-left"
            >
              <template #activator>
                <UiButton
                    layout="icon"
                    variant="secondary"
                    size="md"
                    icon-name="line_plus"
                    :aria-label="'Show tooltip for ' + trigger"
                />
              </template>
            </UiTooltip>
          </UiCard>
        </div>
      </div>
    `,
  }),
}
