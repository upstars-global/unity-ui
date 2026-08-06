<script setup lang="ts">
import { autoUpdate, flip, offset, shift, size as sizeMiddleware, useFloating } from '@floating-ui/vue'
import { computed, ref, useAttrs, useSlots } from 'vue'
import { useAppConfig } from '../../../../composables/useAppConfig'
import { flattenClasses } from '../../../../helpers/flattenClasses'
import UiSuggestList from '../../suggest/UiSuggestList.vue'
import type { UiSuggestListSelectPayload } from '../../suggest/types'
import UiIcon from '../../../icon/UiIcon.vue'
import { baseFieldDefault } from '../BaseField.ts'
import { LABEL_BLUR, LABEL_FOCUS, VALUE_FOCUS } from '../input/theme.ts'
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

const appConfig = useAppConfig()
const attrs = useAttrs()
const slots = useSlots()
const selectTheme = appConfig.components.select

const rootRef = ref<HTMLElement | null>(null)
const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isFocused = ref(false)

const hasErrorMessage = computed(() =>
    props.invalid &&
    (Boolean(props.errorMessages) || Boolean(slots.errorMessages)) &&
    !isFocused.value
)
const hasBottomMessage = computed(() => Boolean(props.infoMessage || slots.message || hasErrorMessage.value))
const selectedIndex = computed(() => props.list.findIndex((item) => item.value === props.modelValue))
const selectedOption = computed<UiSelectOption | null>(() => props.list[selectedIndex.value] ?? null)
const hasValue = computed(() => selectedOption.value !== null)
const hasFloatingLabel = computed(() => props.size === 'default' && Boolean(props.label))
const shouldFloatLabel = computed(() => hasFloatingLabel.value && (isFocused.value || isOpen.value || hasValue.value))
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
  return flattenClasses(
    selectTheme.base,
    `ui-select--${props.size}`,
    isOpen.value && 'ui-select--open',
    props.disabled && 'ui-select--disabled',
    props.invalid && 'ui-select--error',
    attrs.class as string | undefined,
  )
})
const fieldClasses = computed(() => {
  return flattenClasses(
    selectTheme.slots.field,
    selectTheme.size[props.size].field,
  )
})
const contentClasses = computed(() => {
  return flattenClasses(
    selectTheme.slots.content,
    selectTheme.size[props.size].content,
  )
})
const floatingLabelClasses = computed(() => {
  return flattenClasses(
    selectTheme.slots.label,
    shouldFloatLabel.value ? LABEL_FOCUS : LABEL_BLUR,
  )
})
const displayedValueClasses = computed(() => {
  return flattenClasses(
    hasValue.value ? selectTheme.slots.value : selectTheme.slots.placeholder,
    shouldFloatLabel.value && VALUE_FOCUS,
  )
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
    offset(8),
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

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    closeList()
    return
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
    if (!isOpen.value) {
      event.preventDefault()
      openList()
    }
  }
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false

  requestAnimationFrame(() => {
    if (!rootRef.value?.contains(document.activeElement)) {
      closeList()
    }
  })

  emit('blur', event)
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
    class="ui-select"
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
      :class="fieldClasses"
      @click="toggleList"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      class="ui-select__field"
    >
      <slot
        name="leading"
        :selected-option="selectedOption"
      >
        <UiIcon
          v-if="currentLeadingIconName"
          :name="currentLeadingIconName"
          class="ui-select__icon"
          :class="selectTheme.slots.leadingIcon"
        />
      </slot>
      <div :class="contentClasses">
        <span
          v-if="size === 'default' && label"
          :class="floatingLabelClasses"
          class="ui-select__label ui-select__text"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </span>
        <span
          v-if="displayedValue"
          :class="displayedValueClasses"
          class="ui-select__text ui-select__displayed-value"
        >
          {{ displayedValue }}
        </span>
      </div>
      <div
        :class="selectTheme.slots.action"
      >
        <slot
          name="trailing"
          :selected-option="selectedOption"
          :is-open="isOpen"
        >
          <UiIcon
            :name="trailingIconName"
            class="ui-select__icon ui-select__dropdown-icon"
            :class="selectTheme.slots.trailingIcon"
          />
        </slot>
      </div>
    </button>

    <div
      v-if="isOpen"
      :id="listboxId"
      ref="floating"
      role="presentation"
      :class="selectTheme.slots.list"
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

    <div
      v-if="hasBottomMessage"
      :class="selectTheme.slots.message"
    >
      <div
        v-if="hasErrorMessage"
        :class="selectTheme.slots.errorMessage"
      >
        <slot name="errorMessages">
          <UiIcon
            name="fill_attention_1"
            size="16"
          />
          {{ errorMessages }}
        </slot>
      </div>
      <slot
        v-else
        name="message"
      >
        {{ infoMessage }}
      </slot>
    </div>
  </div>
</template>
