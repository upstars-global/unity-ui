import { tokenClass } from '../theme-utils'

const FAQ_BASE: string[] = [
  'ui-faq-item',
  'flex',
  'flex-col',
  'overflow-hidden',
  'border',
  'transition-colors',
  tokenClass('--radius-accordion', 'rounded'),
  tokenClass('--component-accordion-fg-primary', 'text'),
  tokenClass('--spacing-16', 'px'),
  tokenClass('--spacing-12', 'py'),
  tokenClass('--spacing-8', 'py'),
]

const FAQ_BASE_OPENED: string[] = [
  tokenClass('--component-accordion-faq-opened-bordercolor', 'border'),
  tokenClass('--component-accordion-faq-opened-bg', 'bg'),
]

const FAQ_BASE_DEFAULT: string[] = [
  tokenClass('--component-accordion-faq-default-bordercolor', 'border'),
  tokenClass('--component-accordion-faq-default-bg', 'bg'),
]

const faq = {
  base: FAQ_BASE,
  slots: {
    iconOpened: ['rotate-180'],
  },
  states: {
    opened: FAQ_BASE_OPENED,
    default: FAQ_BASE_DEFAULT
  }
} as const

export type FaqUiOptimized = typeof faq

export default faq
