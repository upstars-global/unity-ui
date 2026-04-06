import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiTooltip from '../../components/tooltip/UiTooltip.vue'
import UiButton from '../../components/button/UiButton.vue'
import type { UiTooltipProps } from '../../components/tooltip/types'

type TooltipStoryArgs = {
  text: string
  placement: NonNullable<UiTooltipProps['placement']>
  trigger: NonNullable<UiTooltipProps['trigger']>
  disabled: boolean
  offsetValue: number
}

const PLACEMENTS: TooltipStoryArgs['placement'][] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
]

const TRIGGERS: TooltipStoryArgs['trigger'][] = ['hover', 'click', 'always']
const GRID_ITEMS = [
  { id: 'top-left', label: 'Top Left', justify: 'justify-start', align: 'items-start' },
  { id: 'top-center', label: 'Top Center', justify: 'justify-center', align: 'items-start' },
  { id: 'top-right', label: 'Top Right', justify: 'justify-end', align: 'items-start' },
  { id: 'center-left', label: 'Center Left', justify: 'justify-start', align: 'items-center' },
  { id: 'center-center', label: 'Center', justify: 'justify-center', align: 'items-center' },
  { id: 'center-right', label: 'Center Right', justify: 'justify-end', align: 'items-center' },
  { id: 'bottom-left', label: 'Bottom Left', justify: 'justify-start', align: 'items-end' },
  { id: 'bottom-center', label: 'Bottom Center', justify: 'justify-center', align: 'items-end' },
  { id: 'bottom-right', label: 'Bottom Right', justify: 'justify-end', align: 'items-end' },
] as const

const meta = {
  title: 'Components/Tooltip',
  component: UiTooltip,
  tags: ['autodocs'],
  args: {
    text: 'Tooltip content for icon trigger',
    placement: 'top',
    trigger: 'hover',
    disabled: false,
    offsetValue: 8,
  },
  argTypes: {
    text: { control: 'text' },
    placement: { control: 'inline-radio', options: PLACEMENTS },
    trigger: { control: 'inline-radio', options: TRIGGERS },
    disabled: { control: 'boolean' },
    offsetValue: { control: { type: 'number', min: 0, step: 1 } },
  },
} satisfies Meta<TooltipStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiTooltip, UiButton },
    setup() {
      return {
        args,
        gridItems: GRID_ITEMS,
      }
    },
    template: `
      <div class="min-h-56 bg-bg-deep p-6">
        <div class="grid grid-cols-3 grid-rows-3 gap-6 rounded-2xl border border-black/10 bg-bg-surface-alt p-2">
          <div
              v-for="item in gridItems"
              :key="item.id"
              class="flex rounded-xl border border-dashed border-black/10 px-4 py-2 h-40"
              :class="[item.justify, item.align]"
          >
            <UiTooltip
                :text="args.text"
                :placement="args.placement"
                :trigger="args.trigger"
                :disabled="args.disabled"
                :offset-value="args.offsetValue"
            >
              <template #activator>
                <UiButton
                    type="icon"
                    variant="secondary"
                    size="md"
                    icon-name="line_plus"
                    :aria-label="'Show tooltip for ' + item.label"
                />
              </template>
            </UiTooltip>
          </div>
        </div>
      </div>
    `,
  }),
}

export const TriggerModes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { UiTooltip, UiButton },
    setup() {
      return {
        triggers: TRIGGERS,
      }
    },
    template: `
      <div class="space-y-4 bg-bg-deep p-6">
        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="trigger in triggers"
            :key="trigger"
            class="flex min-h-36 flex-col rounded-2xl border border-black/10 bg-bg-surface-alt p-4"
          >
            <div class="mb-4 text-xs uppercase tracking-[0.1em] text-black/45">
              {{ trigger }}
            </div>

            <div class="flex flex-1 items-center justify-center">
              <UiTooltip
                :text="'Tooltip trigger: ' + trigger"
                :trigger="trigger"
                placement="top"
              >
                <template #activator>
                  <UiButton
                    type="icon"
                    variant="secondary"
                    size="md"
                    icon-name="line_plus"
                    :aria-label="'Show tooltip for ' + trigger"
                  />
                </template>
              </UiTooltip>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

