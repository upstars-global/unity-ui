import { tokenClass } from '../theme-utils'

type TooltipClassList = readonly string[]

const TOOLTIP_BASE: TooltipClassList = ['relative']
const TOOLTIP_TRIGGER_BASE: TooltipClassList = ['inline-flex']
const TOOLTIP_CONTENT_BG: string = tokenClass('--component-tooltip-bg', 'bg');
const TOOLTIP_CONTENT_BASE: TooltipClassList = [
  'text-caption',
  'font-medium',
  'min-w-52',
  tokenClass('--spacing-8', 'p'),
  tokenClass('--radius-tooltip', 'rounded'),
  TOOLTIP_CONTENT_BG,
  tokenClass('--component-tooltip-fg', 'text'),
]

const tooltip = {
  base: TOOLTIP_BASE,
  slots: {
    trigger: TOOLTIP_TRIGGER_BASE,
    content: TOOLTIP_CONTENT_BASE,
    content_arrow: TOOLTIP_CONTENT_BG,
  },
} as const

export type TooltipUiOptimized = typeof tooltip

export default tooltip
