import type duration from 'dayjs/plugin/duration'
import type { UiTimerLabels } from '../components/timer/types'

function formatTwoDigits(value: number) {
  return value < 10 ? `0${value}` : String(value)
}

export function formatTimerText(
  durationValue: duration.Duration,
  labels: Required<UiTimerLabels>,
) {
  const days = Math.floor(durationValue.asDays())
  const hours = formatTwoDigits(durationValue.hours())
  const minutes = formatTwoDigits(durationValue.minutes())
  const seconds = formatTwoDigits(durationValue.seconds())

  return `${days}${labels.d} ${hours}${labels.h}:${minutes}${labels.m}:${seconds}${labels.s}`
}
