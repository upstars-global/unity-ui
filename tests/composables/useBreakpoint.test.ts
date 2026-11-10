import { beforeEach, describe, expect, it, vi } from 'vitest'

const lifecycleMocks = vi.hoisted(() => ({
  mountedCallbacks: [] as Array<() => void>,
  beforeUnmountCallbacks: [] as Array<() => void>,
}))

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')

  return {
    ...actual,
    onMounted: (callback: () => void) => lifecycleMocks.mountedCallbacks.push(callback),
    onBeforeUnmount: (callback: () => void) => lifecycleMocks.beforeUnmountCallbacks.push(callback),
  }
})

import { useBreakpoint } from '../../src/composables/useBreakpoint'

describe('useBreakpoint', () => {
  let width: number
  let resizeHandler: (() => void) | undefined
  const addEventListener = vi.fn((event: string, callback: () => void) => {
    if (event === 'resize') resizeHandler = callback
  })
  const removeEventListener = vi.fn()

  beforeEach(() => {
    lifecycleMocks.mountedCallbacks.length = 0
    lifecycleMocks.beforeUnmountCallbacks.length = 0
    resizeHandler = undefined
    addEventListener.mockClear()
    removeEventListener.mockClear()
    width = 800
    vi.stubGlobal('window', {
      get innerWidth() { return width },
      addEventListener,
      removeEventListener,
    })
  })

  it('detects the active breakpoint and checks exact equality', () => {
    const { currentBreakpoint, isBreakpoint } = useBreakpoint('md')

    expect(currentBreakpoint.value).toBe('md')
    expect(isBreakpoint.value).toBe(true)
  })

  it('updates the current breakpoint and comparison when the window is resized', () => {
    const { currentBreakpoint, isBreakpoint } = useBreakpoint('lg')

    expect(currentBreakpoint.value).toBe('md')
    expect(isBreakpoint.value).toBe(false)

    lifecycleMocks.mountedCallbacks[0]()
    expect(addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))

    width = 1100
    resizeHandler?.()

    expect(currentBreakpoint.value).toBe('lg')
    expect(isBreakpoint.value).toBe(true)

    lifecycleMocks.beforeUnmountCallbacks[0]()
    expect(removeEventListener).toHaveBeenCalledWith('resize', resizeHandler)
  })

  it('returns null below the smallest breakpoint', () => {
    width = 300

    const { currentBreakpoint, isBreakpoint } = useBreakpoint('xxs')

    expect(currentBreakpoint.value).toBeNull()
    expect(isBreakpoint.value).toBe(false)
  })

  it('compares the viewport width with the requested breakpoint', () => {
    width = 1100

    const comparison = useBreakpoint('lg')

    expect(comparison.isGreaterThanBreakpoint.value).toBe(true)
    expect(comparison.isLessThanBreakpoint.value).toBe(false)
    expect(comparison.isGreaterOrEqualBreakpoint.value).toBe(true)
    expect(comparison.isLessOrEqualBreakpoint.value).toBe(false)

    width = 1088
    lifecycleMocks.mountedCallbacks.at(-1)?.()
    resizeHandler?.()

    expect(comparison.isGreaterThanBreakpoint.value).toBe(false)
    expect(comparison.isLessThanBreakpoint.value).toBe(false)
    expect(comparison.isGreaterOrEqualBreakpoint.value).toBe(true)
    expect(comparison.isLessOrEqualBreakpoint.value).toBe(true)

    width = 1087
    resizeHandler?.()

    expect(comparison.isGreaterThanBreakpoint.value).toBe(false)
    expect(comparison.isLessThanBreakpoint.value).toBe(true)
    expect(comparison.isGreaterOrEqualBreakpoint.value).toBe(false)
    expect(comparison.isLessOrEqualBreakpoint.value).toBe(true)
  })
})
