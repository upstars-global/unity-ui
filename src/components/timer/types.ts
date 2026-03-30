import type { Dayjs } from 'dayjs'

export const TIMER_VARIANTS = ['filled', 'ghost'] as const
export const TIMER_PHASES = ['start', 'finish', 'threshold', 'over'] as const

export type TimerVariant = (typeof TIMER_VARIANTS)[number]
export type TimerPhase = (typeof TIMER_PHASES)[number]
export type TimerUnit = 'd' | 'h' | 'm' | 's'

export interface UiTimerLabels {
  d?: string
  h?: string
  m?: string
  s?: string
}

export interface UiTimerConfigValue {
  label: string
  value: Dayjs
}

export interface UiTimerExpiredConfig {
  label: string
}

export interface UiTimerConfig {
  startAt?: UiTimerConfigValue
  finishAt: UiTimerConfigValue
  thresholdAt?: UiTimerConfigValue
  expired: UiTimerExpiredConfig
}

export interface UiTimerProps {
  config: UiTimerConfig
  labels?: UiTimerLabels
  variant?: TimerVariant
}
