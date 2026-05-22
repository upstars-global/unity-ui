import { getCurrentInstance, inject, type InjectionKey } from 'vue'
import type { UiToastEventBus } from '../components/notifications/toast/types'
import type { UiModalEventBus } from '../components/modal/types'

export type UiEventBus = UiToastEventBus & UiModalEventBus

export const EventBusSymbol = Symbol('EventBusSymbol') as InjectionKey<UiEventBus | null>

export function useEventBus(): UiEventBus | undefined {
  const injectedBus = inject(EventBusSymbol, null)
  if (injectedBus) {
    return injectedBus
  }

  const instance = getCurrentInstance()
  return instance?.appContext.config.globalProperties.$bus as UiEventBus | undefined
}
