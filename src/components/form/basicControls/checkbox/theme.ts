import {tokenClass} from "../../../theme-utils.ts";

const checkbox = {
  base: [
    'ui-checkbox',
    'group',
    'relative',
    'flex',
    'flex-col',
    'gap-4',
    'data-[disabled=true]:opacity-45',
  ],
  slots: {
    field: [
      'flex',
      'w-full',
      'items-start',
      'gap-8',
      'cursor-pointer',
      'select-none',
      'data-[disabled=true]:cursor-not-allowed',
    ],
    input: [
      'peer',
      'sr-only',
    ],
    control: [
      'relative',
      'flex',
      'size-6',
      'shrink-0',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'transition-all',
      'duration-150',
      'border-2',
      tokenClass('--component-control-default','border'),
      tokenClass('--component-control-selected','peer-checked:border'),
      tokenClass('--component-control-selected','peer-checked:bg'),
      tokenClass('--spacing-2','m'),
      "rounded-2",
      'peer-focus-visible:outline-2',
      'peer-focus-visible:outline-offset-2',
      'peer-focus-visible:outline-[var(--component-control-selected)]',
    ],
    controlInvalid: [
      '[border-color:var(--component-control-error)]',
    ],
    icon: [
      'pointer-events-none',
      'opacity-0',
      'transition-all',
      'duration-150',
      tokenClass('--component-control-check','text'),
    ],
    iconChecked: [
      'opacity-100',
    ],
    content: [
      'flex',
      'min-w-0',
      'flex-1',
      'flex-col',
      'gap-4',
    ],
    label: [
      'min-w-0',
      'break-words',
      'text-body',
      'font-normal',
      'text-fg-primary',
    ],
    message: [
      'text-caption',
      'text-fg-secondary',
    ],
    errorMessage: [
      'text-caption',
      'text-fg-status-error',
    ],
  },
} as const

export type CheckboxUiOptimized = typeof checkbox

export default checkbox
