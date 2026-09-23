import { ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const lifecycle = vi.hoisted(() => ({
  mounted: undefined as undefined | (() => void),
  unmount: undefined as undefined | (() => void),
}))

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')

  return {
    ...actual,
    onMounted: (callback: () => void) => { lifecycle.mounted = callback },
    onBeforeUnmount: (callback: () => void) => { lifecycle.unmount = callback },
  }
})

import { useNotificationCountdown } from '../../src/components/notifications/smcNotification/useNotificationCountdown'

describe('SMCNotification countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    lifecycle.unmount?.()
    lifecycle.mounted = undefined
    lifecycle.unmount = undefined
    vi.useRealTimers()
  })

  it('starts immediately and dismisses after the seven-second timer and active pause', () => {
    const onDismiss = vi.fn()
    const { phase } = useNotificationCountdown(ref(7), onDismiss)

    lifecycle.mounted?.()
    expect(phase.value).toBe('idle')

    vi.advanceTimersByTime(0)
    expect(phase.value).toBe('running')

    vi.advanceTimersByTime(6999)
    expect(phase.value).toBe('running')
    expect(onDismiss).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(phase.value).toBe('active')
    expect(onDismiss).not.toHaveBeenCalled()

    vi.advanceTimersByTime(499)
    expect(onDismiss).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('uses the supplied duration in seconds, including fractional values', () => {
    const onDismiss = vi.fn()
    const { phase } = useNotificationCountdown(ref(1.2), onDismiss)

    lifecycle.mounted?.()
    vi.advanceTimersByTime(0)
    vi.advanceTimersByTime(1199)
    expect(phase.value).toBe('running')
    expect(onDismiss).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(phase.value).toBe('active')

    vi.advanceTimersByTime(500)
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('starts dismissal on click and prevents duplicate expiry', () => {
    const onDismiss = vi.fn()
    const { phase, dismiss } = useNotificationCountdown(ref(1), onDismiss)

    lifecycle.mounted?.()
    vi.advanceTimersByTime(0)
    vi.advanceTimersByTime(500)
    dismiss()
    dismiss()
    expect(phase.value).toBe('active')
    expect(onDismiss).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)
    expect(onDismiss).toHaveBeenCalledOnce()
    vi.advanceTimersByTime(2000)
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('cancels the countdown when unmounted', () => {
    const onDismiss = vi.fn()
    useNotificationCountdown(ref(1), onDismiss)

    lifecycle.mounted?.()
    lifecycle.unmount?.()
    vi.advanceTimersByTime(2000)
    expect(onDismiss).not.toHaveBeenCalled()
  })
})
