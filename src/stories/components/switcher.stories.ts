import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { reactive } from 'vue'
import UiSwitcher from '../../components/form/basicControls/switcher/UiSwitcher.vue'

type SwitcherStoryArgs = {
  modelValue: boolean
  name: string
  label: string
  disabled: boolean
  invalid: boolean
}

const meta = {
  title: 'Components/Form/Switcher',
  component: UiSwitcher,
  tags: ['autodocs'],
  args: {
    modelValue: false,
    name: 'storybook-switcher',
    label: 'Receive product updates',
    disabled: false,
    invalid: false,
  },
  argTypes: {
    modelValue: { control: 'boolean' },
    name: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    errorMessages: { table: { disable: true } },
    infoMessage: { table: { disable: true } },
  },
} satisfies Meta<SwitcherStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiSwitcher },
    setup() {
      return {
        args,
      }
    },
    template: `
      <div class="p-6 bg-bg-deep">
        <UiSwitcher
          v-bind="args"
          :model-value="args.modelValue"
          @update:model-value="args.modelValue = $event"
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
    components: { UiSwitcher },
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
                label: 'Text',
              },
            },
            {
              title: 'Checked',
              value: true,
              props: {
                name: 'checked',
                label: 'Text',
              },
            },
            {
              title: 'Without label',
              value: false,
              props: {
                name: 'without-label',
                label: '',
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
                errorMessages: 'This field has an error state',
              },
            },
            {
              title: 'Disabled',
              value: false,
              props: {
                name: 'disabled',
                label: 'Text',
                disabled: true,
              },
            },
            {
              title: 'Disabled checked',
              value: true,
              props: {
                name: 'disabled-checked',
                label: 'Text',
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

              <UiSwitcher
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
