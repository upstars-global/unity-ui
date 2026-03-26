import type { RouteLocationRaw } from 'vue-router'

export interface UiTabsItem {
  to?: RouteLocationRaw
  label: string
  accent?: boolean
  dataTest?: string
  disabled?: boolean
}

type RefTarget = HTMLElement | { $el?: HTMLElement } | null | undefined

export interface UiTabsProps {
  menu: UiTabsItem[]
  currentRefs?: Record<string, RefTarget>
}

export interface UiTabsEmits {
  (event: 'changeTab', value: UiTabsItem): void
}