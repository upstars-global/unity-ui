import { getCurrentInstance, inject, type InjectionKey } from 'vue';
import type { AppConfig } from '../components/types';

export const AppConfigSymbol = Symbol('AppConfigSymbol') as InjectionKey<AppConfig>;

export function useAppConfig(): AppConfig {
  const injectedConfig = inject(AppConfigSymbol, null);
  if (injectedConfig) {
    return injectedConfig;
  }

  const instance = getCurrentInstance();
  const globalConfig = instance?.appContext.config.globalProperties.$appConfig as AppConfig | undefined;
  if (globalConfig) {
    return globalConfig;
  }

  throw new Error('[UnityUI] AppConfig is not provided. Initialize plugin in product or provide config in Storybook.');
}
