<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watchEffect } from 'vue'
import { useAppConfig } from '../../../../composables/useAppConfig'
import { flattenClasses } from '../../../../helpers/flattenClasses'
import UiIcon from '../../../icon/UiIcon.vue'
import type { UiCheckboxEmits, UiCheckboxProps, UiCheckboxSlots } from './types'

defineOptions({
  name: 'UiCheckbox',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiCheckboxProps>(), {
  autofocus: false,
  dataTest: '',
  disabled: false,
  errorMessages: '',
  infoMessage: '',
  invalid: false,
  indeterminate: false,
  modelValue: false,
})

const emit = defineEmits<UiCheckboxEmits>()
defineSlots<UiCheckboxSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const slots = useSlots()
const checkboxTheme = appConfig.components.checkbox
const inputRef = ref<HTMLInputElement | null>(null)

const checked = computed(() => Boolean(props.modelValue))
const hasErrorMessage = computed(() => props.invalid && (Boolean(props.errorMessages) || Boolean(slots.errorMessages)))
const hasBottomMessage = computed(() => Boolean(props.infoMessage || slots.message || hasErrorMessage.value))

const rootClasses = computed(() => {
  return flattenClasses(
    checkboxTheme.base,
    attrs.class,
  )
})

const fieldClasses = computed(() => {
  return flattenClasses(checkboxTheme.slots.field)
})

const controlClasses = computed(() => {
  return flattenClasses(
    checkboxTheme.slots.control,
    props.invalid && !checked.value && checkboxTheme.slots.controlInvalid,
  )
})

const iconClasses = computed(() => {
  return flattenClasses(
    checkboxTheme.slots.icon,
    checked.value && checkboxTheme.slots.iconChecked,
  )
})

const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = Boolean(props.indeterminate)
  }
})

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>

<template>
  <div
    :data-disabled="disabled"
    :data-invalid="invalid"
    :class="rootClasses"
  >
    <label
      :for="name"
      :data-disabled="disabled"
      :class="fieldClasses"
    >
      <input
        ref="inputRef"
        :id="name"
        :name="name"
        :checked="checked"
        :disabled="disabled"
        :value="value"
        :autofocus="autofocus"
        :data-test="dataTest"
        :aria-invalid="invalid"
        :aria-checked="indeterminate ? 'mixed' : checked"
        type="checkbox"
        :class="checkboxTheme.slots.input"
        v-bind="attributes"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span :class="controlClasses">
        <UiIcon
          name="line_check"
          size="16"
          class="w-full h-full"
          :class="iconClasses"
        />
      </span>
      <span :class="checkboxTheme.slots.content">
        <span :class="checkboxTheme.slots.label">
          <slot name="label">
            {{ label }}
          </slot>
          <slot />
        </span>
        <span
          v-if="hasBottomMessage"
          :class="hasErrorMessage ? checkboxTheme.slots.errorMessage : checkboxTheme.slots.message"
        >
          <slot
            v-if="hasErrorMessage"
            name="errorMessages"
          >
            {{ errorMessages }}
          </slot>
          <slot
            v-else
            name="message"
          >
            {{ infoMessage }}
          </slot>
        </span>
      </span>
    </label>
  </div>
</template>
