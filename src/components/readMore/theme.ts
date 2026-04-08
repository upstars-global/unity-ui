type ReadMoreClassList = readonly string[]

const READ_MORE_BASE: ReadMoreClassList = ['ui-read-more']
const READ_MORE_CONTENT_WRAPPER: ReadMoreClassList = [
  'relative',
  'overflow-hidden',
  'transition-height',
]
const READ_MORE_COLLAPSED_OVERLAY: ReadMoreClassList = [
  'after:pointer-events-none',
  'after:absolute',
  'after:bottom-0',
  'after:left-0',
  'after:block',
  'after:h-full',
  'after:w-full',
  'after:content-empty',
  'after:bg-gradient-transparent',
]
const READ_MORE_TOGGLE: ReadMoreClassList = [
  'mt-4',
]

const readMore = {
  base: READ_MORE_BASE,
  slots: {
    contentWrapper: READ_MORE_CONTENT_WRAPPER,
    collapsedOverlay: READ_MORE_COLLAPSED_OVERLAY,
    toggle: READ_MORE_TOGGLE,
  },
} as const

export type ReadMoreUiOptimized = typeof readMore

export default readMore
