const toast = {
  base: 'fixed z-9999 w-84 max-w-full-mob top-4 right-4',
  slots: {
    list: 'flex flex-col gap-3',
    item: 'flex p-4 gap-2',
  },
  transitionGroup: {
    enterActiveClass: 'transition-opacity duration-500',
    enterFromClass: 'opacity-0',
    leaveActiveClass: 'transition-opacity duration-500',
    leaveToClass: 'opacity-0',
  },
} as const

export type ToastUiOptimized = typeof toast

export default toast
