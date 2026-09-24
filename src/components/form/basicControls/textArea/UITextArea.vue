<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import type { UiTextAreaEmits, UiTextAreaProps, UiTextAreaSlots } from './types'
import { baseFieldDefault } from '../BaseField.ts'
import UiMessage from '../message/UiMessage.vue'

defineOptions({
  name: 'UiTextArea',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiTextAreaProps>(), {
  ...baseFieldDefault,
  modelValue: '',
  invalid: false,
  label: '',
  rows: 3,
  resize: 'none',
})

const emit = defineEmits<UiTextAreaEmits>()
defineSlots<UiTextAreaSlots>()

const attrs = useAttrs()
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const normalizedValue = computed(() => String(props.modelValue ?? ''))
const hasBottomMessage = computed(() => Boolean(props.message || props.maxlength))
const shouldShowCounter = computed(() => Boolean(props.maxlength))
const characterCount = computed(() => normalizedValue.value.length)

function updateValue(value: string) {
  emit('update:modelValue', value)
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  updateValue(target.value)
}

function handleChange(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('change', target.value)
}

function handleFocus(event: FocusEvent) {
  textareaRef.value?.focus()
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  textareaRef.value?.blur()
  emit('blur', event)
}
</script>

<template>
  <div
    :data-disabled="disabled"
    :data-invalid="invalid"
    :class="attrs.class"
    class="ui-input ui-textarea"
  >
    <div
      :data-disabled="disabled"
      :data-invalid="invalid"
      class="ui-input__field ui-textarea__field"
      @focusin="handleFocus"
      @focusout="handleBlur"
    >
      <div class="ui-textarea__content">
        <label
          v-if="label"
          :for="name"
          class="ui-input__label ui-textarea__label"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </label>
        <textarea
          ref="textareaRef"
          :value="modelValue"
          :disabled="disabled"
          :aria-invalid="invalid"
          :placeholder="placeholder"
          class="ui-textarea__value"
          :name="name"
          :id="name"
          :maxlength="maxlength"
          :rows="rows"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :data-test="dataTest"
          :inputmode="inputMode"
          :style="{ resize }"
          @change="handleChange"
          @input="handleInput"
        />
      </div>
    </div>
    <div
      v-if="hasBottomMessage"
      class="ui-input__message ui-textarea__message-row"
    >
      <UiMessage
        v-if="message"
        :message="message"
        class="ui-textarea__message"
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
      <div
        v-if="shouldShowCounter"
        class="ui-textarea__counter"
      >
        {{ characterCount }}/{{ maxlength }}
      </div>
    </div>
  </div>
</template>
