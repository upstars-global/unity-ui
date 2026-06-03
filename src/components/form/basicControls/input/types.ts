import type { Slot } from 'vue'
import type { UiThemeIconName } from '../../../../themes/registry'

export const INPUT_SIZES = ['sm', 'default'] as const
export const INPUT_STATES = ['default', 'hover', 'focus', 'error', 'disabled'] as const
export type Inputmode = "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal";

export type InputSize = (typeof INPUT_SIZES)[number]
export type InputState = (typeof INPUT_STATES)[number]

export interface UiInputProps {
  modelValue?: string
  type?: HTMLInputElement['type']
  autocomplete?: string
  autofocus?: boolean
  dataTest?: string
  fullWidth?: boolean
  disabled?: boolean
  invalid?: boolean
  label?: string
  errorMessages?: string
  placeholder?: string
  showClearAction?: boolean
  max?: number | string
  maxlength?: number
  min?: number | string
  pattern?: string
  leadingIconName?: UiThemeIconName
  trailingIconName?: UiThemeIconName
  inputmode?: Inputmode
  mask?: string
  name: string
  rules?: string | string[]
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
  leading?: Slot
  trailing?: Slot
  action?: Slot
  suggestList?: Slot
}
