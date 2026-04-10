import { getCurrentInstance, inject, type InjectionKey } from 'vue'
import type { UiToastEventBus } from '../components/notifications/toast/types'

export const EventBusSymbol = Symbol('EventBusSymbol') as InjectionKey<UiToastEventBus | null>

export function useEventBus(): UiToastEventBus | undefined {
  const injectedBus = inject(EventBusSymbol, null)
  if (injectedBus) {
    return injectedBus
  }

  const instance = getCurrentInstance()
  return instance?.appContext.config.globalProperties.$bus as UiToastEventBus | undefined
}
