import {tokenClass} from "../../theme-utils.ts";
import type {BaseNotificationVariants} from "./types.ts";

type BaseNotificationClassList = readonly string[]

const baseNotification = {
  base: [
    'ui-base-notification',
    tokenClass('--radius-notification-lg', 'rounded'),
  ],
  variant: {
    neutral: [
      tokenClass('--component-notification-bg-neutral', 'bg'),
      tokenClass('--component-notification-fg-default', 'text'),
    ],
    success: [
      tokenClass('--component-notification-bg-success', 'bg'),
      tokenClass('--component-notification-fg-default', 'text'),
    ],
    error: [
      tokenClass('--component-notification-bg-error', 'bg'),
      tokenClass('--component-notification-fg-error', 'text'),
    ],
  } satisfies Record<BaseNotificationVariants, BaseNotificationClassList>,
} as const

export type BaseNotificationUiOptimized = typeof baseNotification

export default baseNotification
