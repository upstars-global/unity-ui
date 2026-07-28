import { nextTick, ref, watch, type Ref } from 'vue'

export interface SuggestNavigationItem {
  disabled?: boolean
}

export interface UseSuggestListNavigationOptions<TItem extends SuggestNavigationItem> {
  items: Ref<TItem[]>
  listRef: Ref<HTMLElement | null>
  onActiveChange?: (payload: { item: TItem | null; index: number }) => void
  onSelect?: (payload: { item: TItem; index: number }) => void
}

export interface UseSuggestListNavigationResult<TItem extends SuggestNavigationItem> {
  activeIndex: Ref<number>
  setActiveIndex: (index: number) => boolean
  syncActiveIndex: (preferredIndex?: number) => number
  moveActiveIndex: (direction: 1 | -1) => number
  focusFirst: () => number
  focusLast: () => number
  selectActiveItem: () => TItem | null
  handleKeydown: (event: KeyboardEvent) => boolean
}

export function useSuggestListNavigation<TItem extends SuggestNavigationItem>({
  items,
  listRef,
  onActiveChange,
  onSelect,
}: UseSuggestListNavigationOptions<TItem>): UseSuggestListNavigationResult<TItem> {
  const activeIndex = ref(-1)

  function findNextEnabledIndex(startIndex: number, direction: 1 | -1) {
    if (!items.value.length) {
      return -1
    }

    for (let step = 0; step < items.value.length; step += 1) {
      const nextIndex = (startIndex + step * direction + items.value.length) % items.value.length
      const item = items.value[nextIndex]

      if (!item?.disabled) {
        return nextIndex
      }
    }

    return -1
  }

  function emitActiveChange(index: number) {
    onActiveChange?.({
      item: index >= 0 ? items.value[index] ?? null : null,
      index,
    })
  }

  function scrollToIndex(index: number) {
    if (index < 0) {
      return
    }

    nextTick(() => {
      const element = listRef.value?.querySelector<HTMLElement>(`[data-suggest-index="${index}"]`)

      element?.scrollIntoView({
        block: 'nearest',
      })
    })
  }

  function setActiveIndex(index: number) {
    if (index < 0 || index >= items.value.length) {
      activeIndex.value = -1
      emitActiveChange(-1)
      return false
    }

    if (items.value[index]?.disabled) {
      return false
    }

    activeIndex.value = index
    emitActiveChange(index)
    scrollToIndex(index)
    return true
  }

  function syncActiveIndex(preferredIndex = -1) {
    if (!items.value.length) {
      activeIndex.value = -1
      emitActiveChange(-1)
      return -1
    }

    if (preferredIndex >= 0 && setActiveIndex(preferredIndex)) {
      return preferredIndex
    }

    const nextIndex = findNextEnabledIndex(0, 1)

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex)
    } else {
      activeIndex.value = -1
      emitActiveChange(-1)
    }

    return nextIndex
  }

  function moveActiveIndex(direction: 1 | -1) {
    if (!items.value.length) {
      return -1
    }

    const fallbackIndex = direction === 1 ? 0 : items.value.length - 1
    const startIndex = activeIndex.value >= 0 ? activeIndex.value + direction : fallbackIndex
    const nextIndex = findNextEnabledIndex(startIndex, direction)

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex)
    }

    return nextIndex
  }

  function focusFirst() {
    const nextIndex = findNextEnabledIndex(0, 1)

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex)
    }

    return nextIndex
  }

  function focusLast() {
    const nextIndex = findNextEnabledIndex(items.value.length - 1, -1)

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex)
    }

    return nextIndex
  }

  function selectActiveItem() {
    const item = activeIndex.value >= 0 ? items.value[activeIndex.value] : null

    if (!item || item.disabled) {
      return null
    }

    onSelect?.({
      item,
      index: activeIndex.value,
    })

    return item
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveActiveIndex(1)
      return true
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveActiveIndex(-1)
      return true
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      return Boolean(selectActiveItem())
    }

    return false
  }

  watch(items, (nextItems) => {
    if (!nextItems.length) {
      activeIndex.value = -1
      emitActiveChange(-1)
      return
    }

    if (activeIndex.value >= nextItems.length || nextItems[activeIndex.value]?.disabled) {
      syncActiveIndex()
    }
  })

  return {
    activeIndex,
    setActiveIndex,
    syncActiveIndex,
    moveActiveIndex,
    focusFirst,
    focusLast,
    selectActiveItem,
    handleKeydown,
  }
}
