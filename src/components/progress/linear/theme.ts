import {tokenClass} from "../../theme-utils.ts";

const linearProgress = {
  base: [
      'ui-progress-bar',
      'flex',
      'flex-col',
      'text-caption',
      'gap-2'
  ],
  full: [
    'h-2',
    'w-full',
    tokenClass('--component-progress-bg', 'bg'),
    tokenClass('--radius-progress', 'rounded'),
    'overflow-hidden'
  ],
  progress: [
    'bg-gradient-personal',
    'h-2',
    tokenClass('--radius-progress', 'rounded'),
  ]
} as const

export type LinearProgressUiOptimized = typeof linearProgress

export default linearProgress
