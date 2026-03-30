import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { UiTimerConfig } from '../../src/components/timer/types'

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')

  return {
    ...actual,
    onMounted: (callback: () => void) => callback(),
    onBeforeUnmount: () => undefined,
  }
})

import { useTimer } from '../../src/composables/useTimer'

dayjs.extend(utc)

const NOW = '2026-03-30T12:00:00Z'

function createTimerConfig(config: UiTimerConfig): UiTimerConfig {
  return config
}

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(NOW))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('uses start phase before startAt', () => {
    const config = ref(createTimerConfig({
      startAt: {
        label: 'Starts in:',
        value: dayjs.utc(NOW).add(1, 'hour'),
      },
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(5, 'hour'),
      },
      thresholdAt: {
        label: 'Last chance:',
        value: dayjs.utc(NOW).add(2, 'hour'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('start')
    expect(timer.leadingLabel.value).toBe('Starts in:')
    expect(timer.timerText.value).toBe('0d 01h:00m:00s')
  })

  it('uses finish phase after startAt and before thresholdAt', () => {
    const config = ref(createTimerConfig({
      startAt: {
        label: 'Starts in:',
        value: dayjs.utc(NOW).subtract(1, 'hour'),
      },
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(5, 'hour'),
      },
      thresholdAt: {
        label: 'Last chance:',
        value: dayjs.utc(NOW).add(2, 'hour'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('finish')
    expect(timer.leadingLabel.value).toBe('Finishes in:')
    expect(timer.timerText.value).toBe('0d 05h:00m:00s')
  })

  it('uses threshold phase after thresholdAt and before finishAt', () => {
    const config = ref(createTimerConfig({
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(30, 'minute'),
      },
      thresholdAt: {
        label: 'Last chance:',
        value: dayjs.utc(NOW).subtract(5, 'minute'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('threshold')
    expect(timer.leadingLabel.value).toBe('Last chance:')
    expect(timer.timerText.value).toBe('0d 00h:30m:00s')
  })

  it('uses finish phase when startAt is omitted', () => {
    const config = ref(createTimerConfig({
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(90, 'minute'),
      },
      thresholdAt: {
        label: 'Last chance:',
        value: dayjs.utc(NOW).add(30, 'minute'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('finish')
    expect(timer.leadingLabel.value).toBe('Finishes in:')
    expect(timer.timerText.value).toBe('0d 01h:30m:00s')
  })

  it('uses finish phase when thresholdAt is omitted', () => {
    const config = ref(createTimerConfig({
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(30, 'minute'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('finish')
    expect(timer.leadingLabel.value).toBe('Finishes in:')
    expect(timer.timerText.value).toBe('0d 00h:30m:00s')
  })

  it('ignores invalid thresholdAt values', () => {
    const config = ref(createTimerConfig({
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(30, 'minute'),
      },
      thresholdAt: {
        label: 'Last chance:',
        value: dayjs.utc('invalid'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('finish')
    expect(timer.leadingLabel.value).toBe('Finishes in:')
  })

  it('uses expired label after finishAt', () => {
    const config = ref(createTimerConfig({
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).subtract(1, 'minute'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('over')
    expect(timer.leadingLabel.value).toBe('')
    expect(timer.timerText.value).toBe('Event is over')
    expect(timer.isExpired.value).toBe(true)
  })

  it('updates phase as time moves from finish to threshold to over', () => {
    const config = ref(createTimerConfig({
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(3, 'second'),
      },
      thresholdAt: {
        label: 'Last chance:',
        value: dayjs.utc(NOW).add(2, 'second'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({ config })

    expect(timer.resolvedState.value).toBe('finish')
    expect(timer.timerText.value).toBe('0d 00h:00m:03s')

    vi.advanceTimersByTime(2000)

    expect(timer.resolvedState.value).toBe('threshold')
    expect(timer.leadingLabel.value).toBe('Last chance:')
    expect(timer.timerText.value).toBe('0d 00h:00m:01s')

    vi.advanceTimersByTime(3000)

    expect(timer.resolvedState.value).toBe('over')
    expect(timer.timerText.value).toBe('Event is over')
  })

  it('uses custom unit labels when provided', () => {
    const config = ref(createTimerConfig({
      finishAt: {
        label: 'Finishes in:',
        value: dayjs.utc(NOW).add(1, 'hour').add(2, 'minute').add(3, 'second'),
      },
      expired: {
        label: 'Event is over',
      },
    }))

    const timer = useTimer({
      config,
      labels: {
        d: ' days',
        h: ' hrs',
        m: ' min',
        s: ' sec',
      },
    })

    expect(timer.timerText.value).toBe('0 days 01 hrs:02 min:03 sec')
  })
})
