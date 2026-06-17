import { tokenClass } from '../theme-utils'

type AccordionClassList = readonly string[]

const ACCORDION_BASE: AccordionClassList = [
  'ui-accordion',
  'flex',
  'flex-col',
  'overflow-hidden',
  'border',
  'transition-colors',
  tokenClass('--radius-accordion', 'rounded'),
  tokenClass('--component-accordion-fg-primary', 'text'),
  tokenClass('--spacing-16', 'px'),
  tokenClass('--spacing-12', 'py'),
]
const ACCORDION_BASE_OPENED = [
  tokenClass('--component-accordion-opened-bg', 'bg'),
  tokenClass('--component-accordion-opened-bordercolor', 'border'),
]

const ACCORDION_BASE_DEFAULT = [
  tokenClass('--component-accordion-default-bordercolor', 'border'),
  tokenClass('--component-accordion-default-bg', 'bg'),
]

const accordion = {
  base: ACCORDION_BASE,
  slots: {
    iconOpened: ['rotate-180'],
  },
  states: {
    opened: ACCORDION_BASE_OPENED,
    default: ACCORDION_BASE_DEFAULT
  }
} as const

export type AccordionUiOptimized = typeof accordion

export default accordion
