import type { Slot } from 'vue'
import type { IBaseMessage } from '../BaseField'

export interface UiMessageProps {
  message: IBaseMessage
}

export interface UiMessageSlots {
  default?: Slot<{ message: IBaseMessage }>
}
