import type { Plugin } from 'vue'
import type { AppConfig } from '../components/types'
import { EventBusSymbol, type UiEventBus } from '../composables/useEventBus'
import { AppConfigSymbol } from '../composables/useAppConfig'

export interface UnityUIOptions {
  themeConfig: AppConfig
  bus?: UiEventBus
}

export const UnityUI: Plugin<UnityUIOptions> = {
  install(app, options) {
    app.provide(AppConfigSymbol, options.themeConfig)
    app.config.globalProperties.$appConfig = options.themeConfig

    if (options.bus) {
      app.provide(EventBusSymbol, options.bus)
      app.config.globalProperties.$bus = options.bus
    }
  },
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $appConfig: AppConfig
    $bus?: UiEventBus
  }
}

export default UnityUI
