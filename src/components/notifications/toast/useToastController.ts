import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useEventBus } from '../../../composables/useEventBus.ts'
import type { UiToastClosePayload, UiToastItem } from './types.ts'

const DEFAULT_TOAST_DURATION = 10000

export function useToastController() {
  const bus = useEventBus()
  const list = ref<UiToastItem[]>([])
  const timers = new Map<number, ReturnType<typeof setTimeout>>()

  function clearTimer(id?: UiToastItem['id']) {
    if (typeof id !== 'number') {
      return
    }

    const timer = timers.get(id)

    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }
  }

  function remove(id?: UiToastItem['id']) {
    clearTimer(id)
    list.value = list.value.filter((item) => item.id !== id)
  }

  function setTimer(toast: UiToastItem) {
    if (typeof toast.id !== 'number') {
      return
    }

    const duration = toast.time === 0 ? 0 : (toast.time ?? DEFAULT_TOAST_DURATION)

    clearTimer(toast.id)

    if (duration > 0) {
      const timer = setTimeout(() => {
        remove(toast.id)
      }, duration)

      timers.set(toast.id, timer)
    }
  }

  function show(toast: UiToastItem) {
    const nextToast: UiToastItem = {
      ...toast,
      id: toast.id ?? Math.random(),
    }

    setTimer(nextToast)
    list.value.push(nextToast)
  }

  function close(toast: UiToastClosePayload) {
    remove(toast.id)
  }

  onMounted(() => {
    bus?.$on('toast.show', show)
    bus?.$on('toast.close', close)
  })

  onBeforeUnmount(() => {
    bus?.$off('toast.show', show)
    bus?.$off('toast.close', close)

    timers.forEach((timer) => {
      clearTimeout(timer)
    })
    timers.clear()
  })

  return {
    list,
    close,
    show,
    remove,
  }
}
