<script setup lang="ts">
import UiButton from '../../components/button/UiButton.vue'
import ModalCommonSlot from '../../components/modal/ModalCommonSlot.vue'
import modalApi from '../../plugins/modal'
import type { IModalOptions, ModalCloseOptions } from '../../components/modal/types'

const props = defineProps<{
  modal: IModalOptions
  title: string
  description: string
  closeHandler?: (options?: ModalCloseOptions) => void
}>()

function handleClickCloseButton() {
  modalApi.close({
    name: props.modal.name,
    clickOnCloseButton: true,
  })
}

function handleSecondaryClose() {
  props.modal.closeHandler?.({ clickOnCloseButton: true })
}
</script>

<template>
  <ModalCommonSlot
    :modal="modal"
    :title="title"
    @click-close-button="handleClickCloseButton"
  >
    <div >
      <p class="mb-6 text-sm leading-6 text-fg-secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </p>
    </div>
    <template #bottom-side-under-scroll>
      <UiButton
          variant="primary"
          full-width
      >
        Primary action
      </UiButton>
      <UiButton
          variant="secondary"
          full-width
          @click="handleSecondaryClose"
      >
        Close modal
      </UiButton>
    </template>
  </ModalCommonSlot>
</template>
