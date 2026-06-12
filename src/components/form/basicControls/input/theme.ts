import { tokenClass } from '../../../theme-utils'
import {
  DEFAULT_SIZE, ERROR_MESSAGE_BASE,
  FIELD_BASE,
  INPUT_BASE,
  LABEL_BASE,
  MESSAGE_BASE,
  TEXT_BASE,
} from "../basicTheme.ts";

const CONTENT_BASE = ['relative', 'flex', 'min-w-0', 'flex-1', 'flex-col', 'justify-center', 'h-[2.25rem]']

const ICON_BASE = ['shrink-0', 'size-6', tokenClass('--component-input-icon', 'text')]

const VALUE_BASE = [
  'text-body',
  'font-medium',
  'placeholder:font-normal',
  'absolute z-1 w-full min-w-0 border-0 bg-transparent p-0 outline-none placeholder:opacity-100 disabled:cursor-not-allowed',
  tokenClass('--component-input-value', 'text'),
  tokenClass('--component-input-placeholder', 'placeholder:text'),
  ...TEXT_BASE
]

export const LABEL_FOCUS = 'top-0 translate-y-0 scale-100 text-caption'
export const LABEL_BLUR = 'top-1/2 -translate-y-1/2 text-body'
export const VALUE_FOCUS = 'top-auto bottom-0 translate-y-0 scale-100'

const input = {
  base: INPUT_BASE,
  size: {
    default: DEFAULT_SIZE
  },
  slots: {
    field: FIELD_BASE,
    content: CONTENT_BASE,
    label: [
      'absolute',
      ...LABEL_BASE,
      ...TEXT_BASE
    ],
    value: [
        ...VALUE_BASE
    ],
    message: MESSAGE_BASE,
    leadingIcon: ICON_BASE,
    trailingIcon: ICON_BASE,
    action: ['shrink-0'],
    errorMessage: ERROR_MESSAGE_BASE
  },
} as const

export type InputUiOptimized = typeof input

export default input
