import type { CarouselDirection } from './types'

export function getPerPage(availableWidth: number, itemWidth: number, gap: number, centerActiveSlide: boolean) {
  const step = itemWidth + gap

  if (centerActiveSlide || step <= 0) {
    return 1
  }

  return Math.max(1, Math.floor(availableWidth / step))
}

export function getAdjacentPageIndex(
  itemCount: number,
  perPage: number,
  maxScrollLeft: number,
  currentScrollLeft: number,
  direction: CarouselDirection,
  getTargetLeft: (index: number) => number,
) {
  const pages: { index: number, left: number }[] = []

  for (let index = 0; index < itemCount; index += perPage) {
    const left = getTargetLeft(index)
    const previousLeft = pages[pages.length - 1]?.left

    if (previousLeft === undefined || left > previousLeft + 1) {
      pages.push({ index, left })
    }

    if (left >= maxScrollLeft - 1) {
      break
    }
  }

  // The last page may be shorter than perPage, but must still reach the end.
  const lastIndex = itemCount - 1
  const lastLeft = lastIndex >= 0 ? getTargetLeft(lastIndex) : 0

  if (lastLeft > (pages[pages.length - 1]?.left ?? lastLeft) + 1) {
    pages.push({ index: lastIndex, left: lastLeft })
  }

  if (direction > 0) {
    return pages.find(page => page.left > currentScrollLeft + 1)?.index ?? -1
  }

  for (let page = pages.length - 1; page >= 0; page -= 1) {
    const target = pages[page]

    if (target && target.left < currentScrollLeft - 1) {
      return target.index
    }
  }

  return -1
}
