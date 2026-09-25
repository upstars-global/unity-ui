<script setup lang="ts">
import { autoUpdate, flip, offset, shift, size as sizeMiddleware, useFloating } from '@floating-ui/vue'
import { computed, ref, useAttrs } from 'vue'
import UiSuggestList from '../../suggest/UiSuggestList.vue'
import type { UiSuggestListSelectPayload } from '../../suggest/types'
import UiIcon from '../../../icon/UiIcon.vue'
import { baseFieldDefault } from '../BaseField.ts'
import UiMessage from '../message/UiMessage.vue'
import type {
  SelectValue,
  UiSelectEmits,
  UiSelectOption,
  UiSelectProps,
  UiSelectSlots,
} from './types'

defineOptions({
  name: 'UiSelect',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiSelectProps>(), {
  ...baseFieldDefault,
  modelValue: null,
  invalid: false,
  label: '',
  list: () => [],
  size: 'default',
  trailingIconName: 'line_dropdown_down',
  optionTrailingIconName: undefined,
})

const emit = defineEmits<UiSelectEmits>()
defineSlots<UiSelectSlots>()

const attrs = useAttrs()

const rootRef = ref<HTMLElement | null>(null)
const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const selectedIndex = computed(() => props.list.findIndex((item) => item.value === props.modelValue))
const selectedOption = computed<UiSelectOption | null>(() => props.list[selectedIndex.value] ?? null)
const hasValue = computed(() => selectedOption.value !== null)
const hasFloatingLabel = computed(() => props.size === 'default' && Boolean(props.label))
const shouldFloatLabel = computed(() => hasFloatingLabel.value && (isOpen.value || hasValue.value))
const currentLeadingIconName = computed(() => selectedOption.value?.leadingIconName ?? props.leadingIconName)

const listboxId = computed(() => `${props.name}-listbox`)
const displayedValue = computed(() => {
  if (hasFloatingLabel.value && !shouldFloatLabel.value) {
    return ''
  }

  if (selectedOption.value?.label) {
    return selectedOption.value.label
  }

  if (props.size === 'sm') {
    return props.label || props.placeholder
  }

  return props.placeholder
})
const rootClasses = computed(() => {
  return [
    `ui-select--${props.size}`,
    shouldFloatLabel.value && 'ui-select--floating-label',
    isOpen.value && 'ui-select--open',
    props.disabled && 'ui-select--disabled',
    props.invalid && 'ui-select--error',
    attrs.class,
  ]
})
const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

const { floatingStyles } = useFloating(reference, floating, {
  transform: false,
  open: isOpen,
  placement: 'bottom-start',
  middleware: [
    offset(4),
    flip({
      fallbackPlacements: ['top-start'],
      padding: 8,
    }),
    shift({
      padding: 8,
    }),
    sizeMiddleware({
      padding: 8,
      apply({ rects, availableHeight, elements }) {
        Object.assign(elements.floating.style, {
          minWidth: `${rects.reference.width}px`,
          maxHeight: `${Math.min(320, Math.max(0, availableHeight))}px`,
        })
      },
    }),
  ],
  whileElementsMounted(referenceEl, floatingEl, update) {
    return autoUpdate(referenceEl, floatingEl, update, {
      ancestorScroll: true,
    })
  },
})

function openList() {
  if (props.disabled || !props.list.length || isOpen.value) {
    return
  }

  isOpen.value = true
  emit('open')
}

function closeList() {
  if (!isOpen.value) {
    return
  }

  isOpen.value = false
  emit('close')
}

function toggleList() {
  if (isOpen.value) {
    closeList()
    return
  }

  openList()
}

function emitValue(value: SelectValue | null) {
  emit('update:modelValue', value)
  emit('change', value)
}

function selectOption(payload: UiSuggestListSelectPayload<SelectValue>) {
  emitValue(payload.value)
  closeList()
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleClickOutside() {
  closeList()
}
</script>

<template>
  <div
    ref="rootRef"
    v-click-outside="handleClickOutside"
    :data-disabled="disabled"
    :data-invalid="invalid"
    :data-open="isOpen"
    :class="rootClasses"
    v-bind="attributes"
    class="ui-select group"
  >
    <button
      :id="name"
      ref="reference"
      type="button"
      :name="name"
      :disabled="disabled"
      :aria-invalid="invalid"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      role="combobox"
      :aria-controls="listboxId"
      :data-test="dataTest"
      :data-disabled="disabled"
      :data-invalid="invalid"
      :data-open="isOpen"
      class="ui-select__field"
      @click="toggleList"
      @focus="handleFocus"
    >
      <slot
        name="leading"
        :selected-option="selectedOption"
      >
        <UiIcon
          v-if="currentLeadingIconName"
          :name="currentLeadingIconName"
          class="ui-select__icon"
        />
      </slot>
      <div class="ui-select__content">
        <span
          v-if="size === 'default' && label"
          class="ui-select__label"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </span>
        <span
          v-if="displayedValue"
          :class="hasValue ? 'ui-select__displayed-value--value' : 'ui-select__displayed-value--placeholder'"
          class="ui-select__displayed-value"
        >
          {{ displayedValue }}
        </span>
      </div>
      <div
        class="ui-select__action"
      >
        <slot
          name="trailing"
          :selected-option="selectedOption"
          :is-open="isOpen"
        >
          <UiIcon
            :name="trailingIconName"
            class="ui-select__icon ui-select__dropdown-icon"
          />
        </slot>
      </div>
    </button>

    <div
      v-if="isOpen"
      :id="listboxId"
      ref="floating"
      role="presentation"
      :style="floatingStyles"
      class="ui-select__list"
    >
      <UiSuggestList
        :items="list"
        :visible="isOpen"
        :selected-value="modelValue"
        :id-prefix="name"
        variant="embedded"
        :close-on-click-outside="false"
        @select="selectOption"
      />
    </div>

    <UiMessage
      v-if="message"
      :message="message"
    >
      <template
        v-if="$slots.message"
        #default="slotProps"
      >
        <slot
          name="message"
          v-bind="slotProps"
        />
      </template>
    </UiMessage>
  </div>
</template>
