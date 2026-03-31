import { tokenClass } from '../theme-utils'

type TooltipClassList = readonly string[]

const TOOLTIP_BASE: TooltipClassList = ['relative']
const TOOLTIP_TRIGGER_BASE: TooltipClassList = ['inline-flex']
const TOOLTIP_CONTENT_BASE: TooltipClassList = [
  'p-2',
  'text-caption',
  'font-medium',
  'min-w-52',
  tokenClass('--radius-tooltip', 'rounded'),
  tokenClass('--component-tooltip-bg', 'bg'),
  tokenClass('--component-tooltip-fg', 'text'),
]
const TOOLTIP_ARROW: TooltipClassList = [
  'absolute',
  'rotate-45',
  'w-2 h-2',
  tokenClass('--component-tooltip-bg', 'bg'),
]

const tooltip = {
  base: TOOLTIP_BASE,
  slots: {
    trigger: TOOLTIP_TRIGGER_BASE,
    content: TOOLTIP_CONTENT_BASE,
    arrow: TOOLTIP_ARROW,
  },
} as const

export type TooltipUiOptimized = typeof tooltip

export default tooltip
