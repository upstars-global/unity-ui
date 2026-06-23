import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import UiInput from '../../components/form/basicControls/input/UiInput.vue'
import UiSuggestList from '../../components/form/suggest/UiSuggestList.vue'

type InputStoryArgs = {
  modelValue: string
  name: string
  type: string
  label: string
  placeholder: string
  disabled: boolean
  invalid: boolean
  errorMessages: string
  showClearAction: boolean
  leadingIconName?: 'line_search'
  trailingIconName?: 'line_arrow_top_left'
}

const meta = {
  title: 'Components/Form/Input',
  component: UiInput,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    name: 'playground-input',
    type: 'text',
    label: 'Email',
    placeholder: 'name@example.com',
    disabled: false,
    invalid: false,
    errorMessages: '',
    showClearAction: true,
    leadingIconName: undefined,
    trailingIconName: undefined,
  },
  argTypes: {
    modelValue: { control: 'text' },
    name: { control: 'text' },
    type: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    errorMessages: { control: 'text' },
    showClearAction: { control: 'boolean' },
    leadingIconName: { control: 'text' },
    trailingIconName: { control: 'text' },
  },
} satisfies Meta<InputStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { UiInput },
    setup() {
      const value = ref(args.modelValue)

      return {
        args,
        value,
      }
    },
    template: `
      <div class="p-6 bg-bg-deep">
        <UiInput
          v-bind="args"
          v-model="value"
        />
      </div>
    `,
  }),
}

export const WithSuggestList: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiInput, UiSuggestList },
    setup() {
      const value = ref('')
      const visible = ref(false)
      const activeIndex = ref(0)
      const suggestions = [
        'Amsterdam',
        'Athens',
        'Barcelona',
        'Berlin',
        'Kyiv',
        'Lisbon',
        'London',
        'Madrid',
        'Paris',
        'Prague',
        'Warsaw',
      ]

      const filteredItems = computed(() => {
        const query = value.value.trim().toLowerCase()

        if (!query) {
          return suggestions
        }

        return suggestions.filter((item) => item.toLowerCase().includes(query))
      })

      const closeSuggest = () => {
        visible.value = false
      }

      const updateValue = (nextValue: string) => {
        value.value = nextValue
        visible.value = true
        activeIndex.value = 0
      }

      const selectItem = ({ value: selectedValue, index }: { value: string; index: number }) => {
        value.value = selectedValue
        activeIndex.value = index
        closeSuggest()
      }

      const handleKeydown = (event: KeyboardEvent) => {
        if (!filteredItems.value.length) {
          return
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault()
          visible.value = true
          activeIndex.value = (activeIndex.value + 1) % filteredItems.value.length
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault()
          visible.value = true
          activeIndex.value = (activeIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
        }

        if (event.key === 'Enter' && visible.value) {
          event.preventDefault()
          value.value = filteredItems.value[activeIndex.value]
          closeSuggest()
        }
      }

      const isVisible = computed(() => {
        if(!value.value) {
          return false
        }

        return visible.value && filteredItems.value.length > 0
      })
      return {
        value,
        visible,
        activeIndex,
        filteredItems,
        isVisible,
        closeSuggest,
        updateValue,
        selectItem,
        handleKeydown,
      }
    },
    template: `
      <div class="bg-bg-deep p-12 h-[50rem]">
        <UiInput
          name="destination"
          label="Destination city"
          placeholder="Start typing a city"
          leading-icon-name="line_search"
          class="max-w-[30rem]"
          show-clear-action
          :model-value="value"
          @update:model-value="updateValue"
          @keydown="handleKeydown"
        >
          <template #suggestList>
            <UiSuggestList
              :items="filteredItems"
              :visible="isVisible"
              :active-index="activeIndex"
              leadingIconName="fill_lock"
              @select="selectItem"
              @close="closeSuggest"
            />
          </template>
        </UiInput>
      </div>
    `,
  }),
}

const renderStateStory = ({
  value = '',
  props = {},
  wrapperClass = '',
  autofocus = false,
}: {
  value?: string
  props?: Record<string, unknown>
  wrapperClass?: string
  autofocus?: boolean
}) => ({
  components: { UiInput },
  setup() {
    const inputValue = ref(value)
    const containerRef = ref<HTMLElement | null>(null)

    onMounted(async () => {
      if (!autofocus) {
        return
      }

      await nextTick()
      const focusInput = containerRef.value?.querySelector<HTMLInputElement>('input')

      requestAnimationFrame(() => {
        focusInput?.focus()

        requestAnimationFrame(() => {
          focusInput?.focus()
        })
      })
    })

    return {
      containerRef,
      inputValue,
      props,
      wrapperClass,
    }
  },
  template: `
    <div class="bg-bg-deep p-6">
      <div
        ref="containerRef"
        :class="wrapperClass"
        class="max-w-[24rem]"
      >
        <UiInput
          v-bind="props"
          :model-value="inputValue"
          @update:model-value="inputValue = $event"
        />
      </div>
    </div>
  `,
})

export const StateDefault: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => renderStateStory({
    props: {
      name: 'state-default',
      label: 'Email',
      placeholder: 'name@example.com',
    },
  }),
}

export const StateFocus: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => renderStateStory({
    autofocus: true,
    props: {
      name: 'state-focus',
      label: 'Email',
      placeholder: 'name@example.com',
      autofocus: true
    },
  }),
}

export const StateEmptyError: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => renderStateStory({
    props: {
      name: 'state-empty-error',
      label: 'Email',
      placeholder: 'name@example.com',
      invalid: true,
      errorMessages: 'Email is required',
    },
  }),
}
export const StateError: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => renderStateStory({
    value: 'wrong-email',
    props: {
      name: 'state-error',
      label: 'Email',
      placeholder: 'name@example.com',
      invalid: true,
      errorMessages: 'Invalid email address',
    },
  }),
}

export const StateDisabled: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => renderStateStory({
    value: 'name@example.com',
    props: {
      name: 'state-disabled',
      label: 'Email',
      placeholder: 'name@example.com',
      disabled: true,
    },
  }),
}

export const PropsMatrix: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => ({
    components: { UiInput },
    setup() {
      const sections = reactive([
        {
          title: '1 row: type',
          items: [
            {
              title: 'Text',
              value: '',
              props: {
                name: 'type-text',
                type: 'text',
                label: 'Text input',
                placeholder: 'Enter plain text',
              },
            },
            {
              title: 'Password',
              value: '',
              props: {
                name: 'type-password',
                type: 'password',
                label: 'Password',
                placeholder: 'Enter password',
              },
            },
          ],
        },
        {
          title: '2 row: inputmode',
          items: [
            {
              title: 'Email',
              value: '',
              props: {
                name: 'mode-email',
                label: 'Email mode',
                placeholder: 'name@example.com',
                inputMode: 'email',
              },
            },
            {
              title: 'Numeric',
              value: '',
              props: {
                name: 'mode-numeric',
                label: 'Numeric mode',
                placeholder: 'Only digits',
                inputMode: 'numeric',
                mask: "###",
              },
            },
            {
              title: 'Decimal',
              value: '',
              props: {
                name: 'mode-decimal',
                label: 'Decimal mode',
                placeholder: '12.50',
                inputMode: 'decimal',
                mask: "##.##",
              },
            },
          ],
        },
        {
          title: '3 row: mask',
          items: [
            {
              title: 'Date',
              value: '',
              props: {
                name: 'mask-date',
                label: 'Date',
                placeholder: 'DD.MM.YYYY',
                mask: '##.##.####',
                inputMode: 'numeric',
              },
            },
            {
              title: 'Phone',
              value: '',
              props: {
                name: 'mask-phone',
                label: 'Phone',
                placeholder: '+38 (050) 123-45-67',
                mask: '+## (###) ###-##-##',
                inputMode: 'tel',
              },
            },
            {
              title: 'Card tail',
              value: '',
              props: {
                name: 'mask-card',
                label: 'Card tail',
                placeholder: '1234 5678',
                mask: '#### ####',
                inputMode: 'numeric',
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
              class="rounded-2xl border border-white/10 bg-black/10 p-4"
            >
              <div class="mb-3 text-caption text-fg-secondary">
                {{ item.title }}
              </div>

              <UiInput
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
