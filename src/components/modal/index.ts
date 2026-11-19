export { default as ModalController } from './ModalController.vue'
export { default as ModalCommonSlot } from './ModalCommonSlot.vue'
export { useModalController } from './useModalController'
export { default as UiModalHeaderDefault } from './headers/default/UiModalHeaderDefault.vue'
export { default as UiModalFooterDefault } from './footers/default/UiModalFooterDefault.vue'
export { MODAL_FOOTER_DEFAULT_TYPES } from './footers/default/types'

export type {
  IModalOptions,
  ModalCloseOptions,
  UiModalClosePayload,
  UiModalEventBus,
} from './types'
export type {
  ModalFooterDefaultType,
  UiModalFooterDefaultEmits,
  UiModalFooterDefaultProps,
} from './footers/default/types'
export type {
  UiModalHeaderDefaultEmits,
  UiModalHeaderDefaultProps,
  UiModalHeaderDefaultSlots,
} from './headers/default/types'
