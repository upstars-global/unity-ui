import { computed, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * - `none`   — content fits, no fade.
 * - `start`  — at the top: only the bottom fade.
 * - `middle` — somewhere in between: both fades.
 * - `end`    — at the bottom: only the top fade.
 */
export type ScrollFadeState = 'none' | 'start' | 'middle' | 'end'

// Sub-pixel scroll positions (zoom, fractional heights) shouldn't flip the state
const EDGE_THRESHOLD = 1

export function useScrollFade(
  scroller: Ref<HTMLElement | null>,
  content: Ref<HTMLElement | null>,
) {
  const state = ref<ScrollFadeState>('none')

  function update() {
    const el = scroller.value

    if (!el) {
      state.value = 'none'
      return
    }

    const maxScroll = el.scrollHeight - el.clientHeight

    if (maxScroll <= EDGE_THRESHOLD) {
      state.value = 'none'
    } else if (el.scrollTop <= EDGE_THRESHOLD) {
      state.value = 'start'
    } else if (el.scrollTop >= maxScroll - EDGE_THRESHOLD) {
      state.value = 'end'
    } else {
      state.value = 'middle'
    }
  }

  let resizeObserver: ResizeObserver | null = null

  // Browser-only: runs after mount, so SSR always renders `none` (no fades)
  onMounted(() => {
    scroller.value?.addEventListener('scroll', update, { passive: true })

    if (typeof ResizeObserver !== 'undefined') {
      // Scroller resizes with the viewport, content resizes when the slot changes
      resizeObserver = new ResizeObserver(update)
      if (scroller.value) resizeObserver.observe(scroller.value)
      if (content.value) resizeObserver.observe(content.value)
    }

    update()
  })

  onBeforeUnmount(() => {
    scroller.value?.removeEventListener('scroll', update)
    resizeObserver?.disconnect()
    resizeObserver = null
  })

  return {
    state,
    showTop: computed(() => state.value === 'middle' || state.value === 'end'),
    showBottom: computed(() => state.value === 'start' || state.value === 'middle'),
    update,
  }
}
