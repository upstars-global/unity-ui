import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { reactive } from 'vue'
import UiRadioButton from '../../components/form/basicControls/radioButton/UiRadioButton.vue'

const meta = {
  title: 'Components/Form/Radio Button',
  component: UiRadioButton,
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>


export const GroupStates: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiRadioButton },
    setup() {
      const sections = reactive([
        {
          title: 'Figma states',
          modelValue: 'selected',
          items: [
            {
              title: 'Default',
              props: {
                name: 'radio-figma-default',
                label: 'Text',
                value: 'default',
                infoMessage: 'Description',
              },
            },
            {
              title: 'Checked',
              props: {
                name: 'radio-figma-checked',
                label: 'Text',
                value: 'selected',
                infoMessage: 'Description',
              },
            },
          ],
        },
        {
          title: 'Error states',
          modelValue: 'selected-error',
          items: [
            {
              title: 'Default',
              props: {
                name: 'radio-figma-default-duplicate',
                label: 'Text',
                value: 'default',
                infoMessage: 'Description',
              },
            },
            {
              title: 'Error',
              props: {
                name: 'radio-figma-error',
                label: 'Text',
                value: 'error',
                invalid: true,
                errorMessages: 'Confirm that you’re 18 years old',
              },
            },
          ],
        },
        {
          title: 'Group behavior',
          modelValue: 'push',
          items: [
            {
              title: 'Email',
              props: {
                value: 'email',
                name: 'contact-channel',
                label: 'Email',
                infoMessage: 'Primary communication channel',
              },
            },
            {
              title: 'Push',
              props: {
                value: 'push',
                name: 'contact-channel',
                label: 'Push',
                infoMessage: 'Mobile app notifications',
              },
            },
            {
              title: 'SMS disabled',
              props: {
                name: 'channel-disabled',
                value: 'sms',
                label: 'SMS',
                infoMessage: 'Temporarily unavailable',
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

              <UiRadioButton 
                  v-bind="item.props" 
                  :model-value="section.modelValue" 
                  @update:model-value="section.modelValue = String($event)" 
              />
            </div>
          </div>
        </section>
      </div>
    `,
  }),
}
