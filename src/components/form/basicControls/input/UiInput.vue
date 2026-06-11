<script setup lang="ts">
import {computed, nextTick, ref, useAttrs, useSlots, watch} from 'vue'
import { useAppConfig } from '../../../../composables/useAppConfig'
import { flattenClasses } from '../../../../helpers/flattenClasses'
import UiIcon from '../../../icon/UiIcon.vue'
import type { UiInputEmits, UiInputProps, UiInputSlots } from './types'
import {baseFieldDefault} from "../BaseField.ts";
import {LABEL_BLUR, LABEL_FOCUS, VALUE_FOCUS} from "@src/components/form/basicControls/input/theme.ts";

defineOptions({
  name: 'UiInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiInputProps>(), {
  ...baseFieldDefault,
  modelValue: '',
  type: 'text',
  invalid: false,
  label: '',
  showClearAction: false,
})

const emit = defineEmits<UiInputEmits>()
defineSlots<UiInputSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const slots = useSlots()
const inputTheme = appConfig.components.input;
const inputRef = ref<HTMLInputElement | null>(null);

const isFocused = ref(false)
const patternInvalid = ref(false)

const invalid = computed(() => props.invalid || patternInvalid.value)
const hasValue = computed(() => Boolean(props.modelValue))
const shouldFloatLabel = computed(() => Boolean(props.label) && (isFocused.value || hasValue.value))
const hasErrorMessage = computed(() => invalid.value && (Boolean(props.errorMessages) || Boolean(slots.errorMessages)))
const hasBottomMessage = computed(() => Boolean(props.infoMessage || slots.message || hasErrorMessage.value))
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

const floatingLabelClasses = computed(() => {
  return [
      shouldFloatLabel.value
          ? LABEL_FOCUS
          : LABEL_BLUR,
      inputTheme.slots.label,
  ]
})
const controlClasses = computed(() => {
  return [
    inputTheme.slots.value,
    shouldFloatLabel.value ?? VALUE_FOCUS
  ]
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
function syncPatternInvalid() {
  patternInvalid.value = inputRef.value?.validity.patternMismatch ?? false
}
function handlerInput(event: Event) {
  useFormatter(event);
  const target = event.target as HTMLInputElement
  patternInvalid.value = target.validity.patternMismatch
  updateValue(target.value)
}
function handlerClearValue() {
  updateValue('');
  patternInvalid.value = false
  inputRef.value?.focus()
}

function updateValue(value: string) {
  emit('update:modelValue', value)
}
function handlerChange(event: Event) {
  const target = event.target as HTMLInputElement
  patternInvalid.value = target.validity.patternMismatch
  emit('change', target.value);
}

function handlerKeyDown(event: KeyboardEvent) {
  emit('keydown', event)
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true
  inputRef.value?.focus();
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  syncPatternInvalid()
  inputRef.value?.blur();
  emit('blur', event)
}

watch(() => props.modelValue, async () => {
  await nextTick()
  syncPatternInvalid()
}, { immediate: true })
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
        @focusin.stop="handleFocus"
        @focusout="handleBlur"
    >
      <slot name="leading">
        <UiIcon
            v-if="showLeadingIcon"
            :name="leadingIconName"
            :class="inputTheme.slots.leadingIcon"
        />
      </slot>
      <div :class="inputTheme.slots.content">
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
            :maxlength="maxlength"
            :inputmode="inputMode"
            :autofocus="autofocus"
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
          :class="inputTheme.slots.trailingIcon"
          @mousedown.prevent="handlerClearValue"
      />
      <div
          v-else-if="showTrailingSlot"
          :class="inputTheme.slots.action"
      >
        <slot
            name="trailing"
        >
          <UiIcon
              v-if="showTrailingIcon"
              :name="trailingIconName"
              :class="inputTheme.slots.trailingIcon"
          />
        </slot>
      </div>
    </div>
    <slot name="suggestList"/>
    <div
        v-if="hasBottomMessage"
        :class="inputTheme.slots.message"
    >
      <div
          v-if="hasErrorMessage"
          :class="inputTheme.slots.errorMessage"
      >
        <slot
            name="errorMessages"
        >
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
