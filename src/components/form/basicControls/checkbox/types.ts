import type { Slot } from 'vue'
import type { IBaseFieldProps } from '../BaseField'

export const CHECKBOX_STATES = ['default', 'checked', 'error', 'disabled'] as const

export type CheckboxState = (typeof CHECKBOX_STATES)[number]

export interface UiCheckboxProps extends Omit<IBaseFieldProps, 'modelValue' | 'placeholder'> {
  modelValue?: boolean
  invalid?: boolean
  indeterminate?: boolean
  value?: boolean | number | string
}

export interface UiCheckboxEmits {
  (event: 'update:modelValue', value: boolean): void
  (event: 'change', value: boolean): void
  (event: 'blur', value: FocusEvent): void
  (event: 'focus', value: FocusEvent): void
}

export interface UiCheckboxSlots {
  default?: Slot
  label?: Slot
  message?: Slot
  errorMessages?: Slot
}
