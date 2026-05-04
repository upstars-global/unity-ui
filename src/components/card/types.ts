export const CARD_VARIANTS = ['default', 'outlined', 'alt', 'gradient'] as const

export type CardVariant = (typeof CARD_VARIANTS)[number]

export const CARD_DEFAULT_VARIANT: CardVariant = 'default'

export interface UiCardProps {
  variant?: CardVariant
}

export interface UiCardSlots {
  default?: () => unknown
}
