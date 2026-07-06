import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { reactive, ref } from 'vue'
import UiCheckbox from '../../components/form/basicControls/checkbox/UiCheckbox.vue'

type CheckboxStoryArgs = {
  modelValue: boolean
  name: string
  label: string
  disabled: boolean
  invalid: boolean
  errorMessages: string
  infoMessage: string
  indeterminate: boolean
}

const meta = {
  title: 'Components/Form/Checkbox',
  component: UiCheckbox,
  tags: ['autodocs'],
  args: {
    modelValue: false,
    name: 'storybook-checkbox',
    label: 'Confirm that you’re 18 years old',
    disabled: false,
    invalid: false,
    errorMessages: '',
    infoMessage: '',
    indeterminate: false,
  },
  argTypes: {
    modelValue: { control: 'boolean' },
    name: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    errorMessages: { control: 'text' },
    infoMessage: { control: 'text' },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<CheckboxStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiCheckbox },
    setup() {
      const value = ref(args.modelValue)

      return {
        args,
        value,
      }
    },
    template: `
      <div class="p-6 bg-bg-deep">
        <UiCheckbox
          v-bind="args"
          v-model="value"
          class="max-w-[20rem]"
        />
      </div>
    `,
  }),
}

export const PropsMatrix: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiCheckbox },
    setup() {
      const sections = reactive([
        {
          title: 'Base states',
          items: [
            {
              title: 'Default',
              value: false,
              props: {
                name: 'default',
                label: 'Receive product updates',
              },
            },
            {
              title: 'Checked',
              value: true,
              props: {
                name: 'checked',
                label: 'Receive product updates',
              },
            },
            {
              title: 'Indeterminate',
              value: false,
              props: {
                name: 'indeterminate',
                label: 'Select all markets',
                indeterminate: true,
                infoMessage: 'Part of the options are already selected.',
              },
            },
          ],
        },
        {
          title: 'Validation and disabled',
          items: [
            {
              title: 'Invalid',
              value: false,
              props: {
                name: 'invalid',
                label: 'Text',
                invalid: true,
                errorMessages: 'Confirm that you’re 18 years old',
              },
            },
            {
              title: 'Disabled',
              value: false,
              props: {
                name: 'disabled',
                label: 'Subscribe to promo notifications',
                disabled: true,
              },
            },
            {
              title: 'Disabled checked',
              value: true,
              props: {
                name: 'disabled-checked',
                label: 'I agree to the terms and conditions',
                disabled: true,
              },
            },
          ],
        },
      ])

      return {
        sections,
      }
    },
    template: `
      <div class="space-y-6 bg-bg-deep p-6">
        <section
          v-for="section in sections"
          :key="section.title"
          class="rounded-3xl border border-white/10 bg-white/5 p-5"
        >
          <div class="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-fg-secondary">
            {{ section.title }}
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="item in section.items"
              :key="item.title"
              class="rounded-2xl border border-fg-brand bg-bg-surface p-16"
            >
              <div class="mb-3 text-caption text-fg-secondary">
                {{ item.title }}
              </div>

              <UiCheckbox
                v-bind="item.props"
                :model-value="item.value"
                @update:model-value="item.value = $event"
              />
            </div>
          </div>
        </section>
      </div>
    `,
  }),
}
