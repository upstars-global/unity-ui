import {tokenClass} from "../../theme-utils.ts";

const inlineActionNotification = {
  base: [
    'ui-inline-action-notification',
    tokenClass('--spacing-16', 'p'),
    tokenClass('--component-notification-bg-neutral', 'bg'),
    tokenClass('--radius-notification-lg', 'rounded'),
    tokenClass('--component-notification-fg-default', 'text'),
    'shadow-fg-default'
  ],
  slots: {
    container: [
      'flex',
      tokenClass('--spacing-8', 'gap'),
      tokenClass('--spacing-16', 'lg:gap'),
    ],
    icon: ['h-32 w-32'],
    content: [
      'flex',
      'flex-col',
      'justify-between',
      'w-full',
      'gap-3',
      tokenClass('--spacing-12', 'gap'),
      tokenClass('--spacing-16', 'lg:gap'),
      'lg:flex-row'
    ],
    message: [],
    title: ['h3', 'font-bold'],
    actions: [
      'flex',
      'flex-col',
      'lg:flex-row',
      tokenClass('--spacing-4', 'gap'),
      tokenClass('--spacing-8', 'lg:gap'),
    ],
  },
} as const

export type InlineActionNotificationUiOptimized = typeof inlineActionNotification

export default inlineActionNotification
