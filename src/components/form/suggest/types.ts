import type {UiThemeIconName} from "../../../themes/registry.ts";

export interface UiSuggestListProps {
    items: string[]
    visible?: boolean
    activeIndex?: number
    disabled?: boolean
    emptyText?: string
    leadingIconName?: UiThemeIconName
    trailingIconName?: UiThemeIconName
}

export interface UiSuggestListEmits {
    (event: 'select', payload: { value: string; index: number }): void
    (event: 'close', payload: any): void
    (event: 'hover', payload: { value: string; index: number }): void
}
