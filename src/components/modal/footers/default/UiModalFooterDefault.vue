<script setup lang="ts">
import { computed } from 'vue'
import UiButton from '../../../button/UiButton.vue'
import type { UiModalFooterDefaultEmits, UiModalFooterDefaultProps } from './types'

defineOptions({
  name: 'UiModalFooterDefault',
})

const props = withDefaults(defineProps<UiModalFooterDefaultProps>(), {
  type: 'horizontal',
  secondaryLabel: '',
  primaryDisabled: false,
  primaryLoading: false,
  secondaryDisabled: false,
  secondaryLoading: false,
})

const emit = defineEmits<UiModalFooterDefaultEmits>()

const hasSecondary = computed(() => props.type !== 'single')

// Literal class names so the Tailwind content scanner keeps them
const TYPE_CLASSES = {
  single: 'ui-modal-footer-default--single',
  horizontal: 'ui-modal-footer-default--horizontal',
  vertical: 'ui-modal-footer-default--vertical',
} as const
</script>

<template>
  <!-- DOM order is always secondary → primary; the preset positions them per type -->
  <div
    class="ui-modal-footer-default"
    :class="TYPE_CLASSES[type]"
    data-test="modal-footer-default"
  >
    <UiButton
      v-if="hasSecondary"
      class="ui-modal-footer-default__button ui-modal-footer-default__button--secondary"
      variant="secondary"
      size="md"
      full-width
      :disabled="secondaryDisabled"
      :loading="secondaryLoading"
      data-test="modal-footer-default__secondary"
      @click="emit('secondary', $event)"
    >
      {{ secondaryLabel }}
    </UiButton>

    <UiButton
      class="ui-modal-footer-default__button ui-modal-footer-default__button--primary"
      variant="primary"
      size="md"
      full-width
      :disabled="primaryDisabled"
      :loading="primaryLoading"
      data-test="modal-footer-default__primary"
      @click="emit('primary', $event)"
    >
      {{ primaryLabel }}
    </UiButton>
  </div>
</template>
