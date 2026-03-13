import type { Plugin } from 'vue';
import { AppConfigSymbol } from '../composables/useAppConfig';
import { getThemeConfig, type UiThemeName } from '../themes/registry';

export const UnityUI: Plugin<UiThemeName> = {
  install(app, themeName: UiThemeName = 'alpa') {
    const themeConfig = getThemeConfig(themeName);

    app.provide(AppConfigSymbol, themeConfig);
    app.config.globalProperties.$appConfig = themeConfig;
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $appConfig: AppConfig;
  }
}

export default UnityUI;
