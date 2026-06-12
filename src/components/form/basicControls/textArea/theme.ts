import {
  DEFAULT_SIZE, ERROR_MESSAGE_BASE,
  FIELD_BASE,
  INPUT_BASE,
  LABEL_BASE,
  MESSAGE_BASE,
  TEXT_BASE,
} from '../basicTheme.ts'

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
  base: INPUT_BASE,
  size: {
    default: {
      field: [
        ...DEFAULT_SIZE.field,
        'h-auto',
        'items-start',
      ],
    },
  },
  slots: {
    field: [
      ...FIELD_BASE,
      'items-start',
    ],
    content: CONTENT_BASE,
    label: [
        'text-caption font-medium',
      ...LABEL_BASE,
      ...TEXT_BASE,
    ],
    value: VALUE_BASE,
    messageRow: [
      ...MESSAGE_BASE,
      'flex w-full items-start gap-[var(--spacing-8)]',
    ],
    message: ['min-w-0 flex-1'],
    errorMessage: ERROR_MESSAGE_BASE,
    counter: ['shrink-0 text-right whitespace-nowrap'],
  },
} as const

export type TextAreaUiOptimized = typeof textArea

export default textArea
