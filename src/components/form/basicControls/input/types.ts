import type { Slot } from 'vue'
import type { UiThemeIconName } from '../../../../themes/registry'
import type { IBaseFieldProps, InputMode } from '../BaseField'

export const INPUT_SIZES = ['sm', 'default'] as const
export const INPUT_STATES = ['default', 'hover', 'focus', 'error', 'disabled'] as const

export type InputSize = (typeof INPUT_SIZES)[number]
export type InputState = (typeof INPUT_STATES)[number]

export interface UiInputProps extends IBaseFieldProps {
  type?: HTMLInputElement['type']
  autocomplete?: string
  fullWidth?: boolean
  invalid?: boolean
  showClearAction?: boolean
  max?: number | string
  maxlength?: number
  min?: number | string
  pattern?: string
  leadingIconName?: UiThemeIconName
  trailingIconName?: UiThemeIconName
  inputMode?: InputMode
  mask?: string
  step?: number
  formatter?: (event: Event) => void
}


export interface UiInputEmits {
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
  (event: 'keydown', value: KeyboardEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'focus', value: FocusEvent): void
}

export interface UiInputSlots {
  default?: Slot
  label?: Slot
  errorMessages?: Slot
  message?: Slot
  leading?: Slot
  trailing?: Slot
  action?: Slot
  suggestList?: Slot
}
