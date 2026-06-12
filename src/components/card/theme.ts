import { tokenClass } from '../theme-utils'
import type { CardVariant } from './types'

type CardClassList = readonly string[]

const CARD_BASE: CardClassList = [
  'relative',
  'flex',
  'flex-col',
  'items-start',
  'overflow-hidden',
  tokenClass('--radius-card-m', 'rounded'),
]
const CARD_CONTENT_BASE: CardClassList = ['w-full']
const CARD_BORDER_BASE: CardClassList = ['border']

function buildSurfaceVariant(backgroundToken: string, hasBorder = false): CardClassList {
  return [
    ...(hasBorder ? CARD_BORDER_BASE : []),
    ...(hasBorder ? [tokenClass('--component-card-alt-bordercolor', 'border')] : []),
    tokenClass(backgroundToken, 'bg'),
  ]
}

const card = {
  base: CARD_BASE,
  variant: {
    default: buildSurfaceVariant('--component-card-bg'),
    outlined: buildSurfaceVariant('--component-card-bg', true),
    alt: buildSurfaceVariant('--component-card-alt-bg', true),
    gradient: ['bg-gradient-card'],
  } satisfies Record<CardVariant, CardClassList>,
  slots: {
    content: CARD_CONTENT_BASE,
  },
} as const

export type CardUiOptimized = typeof card

export default card