import type { BaseNotificationVariants } from '../baseNotification/types.ts'
import type { UiThemeIconName } from '../../../themes/registry.ts'

export interface UiToastItem {
  id?: number
  variant?: BaseNotificationVariants
  icon?: UiThemeIconName
  title?: string
  text?: string
  time?: number
  url?: string
  callback?: () => void
}

export interface UiToastClosePayload {
  id?: UiToastItem['id']
}

export interface UiToastEventBus {
  $on(event: 'toast.show', handler: (toast: UiToastItem) => void): void
  $on(event: 'toast.close', handler: (toast: UiToastClosePayload) => void): void
  $off(event: 'toast.show', handler: (toast: UiToastItem) => void): void
  $off(event: 'toast.close', handler: (toast: UiToastClosePayload) => void): void
  $emit(event: 'toast.show', toast: UiToastItem): void
  $emit(event: 'toast.close', toast: UiToastClosePayload): void
}
