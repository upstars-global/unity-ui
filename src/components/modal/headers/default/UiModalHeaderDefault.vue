<script setup lang="ts">
import UiIcon from '../../../icon/UiIcon.vue'
import modalApi from '../../../../plugins/modal'
import type {
  UiModalHeaderDefaultEmits,
  UiModalHeaderDefaultProps,
  UiModalHeaderDefaultSlots,
} from './types'

defineOptions({
  name: 'UiModalHeaderDefault',
})

const props = withDefaults(defineProps<UiModalHeaderDefaultProps>(), {
  title: '',
  hideCloseButton: false,
  modalName: undefined,
})

defineSlots<UiModalHeaderDefaultSlots>()

const emit = defineEmits<UiModalHeaderDefaultEmits>()

function onClose(event: MouseEvent) {
  modalApi.close({ name: props.modalName, clickOnCloseButton: true })
  emit('close', event)
}
</script>

<template>
  <div
    class="ui-modal-header-default"
    data-test="modal-header-default"
  >
    <div class="ui-modal-header-default__side">
      <slot name="left" />
    </div>

    <div class="ui-modal-header-default__title">
      <slot name="title">
        <p class="ui-modal-header-default__title-text">{{ title }}</p>
      </slot>
    </div>

    <div class="ui-modal-header-default__side">
      <slot
        v-if="!hideCloseButton"
        name="right"
      >
        <button
          type="button"
          class="ui-modal-header-default__close"
          aria-label="Close"
          data-test="modal-header-default__close"
          @click="onClose"
        >
          <UiIcon name="line_close" />
        </button>
      </slot>
    </div>
  </div>
</template>
