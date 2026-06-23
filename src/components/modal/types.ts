import type { Component } from 'vue'

export const MODAL_SIZES = ['s', 'm', 'l', 'xl'] as const;


export type ModalSize = (typeof MODAL_SIZES)[number];
export interface ModalCloseOptions {
  immediate?: boolean
  clickOnCloseButton?: boolean
}

export interface UiModalClosePayload extends ModalCloseOptions {
  name?: string
}

export interface IModalOptions {
  blockCloseOverlay?: boolean
  size?: ModalSize
  showFooter?: boolean
  hideHeaderToolbar?: boolean
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
