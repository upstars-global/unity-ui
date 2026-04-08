import { tokenClass } from '../theme-utils'

type AccordionClassList = readonly string[]

const ACCORDION_BASE: AccordionClassList = [
  'ui-accordion',
  'flex',
  'flex-col',
  'overflow-hidden',
  tokenClass('--radius-accordion', 'rounded'),
  tokenClass('--component-accordion-bordercolor', 'border'),
  tokenClass('--component-accordion-bg', 'bg'),
  tokenClass('--component-accordion-fg-primary', 'text'),
  'border',

  'px-4 py-2'
]

const accordion = {
  base: ACCORDION_BASE,
  slots: {
    iconOpened: ['rotate-180'],
  },
} as const

export type AccordionUiOptimized = typeof accordion

export default accordion
