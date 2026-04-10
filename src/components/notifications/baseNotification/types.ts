export const BASE_NOTIFICATION_VARIANTS = [
  'neutral',
  'success',
  'error'
] as const

export type BaseNotificationVariants = (typeof BASE_NOTIFICATION_VARIANTS)[number]

export interface UiBaseNotificationProps {
  variant: BaseNotificationVariants
}

export interface UiBaseNotificationSlots {
  default?: () => unknown;
}
