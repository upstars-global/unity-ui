const CONTENT_BASE = ['relative', 'flex', 'min-w-0', 'flex-1', 'flex-col']

const VALUE_BASE = [
  'text-body',
  'font-normal',
  'placeholder:font-normal',
  'w-full min-w-0 border-0 bg-transparent p-0 outline-none placeholder:opacity-100 disabled:cursor-not-allowed',
  'h-[5.25rem] resize-none overflow-scroll',
  'leading-[inherit]',
  'text-[var(--component-input-value)]',
  'placeholder:text-[var(--component-input-placeholder)]',
]

const textArea = {
  base: ['ui-input'],
  size: {
    default: {
      field: [
        'h-auto',
        'items-start',
      ],
    },
  },
  slots: {
    field: [
      'ui-input__field',
      'items-start',
    ],
    content: CONTENT_BASE,
    label: [
      'ui-input__label',
      'text-caption font-medium',
      'min-w-0',
      'truncate',
    ],
    value: VALUE_BASE,
    messageRow: [
      'ui-input__message',
      'flex w-full items-start gap-[var(--spacing-8)]',
    ],
    message: ['min-w-0 flex-1'],
    errorMessage: ['ui-input__error-message'],
    counter: ['shrink-0 text-right whitespace-nowrap'],
  },
} as const

export type TextAreaUiOptimized = typeof textArea

export default textArea
