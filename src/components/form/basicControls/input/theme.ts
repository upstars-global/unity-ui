import { tokenClass } from '../../../theme-utils'
import {
  DEFAULT_SIZE,
} from "../basicTheme.ts";

type InputClassList = readonly string[]

const INPUT_BASE: InputClassList = [
  'ui-input',
  'group',
  'flex',
  'flex-col',
  'relative',
  tokenClass('--component-input-gap', 'gap'),
  `data-[disabled=true]:opacity-[var(--component-input-disabled-opacity)]`,
]

const FIELD_BASE: InputClassList = [
  'flex',
  'items-center',
  'w-full',
  'overflow-hidden',
  'border-solid',
  tokenClass('--component-input-borderwidth', 'border'),
  tokenClass('--component-input-field-gap', 'gap'),
  tokenClass('--component-input-bg', 'bg'),
  'hover:[&:not(:focus-within)]:border-[var(--component-input-hover-bordercolor)]',
  'focus-within:border-[var(--component-input-focus-bordercolor)]',
  'data-[invalid=true]:border-[var(--component-input-error-bordercolor)]',
]

const CONTENT_BASE: InputClassList = ['relative', 'flex', 'min-w-0', 'flex-1', 'flex-col', 'justify-center', 'h-[2.25rem]']
const TEXT_BASE: InputClassList = ['min-w-0', 'truncate']
const ICON_BASE: InputClassList = ['shrink-0', 'size-6', tokenClass('--component-input-icon', 'text')]
const MESSAGE_BASE: InputClassList = [
  tokenClass('--component-input-message-padding-x', 'px'),
  tokenClass('--component-input-message', 'text'),
  'group-data-[invalid=true]:!text-[var(--component-input-error-message)]',
  'text-caption',
]

const input = {
  base: INPUT_BASE,
  size: {
    default: DEFAULT_SIZE
  },
  slots: {
    field: FIELD_BASE,
    content: CONTENT_BASE,
    label: [
      'text-body',
      'font-medium',
      'duration-150',
      tokenClass('--component-input-label', 'text'),
      'group-focus-within:text-[var(--component-input-focus-label)]',
      'group-data-[invalid=true]:text-[var(--component-input-error-label)]',
      ...TEXT_BASE
    ],
    value: [
      'text-body',
      'font-medium',
      'placeholder:font-normal',
      tokenClass('--component-input-value', 'text'),
      tokenClass('--component-input-placeholder', 'placeholder:text'),
      ...TEXT_BASE
    ],
    message: MESSAGE_BASE,
    leadingIcon: ICON_BASE,
    trailingIcon: ICON_BASE,
    action: ['shrink-0'],
  },
} as const

export type InputUiOptimized = typeof input

export default input
