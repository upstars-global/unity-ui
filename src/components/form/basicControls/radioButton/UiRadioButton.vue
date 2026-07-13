<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { useAppConfig } from '../../../../composables/useAppConfig'
import { flattenClasses } from '../../../../helpers/flattenClasses'
import type { RadioButtonValue, UiRadioButtonEmits, UiRadioButtonProps, UiRadioButtonSlots } from './types'

defineOptions({
  name: 'UiRadioButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiRadioButtonProps>(), {
  autofocus: false,
  dataTest: '',
  disabled: false,
  errorMessages: '',
  infoMessage: '',
  invalid: false,
  modelValue: null,
  value: true,
})

const emit = defineEmits<UiRadioButtonEmits>()
defineSlots<UiRadioButtonSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const slots = useSlots()
const radioButtonTheme = appConfig.components.radioButton

const checked = computed(() => props.modelValue === props.value)
const hasErrorMessage = computed(() => props.invalid && (Boolean(props.errorMessages) || Boolean(slots.errorMessages)))
const hasBottomMessage = computed(() => Boolean(props.infoMessage || slots.message || hasErrorMessage.value))

const rootClasses = computed(() => {
  return flattenClasses(
    radioButtonTheme.base,
    attrs.class,
  )
})

const fieldClasses = computed(() => {
  return flattenClasses(radioButtonTheme.slots.field)
})

const controlClasses = computed(() => {
  return flattenClasses(
    radioButtonTheme.slots.control,
    props.invalid && !checked.value && radioButtonTheme.slots.controlInvalid,
  )
})

const indicatorClasses = computed(() => {
  return flattenClasses(
    radioButtonTheme.slots.indicator,
    checked.value && radioButtonTheme.slots.indicatorChecked,
  )
})

const inputId = computed(() => {
  if (typeof attrs.id === 'string' && attrs.id.length > 0) {
    return attrs.id
  }

  return `${props.name}-${String(props.value)}`
})

const attributes = computed(() => {
  const { class: _class, id: _id, ...rest } = attrs

  return rest
})

function emitValue(value: RadioButtonValue) {
  emit('update:modelValue', value)
  emit('change', value)
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.checked) {
    emitValue(props.value)
  }
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
      :for="inputId"
      :data-disabled="disabled"
      :class="fieldClasses"
    >
      <input
        :id="inputId"
        :name="name"
        :checked="checked"
        :disabled="disabled"
        :value="value"
        :autofocus="autofocus"
        :data-test="dataTest"
        :aria-invalid="invalid"
        :aria-checked="checked"
        type="radio"
        :class="radioButtonTheme.slots.input"
        v-bind="attributes"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span :class="controlClasses">
        <span :class="indicatorClasses" />
      </span>
      <span :class="radioButtonTheme.slots.content">
        <span :class="radioButtonTheme.slots.label">
          <slot name="label">
            {{ label }}
          </slot>
          <slot />
        </span>
        <span
          v-if="hasBottomMessage"
          :class="hasErrorMessage ? radioButtonTheme.slots.errorMessage : radioButtonTheme.slots.message"
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
