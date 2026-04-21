import type { Plugin } from 'vue'
import type { AppConfig } from '../components/types'
import { EventBusSymbol } from '../composables/useEventBus'
import { AppConfigSymbol } from '../composables/useAppConfig'
import type { UiToastEventBus } from '../components/notifications/toast/types'
import { getThemeConfig, type UiThemeName } from '../themes/registry'

export interface UnityUIOptions {
  themeName?: UiThemeName
  bus?: UiToastEventBus
}

function resolveOptions(options?: UiThemeName | UnityUIOptions): Required<Pick<UnityUIOptions, 'themeName'>> & Pick<UnityUIOptions, 'bus'> {
  if (typeof options === 'string') {
    return {
      themeName: options,
      bus: undefined,
    }
  }

  return {
    themeName: options?.themeName ?? 'alpa',
    bus: options?.bus,
  }
}

export const UnityUI: Plugin<UiThemeName | UnityUIOptions> = {
  install(app, options) {
    const { themeName, bus } = resolveOptions(options)
    const themeConfig = getThemeConfig(themeName)

    app.provide(AppConfigSymbol, themeConfig)
    app.config.globalProperties.$appConfig = themeConfig

    if (bus) {
      app.provide(EventBusSymbol, bus)
      app.config.globalProperties.$bus = bus
    }
  },
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $appConfig: AppConfig;
    $bus?: UiToastEventBus;
  }
}

export default UnityUI
