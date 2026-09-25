import type { Slot } from 'vue'
import type { IBaseFieldProps, IBaseMessage, InputMode } from '../BaseField'

export const TEXTAREA_RESIZE_OPTIONS = ['none', 'vertical', 'horizontal', 'both'] as const

export type TextAreaResize = (typeof TEXTAREA_RESIZE_OPTIONS)[number]

export interface UiTextAreaProps extends Omit<IBaseFieldProps, 'errorMessages' | 'infoMessage'> {
  autocomplete?: string
  invalid?: boolean
  maxlength?: number
  rows?: number
  resize?: TextAreaResize
  inputMode?: InputMode
}

export interface UiTextAreaEmits {
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
  (event: 'blur', value: FocusEvent): void
  (event: 'focus', value: FocusEvent): void
}

export interface UiTextAreaSlots {
  label?: Slot
  message?: Slot<{ message: IBaseMessage }>
}
