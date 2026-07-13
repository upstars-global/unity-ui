import type { Slot } from 'vue'
import type { IBaseFieldProps } from '../BaseField'

export const RADIO_BUTTON_STATES = ['default', 'checked', 'error', 'disabled'] as const

export type RadioButtonState = (typeof RADIO_BUTTON_STATES)[number]
export type RadioButtonValue = boolean | number | string

export interface UiRadioButtonProps extends Omit<IBaseFieldProps, 'modelValue' | 'placeholder'> {
  modelValue?: RadioButtonValue | null
  invalid?: boolean
  value?: RadioButtonValue
}

export interface UiRadioButtonEmits {
  (event: 'update:modelValue', value: RadioButtonValue): void
  (event: 'change', value: RadioButtonValue): void
  (event: 'blur', value: FocusEvent): void
  (event: 'focus', value: FocusEvent): void
}

export interface UiRadioButtonSlots {
  default?: Slot
  label?: Slot
  message?: Slot
  errorMessages?: Slot
}
