export const MODAL_FOOTER_DEFAULT_TYPES = ['single', 'horizontal', 'vertical'] as const

/**
 * - `single` — one primary button.
 * - `horizontal` — two buttons in a row: secondary on the left, primary on the right.
 * - `vertical` — two buttons in a column: primary on top, secondary below.
 */
export type ModalFooterDefaultType = (typeof MODAL_FOOTER_DEFAULT_TYPES)[number]

export interface UiModalFooterDefaultProps {
  type?: ModalFooterDefaultType
  primaryLabel: string
  secondaryLabel?: string
  primaryDisabled?: boolean
  primaryLoading?: boolean
  secondaryDisabled?: boolean
  secondaryLoading?: boolean
}

export interface UiModalFooterDefaultEmits {
  (event: 'primary', value: MouseEvent): void
  (event: 'secondary', value: MouseEvent): void
}
