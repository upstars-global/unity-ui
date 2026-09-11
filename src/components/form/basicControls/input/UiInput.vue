<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import UiIcon from '../../../icon/UiIcon.vue'
import UiMessage from '../message/UiMessage.vue'
import type { UiInputEmits, UiInputProps, UiInputSlots } from './types'
import { baseFieldDefault } from '../BaseField.ts'

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

const attrs = useAttrs()
const slots = useSlots()
const inputRef = ref<HTMLInputElement | null>(null);

const isFocused = ref(false)

const invalid = computed(() => props.invalid)
const hasValue = computed(() => Boolean(props.modelValue))
const shouldFloatLabel = computed(() => Boolean(props.label) && (isFocused.value || hasValue.value))
const showLeadingIcon = computed(() => Boolean(props.leadingIconName))
const showTrailingIcon = computed(() => Boolean(props.trailingIconName))
const showClearAction = computed(() => Boolean(props.showClearAction && props.modelValue && isFocused.value))

const rootClasses = computed(() => {
  return [
    shouldFloatLabel.value && 'ui-input--floating-label',
    attrs.class,
  ]
})

const placeholderText = computed(() => {
  if (props.label && !shouldFloatLabel.value) {
    return ''
  }

  return props.placeholder
})
const showTrailingSlot = computed(() => !showClearAction.value || slots.trailing || showTrailingIcon.value)

function moveCaretToEnd() {
  const input = inputRef.value

  if (!input) {
    return
  }

  const caretPosition = input.value.length
  input.setSelectionRange(caretPosition, caretPosition)
}

function focusInputToEnd() {
  inputRef.value?.focus()
  moveCaretToEnd()
}

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
  focusInputToEnd()
}

function updateValue(value: string) {
  emit('update:modelValue', value)
}
function handlerChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('change', target.value);
}

function handlerKeyDown(event: KeyboardEvent) {
  emit('keydown', event)
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)
}
</script>

<template>
  <div
      :data-disabled="disabled"
      :data-invalid="invalid"
      :class="rootClasses"
      class="ui-input ui-input-control"
  >
    <div
        :data-disabled="disabled"
        :data-invalid="invalid"
        class="ui-input__field"
        @focusin="handleFocus"
        @focusout="handleBlur"
    >
      <slot name="leading">
        <UiIcon
            v-if="showLeadingIcon"
            :name="leadingIconName"
            class="ui-input__icon"
        />
      </slot>
      <div class="ui-input__content">
        <label
            v-if="label"
            :for="name"
            class="ui-input__label"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </label>
        <input
            ref="inputRef"
            v-mask="mask"
            :name="name"
            :id="name"
            :value="modelValue"
            :type="type"
            :disabled="disabled"
            :aria-invalid="invalid"
            :placeholder="placeholderText"
            class="ui-input__value"
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
          class="ui-input__icon cursor-pointer relative z-2"
          @mousedown.prevent="handlerClearValue"
      />
      <div
          v-else-if="showTrailingSlot"
          class="ui-input__action"
      >
        <slot
            name="trailing"
        >
          <UiIcon
              v-if="showTrailingIcon"
              :name="trailingIconName"
              class="ui-input__icon"
          />
        </slot>
      </div>
    </div>
    <slot name="suggestList"/>
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
