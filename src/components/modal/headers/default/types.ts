export interface UiModalHeaderDefaultProps {
  title?: string
  hideCloseButton?: boolean
}

export interface UiModalHeaderDefaultEmits {
  (event: 'close', value: MouseEvent): void
}

export interface UiModalHeaderDefaultSlots {
  /** 24×24 area on the left, e.g. a back arrow or a logo. Empty by default. */
  left?: () => unknown
  /** Replaces the title text. */
  title?: () => unknown
  /** 24×24 area on the right. Defaults to the close icon. */
  right?: () => unknown
}
