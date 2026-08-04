import { tokenClass } from '../../../theme-utils'
import {
  DEFAULT_SIZE,
  ERROR_MESSAGE_BASE,
  FIELD_BASE,
  LABEL_BASE,
  MESSAGE_BASE,
  TEXT_BASE,
} from '../basicTheme.ts'

type SelectThemeSize = {
  field: string
  content: string
  option: string
}

export interface SelectUiOptimized {
  base: string
  size: {
    sm: SelectThemeSize
    default: SelectThemeSize
  }
  slots: {
    field: string
    content: string
    label: string
    value: string
    placeholder: string
    message: string
    leadingIcon: string
    trailingIcon: string
    action: string
    list: string
    listContent: string
    option: string
    optionLabel: string
    errorMessage: string
  }
}

const select: SelectUiOptimized = {
  base: [
    'group',
    'relative',
    'flex',
    'flex-col',
    tokenClass('--component-input-gap', 'gap'),
  ].join(' '),
  size: {
    sm: {
      field: [
        tokenClass('--radius-input-sm', 'rounded'),
        tokenClass('--component-input-height-sm', 'h'),
        tokenClass('--component-input-padding-sm', 'p'),
      ].join(' '),
      content: 'h-24',
      option: 'text-body',
    },
    default: {
      field: DEFAULT_SIZE.field.join(' '),
      content: 'h-[2.25rem]',
      option: 'text-body',
    },
  },
  slots: {
    field: [
      ...FIELD_BASE,
      'text-left',
      'cursor-pointer',
      'focus-visible:outline-none',
      'disabled:cursor-not-allowed',
    ].join(' '),
    content: ['relative', 'flex', 'min-w-0', 'flex-1', 'flex-col', 'justify-center', 'overflow-hidden'].join(' '),
    label: [
      'absolute',
      ...LABEL_BASE,
      ...TEXT_BASE,
    ].join(' '),
    value: [
      'absolute',
      'z-1',
      'w-full',
      'min-w-0',
      'text-body',
      'font-medium',
      tokenClass('--component-input-value', 'text'),
      ...TEXT_BASE,
    ].join(' '),
    placeholder: [
      'absolute',
      'z-1',
      'w-full',
      'min-w-0',
      'text-body',
      tokenClass('--component-input-placeholder', 'text'),
      ...TEXT_BASE,
    ].join(' '),
    message: MESSAGE_BASE.join(' '),
    leadingIcon: '',
    trailingIcon: ['transition-transform'].join(' '),
    action: ['ml-auto', 'shrink-0'].join(' '),
    list: [
      'z-20',
      'overflow-hidden',
      tokenClass('--component-input-list-bg', 'bg'),
      tokenClass('--radius-list', 'rounded'),
    ].join(' '),
    listContent: ['flex', 'flex-col', tokenClass('--spacing-4', 'gap'), tokenClass('--spacing-4', 'p')].join(' '),
    option: [
      'flex',
      'w-full',
      'items-center',
      'text-left',
      'transition-colors',
      'min-h-[3rem]',
      tokenClass('--spacing-8', 'gap'),
      tokenClass('--spacing-8', 'py'),
      tokenClass('--spacing-12', 'px'),
      tokenClass('--radius-list', 'rounded'),
      tokenClass('--component-input-list-suggest-text-default', 'text'),
      'text-body',
      'font-medium',
      'disabled:cursor-not-allowed',
      'disabled:opacity-45',
    ].join(' '),
    optionLabel: ['min-w-0', 'flex-1', 'truncate'].join(' '),
    errorMessage: ERROR_MESSAGE_BASE.join(' '),
  },
}

export default select
