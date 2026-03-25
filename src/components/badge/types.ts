export const BADGE_VARIANTS = [
  'status-error',
  'status-warning',
  'status-success',
  'navigation-default',
  'navigation-new',
  'neutral-default',
  'neutral-error',
] as const

export type BadgeVariant = (typeof BADGE_VARIANTS)[number]

export const BADGE_DEFAULT_VARIANT: BadgeVariant = 'status-error'

export const BADGE_VARIANT_GROUPS = {
  status: ['status-error', 'status-warning', 'status-success'],
  navigation: ['navigation-default', 'navigation-new'],
  neutral: ['neutral-default', 'neutral-error'],
} as const satisfies Record<string, readonly BadgeVariant[]>

export interface UiBadgeProps {
  label?: string
  variant?: BadgeVariant
}

export interface UiBadgeSlots {
  default?: () => unknown
}
