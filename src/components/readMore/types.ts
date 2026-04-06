import type { CSSProperties, Slot } from 'vue'

export interface UiReadMoreProps {
  startHeight?: number
  showLessButton?: boolean
  buttonLabel?: {
    more: string,
    less: string,
  }
}

export interface UiReadMoreSlots {
  default?: Slot
}

export type UiReadMoreStyle = CSSProperties | undefined
