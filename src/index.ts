export { UnityUI } from './plugins/vue-plugin';
export { useAppConfig } from './composables/useAppConfig';
export { useEventBus } from './composables/useEventBus';
export { useModalController } from './components/modal/useModalController';
export { useToastController } from './components/notifications/toast/useToastController';
export { getThemeConfig } from './themes/registry';
export { default as modal } from './plugins/modal';
export { default as toast } from './plugins/toast';
export { default as UiCard } from './components/card/UiCard.vue';
export { default as UiTimer } from './components/timer/UiTimer.vue';

export type { AppConfig } from './components/types';
export type { UiThemeName, UiThemeIconName } from './themes/registry';
export type { UnityUIOptions } from './plugins/vue-plugin';
export type {
  CardVariant,
  UiCardProps,
} from './components/card/types';

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
  IModalOptions,
  ModalCloseOptions,
  ModalGtmEventOptions,
  ModalProps,
  UiModalClosePayload,
  UiModalEventBus,
} from './components/modal/types';
export type { UiToastClosePayload, UiToastEventBus, UiToastItem } from './components/notifications/toast/types';
export type { Dayjs } from 'dayjs';
