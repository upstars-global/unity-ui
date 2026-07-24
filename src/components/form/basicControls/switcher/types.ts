import type { Slot } from 'vue'
import type { IBaseFieldProps } from '../BaseField'

export const SWITCHER_STATES = ['default', 'checked', 'error', 'disabled'] as const

export type SwitcherState = (typeof SWITCHER_STATES)[number]

export interface UiSwitcherProps extends Omit<IBaseFieldProps, 'modelValue' | 'placeholder'> {
  modelValue?: boolean
  invalid?: boolean
  value?: boolean | number | string
}

export interface UiSwitcherEmits {
  (event: 'update:modelValue', value: boolean): void
  (event: 'change', value: boolean): void
  (event: 'blur', value: FocusEvent): void
  (event: 'focus', value: FocusEvent): void
}

export interface UiSwitcherSlots {
  default?: Slot
}
