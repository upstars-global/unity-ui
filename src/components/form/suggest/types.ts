import type { Slot } from 'vue'
import type { UiThemeIconName } from '../../../themes/registry.ts'

export type UiSuggestListValue = string | number | boolean

export interface UiSuggestListItem<TValue extends UiSuggestListValue = UiSuggestListValue> {
  label: string
  value: TValue
  disabled?: boolean
  leadingIconName?: UiThemeIconName
  trailingIconName?: UiThemeIconName
}

export type UiSuggestListInputItem<TValue extends UiSuggestListValue = UiSuggestListValue> =
  | string
  | UiSuggestListItem<TValue>

export const SUGGEST_LIST_VARIANTS = ['floating', 'embedded'] as const

export type UiSuggestListVariant = (typeof SUGGEST_LIST_VARIANTS)[number]

export interface UiSuggestListProps<TValue extends UiSuggestListValue = UiSuggestListValue> {
  items: Array<UiSuggestListInputItem<TValue>>
  visible?: boolean
  disabled?: boolean
  emptyText?: string
  leadingIconName?: UiThemeIconName
  trailingIconName?: UiThemeIconName
  selectedValue?: TValue | null
  variant?: UiSuggestListVariant
  idPrefix?: string
  closeOnClickOutside?: boolean
}

export interface UiSuggestListSelectPayload<TValue extends UiSuggestListValue = UiSuggestListValue> {
  value: TValue
  label: string
  index: number
  item: UiSuggestListItem<TValue>
}

export interface UiSuggestListActivePayload<TValue extends UiSuggestListValue = UiSuggestListValue> {
  index: number
  item: UiSuggestListItem<TValue> | null
}

export interface UiSuggestListEmits<TValue extends UiSuggestListValue = UiSuggestListValue> {
  (event: 'select', payload: UiSuggestListSelectPayload<TValue>): void
  (event: 'close', payload: Event | KeyboardEvent | undefined): void
  (event: 'hover', payload: UiSuggestListSelectPayload<TValue>): void
  (event: 'active-change', payload: UiSuggestListActivePayload<TValue>): void
}

export interface UiSuggestListSlots<TValue extends UiSuggestListValue = UiSuggestListValue> {
  default?: Slot<{ item: UiSuggestListItem<TValue>; active: boolean; selected: boolean }>
  leading?: Slot<{ item: UiSuggestListItem<TValue>; active: boolean; selected: boolean }>
  trailing?: Slot<{ item: UiSuggestListItem<TValue>; active: boolean; selected: boolean }>
  empty?: Slot
}

export interface UiSuggestListExposed {
  activeIndex: number
  handleKeydown: (event: KeyboardEvent) => boolean
  setActiveIndex: (index: number) => boolean
  syncActiveIndex: (preferredIndex?: number) => number
  focusFirst: () => number
  focusLast: () => number
  selectActiveItem: () => UiSuggestListItem | null
  getItemId: (index: number) => string | undefined
}
