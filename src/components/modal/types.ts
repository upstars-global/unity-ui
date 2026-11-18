import type { Component } from 'vue'
import type { UiModalFooterDefaultProps } from './footers/default/types'

export interface ModalCloseOptions {
  immediate?: boolean
  clickOnCloseButton?: boolean
}

export interface UiModalClosePayload extends ModalCloseOptions {
  name?: string
}

export interface IModalOptions {
  blockCloseOverlay?: boolean
  /** Desktop only: width follows the content instead of the fixed 432px */
  hug?: boolean
  showFooter?: boolean
  /**
   * Props for the default footer (UiModalFooterDefault) rendered in the
   * `bottom-side-under-scroll` slot when it isn't overridden.
   * Clicks are emitted by ModalCommonSlot as `clickPrimary` / `clickSecondary`.
   */
  footer?: UiModalFooterDefaultProps
  hideHeaderToolbar?: boolean
  /** Hides the top/bottom fades that hint at scrollable content */
  hideScrollFade?: boolean
  hideCloseButton?: boolean
  fullScreen?: boolean
  name: string
  component: Component
  title: string
  callback?(): void
}

export interface UiModalEventBus {
  $on(event: 'modal.show', handler: (modal: IModalOptions) => void): void
  $on(event: 'modal.close', handler: (payload: UiModalClosePayload) => void): void
  $off(event: 'modal.show', handler: (modal: IModalOptions) => void): void
  $off(event: 'modal.close', handler: (payload: UiModalClosePayload) => void): void
  $emit(event: 'modal.show', modal: IModalOptions): void
  $emit(event: 'modal.close', payload: UiModalClosePayload): void
}
