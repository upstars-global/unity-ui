import { tokenClass } from '../theme-utils'

type TabsClassList = readonly string[]

const TAB_LABEL_BASE: TabsClassList = [
  'text-body-sm',
  'font-bold',
  'uppercase',
  'whitespace-nowrap',
  'text-center',
]

const tabs = {
  base: [
    'flex',
    'items-center',
    'overflow-x-auto',
    'min-h-px',
    'min-w-px',
    tokenClass('--spacing-4', 'gap'),
  ] as TabsClassList,
  item: {
    base: [
      'flex',
      'shrink-0',
      'items-center',
      'justify-center',
      'transition-colors',
      tokenClass('--radius-tab', 'rounded'),
      tokenClass('--spacing-16', 'px'),
      tokenClass('--spacing-8', 'py'),
      tokenClass('--spacing-8', 'gap'),
    ] as TabsClassList,
    default: [
      tokenClass('--component-tab-default-fg', 'text'),
    ] as TabsClassList,
    hover: [
      tokenClass('--component-tab-hover-bg', 'hover:bg'),
      tokenClass('--component-tab-hover-fg', 'hover:text'),
    ] as TabsClassList,
    selected: [
      tokenClass('--component-tab-selected-bg', 'bg'),
      tokenClass('--component-tab-selected-fg', 'text'),
    ] as TabsClassList,
    disabled: [
      'pointer-events-none',
      'opacity-45',
    ] as TabsClassList,
  },
  slots: {
    label: TAB_LABEL_BASE,
    accent: [
      'size-8',
      'shrink-0',
      'rounded-full',
      tokenClass('--fg-status-error', 'bg'),
    ] as TabsClassList,
  },
} as const

export type TabsUiOptimized = typeof tabs

export default tabs
