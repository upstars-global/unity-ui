import type { IModalOptions, UiModalClosePayload } from '../src/components/modal/types'
import type { UiToastClosePayload, UiToastItem } from '../src/components/notifications/toast/types'
import type { UiEventBus } from '../src/composables/useEventBus'

export function createStorybookEventBus(): UiEventBus {
  const toastShowHandlers = new Set<(toast: UiToastItem) => void>()
  const toastCloseHandlers = new Set<(toast: UiToastClosePayload) => void>()
  const modalShowHandlers = new Set<(modal: IModalOptions) => void>()
  const modalCloseHandlers = new Set<(payload: UiModalClosePayload) => void>()

  return {
    $on(event, handler) {
      if (event === 'toast.show') {
        toastShowHandlers.add(handler)
        return
      }

      if (event === 'toast.close') {
        toastCloseHandlers.add(handler)
        return
      }

      if (event === 'modal.show') {
        modalShowHandlers.add(handler)
        return
      }

      modalCloseHandlers.add(handler)
    },
    $off(event, handler) {
      if (event === 'toast.show') {
        toastShowHandlers.delete(handler)
        return
      }

      if (event === 'toast.close') {
        toastCloseHandlers.delete(handler)
        return
      }

      if (event === 'modal.show') {
        modalShowHandlers.delete(handler)
        return
      }

      modalCloseHandlers.delete(handler)
    },
    $emit(event, payload) {
      if (event === 'toast.show') {
        toastShowHandlers.forEach((handler) => handler(payload))
        return
      }

      if (event === 'toast.close') {
        toastCloseHandlers.forEach((handler) => handler(payload))
        return
      }

      if (event === 'modal.show') {
        modalShowHandlers.forEach((handler) => handler(payload))
        return
      }

      modalCloseHandlers.forEach((handler) => handler(payload))
    },
  }
}
