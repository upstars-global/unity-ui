export interface SMCNotificationProps {
  /** HTML prepared by the consuming application. Sanitize untrusted content before passing it. */
  titleHtml?: string
  /** HTML prepared by the consuming application. Sanitize untrusted content before passing it. */
  messageHtml?: string
  imageUrl?: string
  dismissLabel: string
  /** Countdown duration after mounting, in seconds. */
  duration?: number
}

export interface SMCNotificationSlots {
  actions?: () => unknown
}

export interface SMCNotificationEmits {
  (event: 'dismiss'): void
}
