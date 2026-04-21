export { UnityUI } from './plugins/vue-plugin';
export { useAppConfig } from './composables/useAppConfig';
export { useEventBus } from './composables/useEventBus';
export { getThemeConfig } from './themes/registry';
export { default as toast } from './plugins/toast';
export { default as UiTimer } from './components/timer/UiTimer.vue';

export type { AppConfig } from './components/types';
export type { UiThemeName, UiThemeIconName } from './themes/registry';
export type { UnityUIOptions } from './plugins/vue-plugin';
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
export type {
  UiToastClosePayload,
  UiToastEventBus,
  UiToastItem,
} from './components/notifications/toast/types';
export type { Dayjs } from 'dayjs';
