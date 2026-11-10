import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

const COMPLETE_DELAY_MS = 500

export function useNotificationCountdown(duration: Ref<number>, onDismiss: () => void) {
  const phase = ref<'idle' | 'running' | 'active'>('idle')
  let startTimer: ReturnType<typeof setTimeout> | undefined
  let durationTimer: ReturnType<typeof setTimeout> | undefined
  let completeTimer: ReturnType<typeof setTimeout> | undefined
  let stopWatching: (() => void) | undefined

  function clearTimers() {
    clearTimeout(startTimer)
    clearTimeout(durationTimer)
    clearTimeout(completeTimer)
  }

  function dismiss() {
    if (phase.value === 'active') return

    clearTimeout(startTimer)
    clearTimeout(durationTimer)
    phase.value = 'active'
    completeTimer = setTimeout(onDismiss, COMPLETE_DELAY_MS)
  }

  function start() {
    clearTimers()
    phase.value = 'idle'
    // Let the idle state paint before starting the CSS progress animation.
    startTimer = setTimeout(() => {
      phase.value = 'running'
      durationTimer = setTimeout(dismiss, Math.max(0, duration.value * 1000))
    }, 0)
  }

  onMounted(() => {
    start()
    stopWatching = watch(duration, start)
  })

  onBeforeUnmount(() => {
    stopWatching?.()
    clearTimers()
  })

  return { phase, dismiss }
}
