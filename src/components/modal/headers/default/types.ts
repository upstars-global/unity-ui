export interface UiModalHeaderDefaultProps {
  title?: string
  hideCloseButton?: boolean
  /**
   * `name` of the modal this header belongs to. The close button closes exactly
   * that modal; without it the topmost modal is closed.
   */
  modalName?: string
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
