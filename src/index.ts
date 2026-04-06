export { UnityUI } from './plugins/vue-plugin';
export { useAppConfig } from './composables/useAppConfig';
export { getThemeConfig } from './themes/registry';
export { default as UiTimer } from './components/timer/UiTimer.vue';

export type { AppConfig } from './components/types';
export type { UiThemeName, UiThemeIconName } from './themes/registry';
export type {
  TimerPhase,
  TimerUnit,
  TimerVariant,
  UiTimerConfig,
  UiTimerConfigValue,
  UiTimerExpiredConfig,
  UiTimerLabels,
  UiTimerProps,
} from './components/timer/types';
export type { Dayjs } from 'dayjs';
