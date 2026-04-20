import {tokenClass} from "../../theme-utils.ts";

const inlineActionNotification = {
  base: [
    'ui-inline-action-notification',
    'p-4',
    tokenClass('--component-notification-bg-neutral', 'bg'),
    tokenClass('--radius-notification-lg', 'rounded'),
    tokenClass('--component-notification-fg-default', 'text'),
  ],
  slots: {
    container: [
      'flex',
      'gap-2',
      'lg:gap-4',
    ],
    icon: ['h-8 w-8'],
    content: [
      'flex',
      'flex-col',
      'justify-between',
      'w-full',
      'gap-3',
      'lg:gap-4',
      'lg:flex-row'
    ],
    message: [],
    title: ['h3', 'font-bold'],
    actions: [
      'grid',
      'grid-flow-col',
      'gap-x-2',
      'lg:gap-x-4',
    ],
  },
} as const

export type InlineActionNotificationUiOptimized = typeof inlineActionNotification

export default inlineActionNotification
