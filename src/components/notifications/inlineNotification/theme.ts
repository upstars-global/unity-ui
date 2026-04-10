const inlineNotification = {
  base: 'p-2',
  type: {
    base: 'flex items-center justify-center w-full text-center',
    icon: 'flex items-center gap-2 justify-start w-full'
  }
} as const

export type InlineNotificationUiOptimized = typeof inlineNotification

export default inlineNotification
