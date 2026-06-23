import {tokenClass} from "../../theme-utils.ts";

const toast = {
  base: [
    'fixed z-9999 w-84 max-w-full-mob',
    tokenClass('--spacing-16', 'top'),
    tokenClass('--spacing-16', 'right')
  ],
  slots: {
    list: [
      'flex flex-col',
      tokenClass('--spacing-12', 'gap')
    ],
    item: [
      'flex',
      tokenClass('--spacing-16', 'p'),
      tokenClass('--spacing-8', 'gap'),
    ],
  },
  transitionGroup: {
    enterActiveClass: 'transition-opacity duration-500',
    enterFromClass: 'opacity-0',
    leaveActiveClass: 'transition-opacity duration-500',
    leaveToClass: 'opacity-0',
  },
} as const

export type ToastUiOptimized = typeof toast

export default toast
