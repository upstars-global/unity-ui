import {tokenClass} from "../../theme-utils.ts";

const inlineNotification = {
  base: [
    tokenClass('--spacing-8', 'p'),
    tokenClass('--radius-notification-sm', 'rounded'),
  ],
  type: {
    base: 'flex items-center justify-center w-full text-center',
    icon: [
      'flex items-start justify-start w-full',
      tokenClass('--spacing-8', 'gap'),
    ]
  }
} as const

export type InlineNotificationUiOptimized = typeof inlineNotification

export default inlineNotification
