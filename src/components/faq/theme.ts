import { tokenClass } from '../theme-utils'

const FAQ_BASE: string[] = [
  'ui-faq-item',
  'flex',
  'flex-col',
  'overflow-hidden',
  tokenClass('--radius-accordion', 'rounded'),
  tokenClass('--component-accordion-faq-bordercolor', 'border'),
  tokenClass('--component-accordion-faq-bg', 'bg'),
  tokenClass('--component-accordion-fg-primary', 'text'),
  'border',
  'px-4 py-2'
]

const faq = {
  base: FAQ_BASE,
  slots: {
    iconOpened: ['rotate-180'],
  },
} as const

export type FaqUiOptimized = typeof faq

export default faq
