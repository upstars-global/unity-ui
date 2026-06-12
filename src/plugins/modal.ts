import type { IModalOptions, UiModalClosePayload } from '../components/modal/types'
import type { UiEventBus } from '../composables/useEventBus'

let bus: UiEventBus | null = null

const modal = {
  init($bus: UiEventBus) {
    bus = $bus
  },

  show(options: IModalOptions) {
    bus?.$emit('modal.show', options)
  },

  close(options: UiModalClosePayload = {}) {
    bus?.$emit('modal.close', options)
  },
}

export default modal
