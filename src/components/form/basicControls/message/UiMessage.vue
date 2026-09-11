<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from '../../../icon/UiIcon.vue'
import { MessageIconNames } from '../BaseField'
import type { MessageType } from '../BaseField'
import type { UiMessageProps, UiMessageSlots } from './types'

defineOptions({
  name: 'UiMessage',
})

const props = defineProps<UiMessageProps>()
defineSlots<UiMessageSlots>()

const iconName = computed(() => {
  if (props.message.iconName) {
    return props.message.iconName
  }

  if (props.message.type === 'default') {
    return undefined
  }

  return MessageIconNames[props.message.type]
})

const typeClasses: Partial<Record<MessageType, string>> = {
  success: 'ui-input__message--success',
  error: 'ui-input__message--error',
}
</script>

<template>
  <div
    class="ui-input__message"
    :class="typeClasses[message.type]"
  >
    <UiIcon
      v-if="iconName"
      :name="iconName"
      size="16"
    />
    <slot :message="message">
      {{ message.message }}
    </slot>
  </div>
</template>
