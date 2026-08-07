import type { Slot } from 'vue'
import type { IBaseFieldProps } from '../BaseField'
import type { UiSuggestListItem } from '../../suggest/types'
import type { UiThemeIconName } from '../../../../themes/registry'

export const SELECT_SIZES = ['sm', 'default'] as const
export const SELECT_STATES = ['default', 'hover', 'focus', 'error', 'disabled'] as const

export type SelectSize = (typeof SELECT_SIZES)[number]
export type SelectState = (typeof SELECT_STATES)[number]
export type SelectValue = string | number | boolean

export type UiSelectOption = UiSuggestListItem<SelectValue>

export interface UiSelectProps extends Omit<IBaseFieldProps, 'modelValue'> {
  modelValue?: SelectValue | null
  fullWidth?: boolean
  invalid?: boolean
  list?: UiSelectOption[]
  leadingIconName?: UiThemeIconName
  trailingIconName?: UiThemeIconName
  optionTrailingIconName?: UiThemeIconName
  size?: SelectSize
}

export interface UiSelectEmits {
  (event: 'update:modelValue', value: SelectValue | null): void
  (event: 'change', value: SelectValue | null): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'open'): void
  (event: 'close'): void
}

export interface UiSelectSlots {
  label?: Slot
  message?: Slot
  errorMessages?: Slot
  leading?: Slot<{ selectedOption: UiSelectOption | null }>
  trailing?: Slot<{ selectedOption: UiSelectOption | null; isOpen: boolean }>
  option?: Slot<{ option: UiSelectOption; selected: boolean; active: boolean }>
  optionLeading?: Slot<{ option: UiSelectOption; selected: boolean; active: boolean }>
  optionTrailing?: Slot<{ option: UiSelectOption; selected: boolean; active: boolean }>
  empty?: Slot
}
