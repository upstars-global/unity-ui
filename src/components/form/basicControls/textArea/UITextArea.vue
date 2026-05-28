<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { useAppConfig } from '../../../../composables/useAppConfig'
import { flattenClasses } from '../../../../helpers/flattenClasses'
import type { UiTextAreaEmits, UiTextAreaProps, UiTextAreaSlots } from './types'
import { baseFieldDefault } from '../BaseField.ts'
import UiIcon from "@src/components/icon/UiIcon.vue";

defineOptions({
  name: 'UiTextArea',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiTextAreaProps>(), {
  ...baseFieldDefault,
  modelValue: '',
  invalid: false,
  label: '',
  message: '',
  rows: 3,
  resize: 'none',
})

const emit = defineEmits<UiTextAreaEmits>()
defineSlots<UiTextAreaSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const slots = useSlots()
const textAreaTheme = appConfig.components.textArea
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const isFocused = ref(false)

const normalizedValue = computed(() => String(props.modelValue ?? ''))
const hasErrorMessage = computed(() => props.invalid && (Boolean(props.errorMessages) || Boolean(slots.errorMessages)))
const hasBottomMessage = computed(() => Boolean(props.message || slots.message || hasErrorMessage.value || props.maxlength))
const shouldShowCounter = computed(() => Boolean(props.maxlength))
const characterCount = computed(() => normalizedValue.value.length)

const rootClasses = computed(() => {
  return flattenClasses(
    textAreaTheme.base,
    attrs.class,
  )
})

const fieldClasses = computed(() => {
  return flattenClasses(
    textAreaTheme.slots.field,
    textAreaTheme.size.default.field,
  )
})

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
  isFocused.value = true
  textareaRef.value?.focus()
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  textareaRef.value?.blur()
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
      <div :class="textAreaTheme.slots.content">
        <label
          v-if="label"
          :class="textAreaTheme.slots.label"
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
          :class="textAreaTheme.slots.value"
          :name="name"
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
      :class="textAreaTheme.slots.messageRow"
    >
      <div :class="textAreaTheme.slots.message">
        <div
            v-if="hasErrorMessage"
            :class="textAreaTheme.slots.errorMessage"
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
          {{ message }}
        </slot>
      </div>
      <div
        v-if="shouldShowCounter"
        :class="textAreaTheme.slots.counter"
      >
        {{ characterCount }}/{{ maxlength }}
      </div>
    </div>
  </div>
</template>
