import { describe, expect, it } from 'vitest'
import { getAdjacentPageIndex, getPerPage } from '../../src/components/carousel/navigation'

describe('carousel page navigation', () => {
  it('moves by the number of visible cards and returns to the previous page', () => {
    const perPage = getPerPage(1000, 200, 20, false)
    const target = (index: number) => Math.min(index * 220, 960)

    expect(perPage).toBe(4)
    expect(getAdjacentPageIndex(9, perPage, 960, 0, 1, target)).toBe(4)
    expect(getAdjacentPageIndex(9, perPage, 960, 880, 1, target)).toBe(8)
    expect(getAdjacentPageIndex(9, perPage, 960, 960, -1, target)).toBe(4)
  })

  it('reaches a partial last page without skipping the previous page', () => {
    const target = (index: number) => Math.min(index * 220, 520)

    expect(getAdjacentPageIndex(7, 4, 520, 0, 1, target)).toBe(4)
    expect(getAdjacentPageIndex(7, 4, 520, 520, -1, target)).toBe(0)
  })

  it('keeps centered slides moving one at a time', () => {
    const perPage = getPerPage(1000, 200, 20, true)

    expect(perPage).toBe(1)
    expect(getAdjacentPageIndex(8, perPage, 1540, 0, 1, index => index * 220)).toBe(1)
  })
})
