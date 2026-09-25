<script setup lang="ts">
import {
  cloneVNode,
  Fragment,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type VNodeChild,
} from 'vue'
import UiCarouselNavigation from './UiCarouselNavigation.vue'
import type {
  CarouselDirection,
  UiCarouselEmits,
  UiCarouselProps,
  UiCarouselSlots,
} from './types'

defineOptions({
  name: 'UiCarousel',
})

const props = withDefaults(defineProps<UiCarouselProps>(), {
  activeIndex: 0,
  allowChildrenMismatch: false,
  ariaLabel: 'Carousel',
  autoplay: 0,
  centerActiveSlide: false,
  showNavigation: true,
})

const emit = defineEmits<UiCarouselEmits>()
const slots = defineSlots<UiCarouselSlots>()

function getMismatchValue(node: VNodeChild) {
  if (!isVNode(node)) {
    return 'class'
  }

  const currentValue = node.props?.['data-allow-mismatch']

  if (currentValue === '') {
    return ''
  }

  if (typeof currentValue !== 'string') {
    return 'class'
  }

  const allowedTypes = currentValue.split(',')

  return allowedTypes.includes('class')
    ? currentValue
    : `${currentValue},class`
}

function allowClassMismatch(children: unknown): VNodeChild[] {
  const nodes = Array.isArray(children) ? children : [children]
  const result: VNodeChild[] = []

  nodes.forEach((node: unknown) => {
    if (isVNode(node) && node.type === Fragment && Array.isArray(node.children)) {
      result.push(...allowClassMismatch(node.children))
      return
    }

    if (isVNode(node)) {
      result.push(cloneVNode(node, {
        'data-allow-mismatch': getMismatchValue(node),
      }))
      return
    }

    result.push(node as VNodeChild)
  })

  return result
}

const CarouselMismatchItems = () => allowClassMismatch(slots.default?.())

const root = ref<HTMLDivElement | null>(null)
const viewport = ref<HTMLDivElement | null>(null)
const localActiveIndex = ref(props.activeIndex)
const backward = ref(false)
const forward = ref(false)
const isScrolling = ref(false)

let autoplayId: ReturnType<typeof setInterval> | null = null
let scrollEndId: ReturnType<typeof setTimeout> | null = null
let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null
let frameId: number | null = null

function getItems() {
  return Array.from(viewport.value?.children ?? []) as HTMLElement[]
}

function getTargetScrollLeft(item: HTMLElement) {
  const element = viewport.value

  if (!element) {
    return 0
  }

  const safeZone = Number.parseFloat(getComputedStyle(element).paddingLeft) || 0
  let target = item === element.firstElementChild ? 0 : item.offsetLeft - safeZone

  if (props.centerActiveSlide) {
    target = item.offsetLeft - (element.clientWidth - item.offsetWidth) / 2
  }
  const maxScrollLeft = Math.max(element.scrollWidth - element.clientWidth, 0)

  return Math.min(Math.max(target, 0), maxScrollLeft)
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
  const element = viewport.value
  const items = getItems()

  if (!element || items.length === 0) {
    return
  }

  const safeIndex = Math.min(Math.max(index, 0), items.length - 1)
  const item = items[safeIndex]

  if (!item) {
    return
  }

  element.scrollTo({
    left: getTargetScrollLeft(item),
    behavior: prefersReducedMotion() ? 'auto' : behavior,
  })
}

function getAdjacentIndex(direction: CarouselDirection) {
  const element = viewport.value
  const items = getItems()

  if (!element || items.length === 0) {
    return null
  }

  const currentScrollLeft = element.scrollLeft

  if (direction > 0) {
    return items.findIndex(item => getTargetScrollLeft(item) > currentScrollLeft + 1)
  }

  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index]

    if (item && getTargetScrollLeft(item) < currentScrollLeft - 1) {
      return index
    }
  }

  return -1
}

function updateState() {
  const element = viewport.value
  const items = getItems()

  if (!element) {
    return
  }

  const maxScrollLeft = Math.max(element.scrollWidth - element.clientWidth, 0)
  backward.value = element.scrollLeft > 1
  forward.value = element.scrollLeft < maxScrollLeft - 1

  if (items.length === 0) {
    return
  }

  let nearestIndex = 0

  if (maxScrollLeft <= 1) {
    nearestIndex = 0
  }
  else if (!forward.value) {
    nearestIndex = items.length - 1
  }
  else if (backward.value) {
    let nearestDistance = Number.POSITIVE_INFINITY

    items.forEach((item, index) => {
      const distance = Math.abs(getTargetScrollLeft(item) - element.scrollLeft)

      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })
  }

  if (nearestIndex !== localActiveIndex.value) {
    localActiveIndex.value = nearestIndex
    emit('update:activeIndex', nearestIndex)
    emit('change', nearestIndex)
  }
}

function scheduleStateUpdate() {
  if (frameId !== null) {
    return
  }

  frameId = requestAnimationFrame(() => {
    frameId = null
    updateState()
  })
}

function finishScrolling() {
  if (scrollEndId !== null) {
    clearTimeout(scrollEndId)
    scrollEndId = null
  }

  isScrolling.value = false
  updateState()
}

function handleScroll() {
  isScrolling.value = true
  scheduleStateUpdate()

  if (scrollEndId !== null) {
    clearTimeout(scrollEndId)
  }

  scrollEndId = setTimeout(finishScrolling, 150)
}

function change(direction: CarouselDirection) {
  const index = getAdjacentIndex(direction)

  if (index === null || index < 0) {
    return
  }

  scrollToIndex(index)
}

function stopAutoplay() {
  if (autoplayId !== null) {
    clearInterval(autoplayId)
    autoplayId = null
  }
}

function startAutoplay() {
  stopAutoplay()

  if (props.autoplay <= 0 || getItems().length < 2) {
    return
  }

  autoplayId = setInterval(() => {
    if (forward.value) {
      change(1)
      return
    }

    scrollToIndex(0)
  }, props.autoplay)
}

function handleFocusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) {
    startAutoplay()
  }
}

function observeItems() {
  if (!resizeObserver) {
    return
  }

  resizeObserver.disconnect()

  if (viewport.value) {
    resizeObserver.observe(viewport.value)
  }

  getItems().forEach((item) => resizeObserver?.observe(item))
}

watch(
  () => props.activeIndex,
  (index) => {
    if (index === localActiveIndex.value) {
      return
    }

    localActiveIndex.value = index
    void nextTick(() => scrollToIndex(index, 'auto'))
  },
)

watch(
  () => props.autoplay,
  () => startAutoplay(),
)

watch(
  () => props.centerActiveSlide,
  () => {
    void nextTick(() => scrollToIndex(localActiveIndex.value, 'auto'))
  },
)

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => scheduleStateUpdate())
  }

  if (typeof MutationObserver !== 'undefined') {
    mutationObserver = new MutationObserver(() => {
      observeItems()
      scheduleStateUpdate()
      startAutoplay()
    })
  }

  observeItems()

  if (viewport.value && mutationObserver) {
    mutationObserver.observe(viewport.value, { childList: true })
  }

  requestAnimationFrame(() => {
    scrollToIndex(props.activeIndex, 'auto')
    updateState()
    startAutoplay()
  })
})

onBeforeUnmount(() => {
  stopAutoplay()

  if (scrollEndId !== null) {
    clearTimeout(scrollEndId)
  }

  resizeObserver?.disconnect()
  mutationObserver?.disconnect()

  if (frameId !== null) {
    cancelAnimationFrame(frameId)
  }
})

defineExpose({
  next: () => change(1),
  previous: () => change(-1),
  scrollToIndex,
})
</script>

<template>
  <div
    ref="root"
    class="ui-carousel"
    :class="{
      'ui-carousel--start': !backward && forward,
      'ui-carousel--middle': backward && forward,
      'ui-carousel--end': backward && !forward,
      'ui-carousel--center-active-slide': centerActiveSlide,
      'ui-carousel--scrolling': isScrolling && backward,
    }"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @focusin="stopAutoplay"
    @focusout="handleFocusOut"
  >
    <div
      ref="viewport"
      class="ui-carousel__viewport"
      :data-allow-mismatch="allowChildrenMismatch ? 'children,class' : undefined"
      role="region"
      :aria-label="ariaLabel"
      @scroll.passive="handleScroll"
    >
      <CarouselMismatchItems v-if="allowChildrenMismatch" />
      <slot v-else />
    </div>

    <slot
      v-if="showNavigation"
      name="navigation"
      :backward="backward"
      :forward="forward"
      :change="change"
    >
      <UiCarouselNavigation
        :backward="backward"
        :forward="forward"
        @change="change"
      />
    </slot>
  </div>
</template>
