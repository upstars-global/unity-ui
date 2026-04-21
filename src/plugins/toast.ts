import type { UiToastClosePayload, UiToastEventBus, UiToastItem } from '../components/notifications/toast/types'

let bus: UiToastEventBus | null = null

const toast = {
  init($bus: UiToastEventBus) {
    bus = $bus
  },

  show(options: UiToastItem) {
    bus?.$emit('toast.show', options)
  },

  close(options: UiToastClosePayload) {
    bus?.$emit('toast.close', options)
  },
}

export default toast
