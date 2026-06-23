<template>
    <div
        class="modal-content"
        :class="modalContentClasses"
        data-test="modal-content"
    >
      <slot
          name="header"
          v-if="!modal.hideHeaderToolbar"
      >
        <div :class="theme?.slots.modalHeader">
          <div :class="theme.slots.modalHeaderIcons">
            <slot name="header-left" />
          </div>
          <div :class="theme.slots.modalHeaderTitle">
            <p>{{modal.title}}</p>
          </div>
          <div :class="theme.slots.modalHeaderIcons">
            <slot
                v-if="!modal.hideCloseButton"
                name="header-right"
            >
              <UiIcon
                  class="cursor-pointer"
                  name="line_close"
                  @click="close"
              />
            </slot>
          </div>
        </div>
      </slot>
      <div
          class="modal-content__body"
          data-test="modal-common__body"
      >
        <slot />
      </div>
      <div
          v-if="modal.showFooter"
          :class="modalBottomActionClasses"
          data-test="modal-content__under-scroll"
      >
        <slot name="bottom-side-under-scroll" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from "../icon/UiIcon.vue";
import { useAppConfig } from '../../composables/useAppConfig'
import type {ModalUiOptimized} from "./theme.ts";
import { MODAL_SIZES, type IModalOptions } from './types'

defineOptions({
    name: 'ModalCommonSlot',
})

const props = defineProps<{
  modal: IModalOptions
}>()

const emits = defineEmits<{
  (event: 'clickCloseButton'): void
}>()

const appConfig = useAppConfig()
const theme: ModalUiOptimized = appConfig.components?.modal;
const normalizedSize = computed(() => {
    return props.modal?.size && MODAL_SIZES.includes(props.modal.size) ? props.modal.size : 's'
})

const modalContentClasses = computed(() => {
  return [
    theme?.slots.modalContainer,
    props.modal.fullScreen ? theme?.sizes.fullScreen : theme?.sizes?.[normalizedSize.value],
    theme?.slots.modalContent,
  ]
})

const modalBottomActionClasses = computed(() => {
  return [
    theme.slots.modalBottomActions,
    normalizedSize.value === 's' ?
        'flex-col' :
        'flex-col md:flex-row'
  ]
})

function close() {
  emits('clickCloseButton')
}

</script>
