import { tokenClass } from '../theme-utils'
import type { TimerPhase, TimerVariant } from './types'

type TimerClassList = readonly string[]

type TimerVariantConfig = {
  container: TimerClassList
  text: TimerClassList
}

const TIMER_BASE: TimerClassList = [
  'inline-flex',
  'items-center',
  'justify-center',
  'overflow-hidden',
  'shrink-0',
  'whitespace-nowrap',
  tokenClass('--spacing-4', 'gap'),
  tokenClass('--spacing-8', 'p')
]

const TIMER_TEXT_BASE: TimerClassList = [
  'text-caption',
  'font-medium',
  'tabular-nums'
]

const timer = {
  base: TIMER_BASE,
  size: {
    default: {
      container: [
        tokenClass('--radius-badge', 'rounded')
      ],
      dot: ['size-8', 'rounded-full', 'shrink-0'],
      text: TIMER_TEXT_BASE,
    },
  },
  variant: {
    filled: {
      container: [tokenClass('--component-badge-timer-bg', 'bg')],
      label: [tokenClass('--component-badge-timer-fg-secondary', 'text')],
      text: [tokenClass('--component-badge-timer-fg-primary', 'text')],
    },
    ghost: {
      container: [],
      label: [tokenClass('--component-badge-timer-fg-secondary', 'text')],
      text: [tokenClass('--component-badge-timer-fg-primary', 'text')],
    },
  } satisfies Record<TimerVariant, TimerVariantConfig>,
  state: {
    start: [tokenClass('--component-badge-timer-dot-start', 'bg')],
    finish: [tokenClass('--component-badge-timer-dot-finish', 'bg')],
    over: [tokenClass('--component-badge-timer-dot-over', 'bg')],
  } satisfies Record<TimerPhase, TimerClassList>,
  slots: {
    text: TIMER_TEXT_BASE,
  },
} as const

export type TimerUiOptimized = typeof timer

export default timer
