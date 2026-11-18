export type CarouselDirection = -1 | 1

export interface UiCarouselProps {
  activeIndex?: number
  allowChildrenMismatch?: boolean
  ariaLabel?: string
  autoplay?: number
  centerActiveSlide?: boolean
  showNavigation?: boolean
}

export interface UiCarouselEmits {
  (event: 'update:activeIndex', value: number): void
  (event: 'change', value: number): void
}

export interface UiCarouselNavigationProps {
  backward?: boolean
  forward?: boolean
  previousLabel?: string
  nextLabel?: string
}

export interface UiCarouselNavigationEmits {
  (event: 'change', value: CarouselDirection): void
}

export interface UiCarouselNavigationSlotProps {
  backward: boolean
  forward: boolean
  change: (direction: CarouselDirection) => void
}

export interface UiCarouselSlots {
  default?: () => unknown
  navigation?: (props: UiCarouselNavigationSlotProps) => unknown
}
