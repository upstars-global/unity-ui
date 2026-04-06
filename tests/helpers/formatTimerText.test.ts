import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { describe, expect, it } from 'vitest'
import { formatTimerText } from '../../src/helpers/formatTimerText'

dayjs.extend(duration)

describe('formatTimerText', () => {
  it('formats duration with zero-padded time units', () => {
    const result = formatTimerText(
      dayjs.duration({
        days: 1,
        hours: 2,
        minutes: 3,
        seconds: 4,
      }),
      {
        d: 'd',
        h: 'h',
        m: 'm',
        s: 's',
      },
    )

    expect(result).toBe('1d 02h:03m:04s')
  })

  it('uses provided labels for all units', () => {
    const result = formatTimerText(
      dayjs.duration({
        days: 12,
        hours: 13,
        minutes: 14,
        seconds: 15,
      }),
      {
        d: ' days',
        h: ' hours',
        m: ' min',
        s: ' sec',
      },
    )

    expect(result).toBe('12 days 13 hours:14 min:15 sec')
  })

  it('formats zero duration consistently', () => {
    const result = formatTimerText(
      dayjs.duration(0),
      {
        d: 'd',
        h: 'h',
        m: 'm',
        s: 's',
      },
    )

    expect(result).toBe('0d 00h:00m:00s')
  })
})
