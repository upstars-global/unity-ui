import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { BREAKPOINTS, type Breakpoint } from '../tailwind/breakpoints'

export function useBreakpoint(breakpoint: Breakpoint) {
  const width = ref(typeof window === 'undefined' ? 0 : window.innerWidth)

  const currentBreakpoint = computed<Breakpoint | null>(() => {
    const matches = Object.entries(BREAKPOINTS)
      .filter(([, minWidth]) => width.value >= minWidth)

    return (matches.at(-1)?.[0] as Breakpoint | undefined) ?? null
  })

  const isBreakpoint = computed(() => currentBreakpoint.value === breakpoint)
  const breakpointWidth = BREAKPOINTS[breakpoint]
  const isGreaterThanBreakpoint = computed(() => width.value > breakpointWidth)
  const isLessThanBreakpoint = computed(() => width.value < breakpointWidth)
  const isGreaterOrEqualBreakpoint = computed(() => width.value >= breakpointWidth)
  const isLessOrEqualBreakpoint = computed(() => width.value <= breakpointWidth)

  function updateWidth() {
    width.value = window.innerWidth
  }

  onMounted(() => window.addEventListener('resize', updateWidth))
  onBeforeUnmount(() => window.removeEventListener('resize', updateWidth))

  return {
    currentBreakpoint,
    isBreakpoint,
    isGreaterThanBreakpoint,
    isLessThanBreakpoint,
    isGreaterOrEqualBreakpoint,
    isLessOrEqualBreakpoint,
  }
}
