import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import UiSelect from '../../components/form/basicControls/select/UiSelect.vue'
import UiCard from '../../components/card/UiCard.vue'
import type { UiSelectOption } from '../../components/form/basicControls/select/types'
import type { UiThemeIconName } from '../../themes/registry'
import { icons as alpaIcons } from '../../themes/alpa/icons/config'
import { icons as kingIcons } from '../../themes/king/icons/config'

type SelectStoryArgs = {
  modelValue: string | number | boolean | null
  name: string
  label: string
  placeholder: string
  infoMessage: string
  disabled: boolean
  invalid: boolean
  errorMessages: string
  size: 'sm' | 'default'
  leadingIconName?: UiThemeIconName
  trailingIconName?: UiThemeIconName
  optionTrailingIconName?: UiThemeIconName
}

const ICON_NAME_OPTIONS = Array.from(new Set([
  ...Object.keys(alpaIcons),
  ...Object.keys(kingIcons),
])).sort() as UiThemeIconName[]

const ICON_SELECT_OPTIONS = ['none', ...ICON_NAME_OPTIONS] as const
const ICON_SELECT_MAPPING: Record<string, UiThemeIconName | undefined> = {
  none: undefined,
  ...Object.fromEntries(ICON_NAME_OPTIONS.map((iconName) => [iconName, iconName])),
}

const OPTIONS: UiSelectOption[] = [
  {
    label: 'Identity document',
    value: 'identity',
    leadingIconName: 'fill_lock',
  },
  {
    label: 'Driver license',
    value: 'license',
    leadingIconName: 'fill_key',
  },
  {
    label: 'Bank statement',
    value: 'statement',
    leadingIconName: 'fill_wallet',
  },
  {
    label: 'Proof of address',
    value: 'address',
    leadingIconName: 'fill_address',
  },
]

const meta = {
  title: 'Components/Form/Select',
  component: UiSelect,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    name: 'documents',
    label: 'Label',
    placeholder: 'Placeholder',
    infoMessage: '',
    disabled: false,
    invalid: false,
    errorMessages: '',
    size: 'default',
    leadingIconName: undefined,
    trailingIconName: 'line_dropdown_down',
    optionTrailingIconName: 'line_arrow_top_left',
  },
  argTypes: {
    modelValue: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    infoMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    errorMessages: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'default'] },
    leadingIconName: { control: 'select', options: ICON_SELECT_OPTIONS, mapping: ICON_SELECT_MAPPING },
    trailingIconName: { control: 'select', options: ICON_SELECT_OPTIONS, mapping: ICON_SELECT_MAPPING },
    optionTrailingIconName: { control: 'select', options: ICON_SELECT_OPTIONS, mapping: ICON_SELECT_MAPPING },
  },
} satisfies Meta<SelectStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

const renderSelectStory = (args: SelectStoryArgs) => ({
  components: { UiSelect, UiCard },
  setup() {
    const value = ref<string | number | boolean | null>(args.modelValue)

    return {
      args,
      value,
      options: OPTIONS,
    }
  },
  template: `
    <div class=" max-h-[32rem]">
      <div class="bg-bg-deep p-12 h-[132rem] flex flex-col">
        <div class="flex gap-16">
          <UiSelect
              v-bind="args"
              v-model="value"
              :list="options"
              class="w-[19rem] justify-self-start"
          />
          <UiSelect
              v-bind="args"
              v-model="value"
              :list="options"
              leading-icon-name="fill_lock"
              class="w-[19rem] justify-self-start"
          />
        </div>
        
        <UiSelect
            v-bind="args"
            v-model="value"
            :list="options"
            class="max-w-[19.5rem] my-auto"
        />
      </div>
    </div>
  `,
})

export const Playground: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: renderSelectStory,
}

export const Placeholder: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  args: {
    modelValue: null,
  },
  render: renderSelectStory,
}

export const Small: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  args: {
    size: 'sm',
    modelValue: null,
  },
  render: renderSelectStory,
}

export const Invalid: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  args: {
    invalid: true,
    errorMessages: 'Please select a document type',
  },
  render: renderSelectStory,
}

export const WithInfoMessage: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  args: {
    modelValue: null,
    infoMessage: 'Choose the document you want to upload',
  },
  render: renderSelectStory,
}

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  args: {
    disabled: true,
  },
  render: renderSelectStory,
}
