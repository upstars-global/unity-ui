import type { IModalOptions, UiModalClosePayload } from '../components/modal/types'
import type { UiEventBus } from '../composables/useEventBus'

let bus: UiEventBus | null = null

const modal = {
  init($bus: UiEventBus) {
    bus = $bus
  },

  show<TProps extends object = Record<string, unknown>>(options: IModalOptions<TProps>) {
    bus?.$emit('modal.show', options as IModalOptions)
  },

  close(options: UiModalClosePayload = {}) {
    bus?.$emit('modal.close', options)
  },
}

export default modal
