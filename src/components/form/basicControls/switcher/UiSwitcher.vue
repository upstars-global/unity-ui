<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useAppConfig } from '../../../../composables/useAppConfig'
import { flattenClasses } from '../../../../helpers/flattenClasses'
import type { UiSwitcherEmits, UiSwitcherProps, UiSwitcherSlots } from './types'

defineOptions({
  name: 'UiSwitcher',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiSwitcherProps>(), {
  autofocus: false,
  dataTest: '',
  disabled: false,
  errorMessages: '',
  infoMessage: '',
  invalid: false,
  modelValue: false,
})

const emit = defineEmits<UiSwitcherEmits>()
defineSlots<UiSwitcherSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const switcherTheme = appConfig.components.switcher

const checked = computed(() => Boolean(props.modelValue))

const fieldClasses = computed(() => {
  return flattenClasses(
    switcherTheme.slots.field,
  )
})

const trackClasses = computed(() => {
  return flattenClasses(
    switcherTheme.slots.track,
  )
})

const thumbClasses = computed(() => {
  return flattenClasses(
    switcherTheme.slots.thumb,
  )
})

const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

const rootClasses = computed(() => {
  return [
    attrs.class,
    checked.value ? 'selected': '',
  ]
})

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement

  console.log(event);
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
    class="ui-switcher"
  >
    <label
      :for="name"
      :data-disabled="disabled"
      :class="fieldClasses"
      class="ui-switcher__label"
    >
      <input
        :id="name"
        :name="name"
        :checked="checked"
        :disabled="disabled"
        :value="value"
        :autofocus="autofocus"
        :data-test="dataTest"
        :aria-invalid="invalid"
        :aria-checked="checked"
        type="checkbox"
        role="switch"
        class="ui-switcher__input peer sr-only"
        v-bind="attributes"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span
          v-if="label || $slots.default"
          class="ui-switcher__label break-words text-body text-fg-primary"
      >
            {{ label }}
          <slot />
        </span>
      <span
          :class="switcherTheme.slots.control"
          class="ui-switcher__control"
      >
        <span
            :class="trackClasses"
            class="ui-switcher__track"
        />
        <span
            :class="thumbClasses"
            class="ui-switcher__thumb"
        />
      </span>
    </label>
  </div>
</template>
