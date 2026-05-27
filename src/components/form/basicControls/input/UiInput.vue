<script setup lang="ts">
import {computed, ref, useAttrs, useSlots} from 'vue'
import { useAppConfig } from '../../../../composables/useAppConfig'
import { flattenClasses } from '../../../../helpers/flattenClasses'
import UiIcon from '../../../icon/UiIcon.vue'
import type { UiInputEmits, UiInputProps, UiInputSlots } from './types'

defineOptions({
  name: 'UiInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiInputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  invalid: false,
  label: '',
  message: '',
  placeholder: '',
  showClearAction: false,
})

const emit = defineEmits<UiInputEmits>()
defineSlots<UiInputSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const slots = useSlots()
const inputTheme = appConfig.components.input;
const inputRef = ref<HTMLInputElement | null>(null);

const attributes = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
const isFocused = ref(false)

const hasValue = computed(() => Boolean(props.modelValue))
const shouldFloatLabel = computed(() => Boolean(props.label) && (isFocused.value || hasValue.value))
const hasMessage = computed(() => props.invalid && (Boolean(props.errorMessages) || Boolean(slots.errorMessages)))
const showLeadingIcon = computed(() => Boolean(props.leadingIconName))
const showTrailingIcon = computed(() => Boolean(props.trailingIconName))
const showClearAction = computed(() => Boolean(props.showClearAction && props.modelValue && isFocused.value))

const rootClasses = computed(() => {
  return flattenClasses(
    inputTheme.base,
    attrs.class,
  )
})
const fieldClasses = computed(() => {
  return flattenClasses(
      inputTheme?.slots.field,
      inputTheme?.size.default.field
  )
})
const contentClasses = computed(() => {
  return flattenClasses(inputTheme.slots.content)
})
const floatingLabelClasses = computed(() => {
  return [
      'pointer-events-none absolute left-0 origin-left transition-all duration-200 ease-out',
      shouldFloatLabel.value
          ? 'top-0 translate-y-0 scale-100 text-caption'
          : 'top-1/2 -translate-y-1/2 text-body',
      inputTheme.slots.label,
  ]
})
const controlClasses = computed(() => {
  return flattenClasses(
    'absolute z-1 w-full min-w-0 border-0 bg-transparent p-0 outline-none placeholder:opacity-100 disabled:cursor-not-allowed',
      'px-[2.75rem] pt-[1.25rem] pb-2 left-[-2.75rem] box-content',
      shouldFloatLabel.value
          ? 'bottom-0 translate-y-0 scale-100'
          : '',
    inputTheme.slots.value
  )
})
const messageClasses = computed(() => {
  return flattenClasses(inputTheme.slots.message)
})
const leadingIconClasses = computed(() => {
  return flattenClasses(inputTheme.slots.leadingIcon)
})
const trailingIconClasses = computed(() => {
  return flattenClasses(inputTheme.slots.trailingIcon)
})
const actionClasses = computed(() => {
  return flattenClasses(inputTheme.slots.action)
})
const placeholderText = computed(() => {
  if (props.label && !shouldFloatLabel.value) {
    return ''
  }

  return props.placeholder
})
const showTrailingSlot = computed(() => !showClearAction.value || slots.trailing || showTrailingIcon.value)

function useFormatter(event: Event) {
  if (props.formatter) {
    props.formatter(event);
  }
}
function handlerInput(event: Event) {
  useFormatter(event);
  const target = event.target as HTMLInputElement
  updateValue(target.value)
}
function handlerClearValue() {
  updateValue('');
  inputRef.value?.focus()
}

function updateValue(value: string) {
  emit('update:modelValue', value)
}
function handlerChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('change', target.value);
}

function handlerKeyDown(event: Event) {
  emit('keydown', event)
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true
  inputRef.value?.focus();
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  inputRef.value?.blur();
  emit('blur', event)
}
</script>

<template>
  <div
      :data-disabled="disabled"
      :data-invalid="invalid"
      :class="rootClasses"
  >
    <div
        :data-disabled="disabled"
        :data-invalid="invalid"
        :class="fieldClasses"
        @focusin="handleFocus"
        @focusout="handleBlur"
    >
      <slot name="leading">
        <UiIcon
            v-if="showLeadingIcon"
            :name="leadingIconName"
            :class="leadingIconClasses"
        />
      </slot>
      <div :class="contentClasses">
        <label
            v-if="label"
            :class="floatingLabelClasses"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </label>
        <input
            ref="inputRef"
            v-mask="mask"
            :value="modelValue"
            :type="type"
            :disabled="disabled"
            :aria-invalid="invalid"
            :placeholder="placeholderText"
            :class="controlClasses"
            :step="step"
            :min="min"
            :max="max"
            :maxlength="maxlength"
            :pattern="pattern"
            @change="handlerChange"
            @input="handlerInput"
            @keydown.up="handlerKeyDown"
            @keydown.down="handlerKeyDown"
            @keydown.enter="handlerKeyDown"
        >
      </div>
      <UiIcon
          v-if="showClearAction"
          name="fill_close"
          class="cursor-pointer relative z-2"
          :class="trailingIconClasses"
          @mousedown.prevent="handlerClearValue"
      />
      <div
          v-else-if="showTrailingSlot"
          :class="actionClasses"
      >
        <slot
            name="trailing"
        >
          <UiIcon
              v-if="showTrailingIcon"
              :name="trailingIconName"
              :class="trailingIconClasses"
          />
        </slot>
      </div>
    </div>
    <slot name="suggestList"/>
    <div
        v-if="hasMessage"
        :class="messageClasses"
    >
      <slot name="errorMessages">
        {{ errorMessages }}
      </slot>
    </div>
  </div>
</template>
