<script setup lang="ts">
import {computed, onMounted, ref, useAttrs, watch} from 'vue'
import {arrow, autoUpdate, flip, hide, offset, shift, useFloating} from '@floating-ui/vue'
import {useAppConfig} from '../../composables/useAppConfig'
import {flattenClasses} from '../../helpers/flattenClasses'
import type {UiTooltipProps} from './types.ts'

const props = withDefaults(defineProps<UiTooltipProps>(), {
  text: '',
  placement: 'top',
  strategy: 'absolute',
  fallbackPlacements: () => ['top', 'bottom', 'left', 'right'],
  offsetValue: 8,
  disabled: false,
  trigger: 'hover',
})

defineOptions({
  name: 'UiTooltip',
  inheritAttrs: false
})

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)
const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const floatingArrow = ref<HTMLElement | null>(null)
const attrs = useAttrs()

const placement = computed(() => props.placement)
const offsetValue = computed(() => props.offsetValue)
const tooltipVisible = computed(() => !props.disabled && isOpen.value)
const collisionBoundary = computed(() => root.value?.parentElement ?? 'clippingAncestors')
const VIEWPORT_PADDING = 8

const middleware = computed(() => {
  const shiftConfig = shift({
    padding: VIEWPORT_PADDING,
    boundary: collisionBoundary.value,
    mainAxis: false,
    crossAxis: true,
  })
  const flipConfig = flip({
    padding: VIEWPORT_PADDING,
    boundary: collisionBoundary.value,
    fallbackPlacements: props.fallbackPlacements,
  })
  const baseMiddleware = [
    offset(offsetValue.value + 8),
    arrow({ element: floatingArrow, padding: 8 }),
    hide({
      boundary: collisionBoundary.value,
    }),
  ]

  if (props.placement.includes('-')) {
    return [flipConfig, shiftConfig, ...baseMiddleware]
  } else {
    return [flipConfig, shiftConfig, ...baseMiddleware]
  }
})

const { floatingStyles, middlewareData, placement: currentPlacement } = useFloating(reference, floating, {
  transform: false,
  open: tooltipVisible,
  placement,
  middleware,
  strategy: computed(() => props.strategy),
  whileElementsMounted: (referenceEl, floatingEl, update) => {
    return autoUpdate(referenceEl, floatingEl, update, {
      ancestorScroll: true,
    })
  },
})

const appConfig = useAppConfig()
const tooltipTheme = appConfig.components?.tooltip

if (!tooltipTheme) {
  throw new Error('[UnityUI] Tooltip theme is not provided in appConfig.components.tooltip.')
}

const isTriggerHover = computed(() => props.trigger === 'hover')
const isTriggerClick = computed(() => props.trigger === 'click')
const isTriggerAlways = computed(() => props.trigger === 'always')
const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})
const rootClasses = computed(() => {
  return flattenClasses(tooltipTheme.base)
})
const triggerClasses = computed(() => {
  return flattenClasses(tooltipTheme.slots.trigger)
})
const contentClasses = computed(() => {
  return flattenClasses(tooltipTheme.slots.content)
})
const arrowClasses = computed(() => {
  return flattenClasses(tooltipTheme.slots.arrow)
});

const OPPOSITE_SIDE_BY_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

const side = computed(() => currentPlacement.value.split("-")[0]);
const floatingArrowX = computed(() => middlewareData.value.arrow?.x ?? null);
const floatingArrowY = computed(() => middlewareData.value.arrow?.y ?? null);
const isReferenceHidden = computed(() => Boolean(middlewareData.value.hide?.referenceHidden))
const floatingArrowStyles = computed(() => ({
  top: floatingArrowY.value === null ? "" : `${floatingArrowY.value}px`,
  left: floatingArrowX.value === null ? "" : `${floatingArrowX.value}px`,
  [OPPOSITE_SIDE_BY_SIDE[side.value]]: "-4px",
}));
const handleMouseEnter = () => {
  if (isTriggerHover.value && !props.disabled) {
    isOpen.value = true
  }
}

const handleMouseLeave = () => {
  if (isTriggerHover.value) {
    isOpen.value = false
  }
}

const handleClick = () => {
  if (isTriggerClick.value && !props.disabled) {
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  if (isTriggerAlways.value) {
    isOpen.value = true
  }
})

watch(isReferenceHidden, (referenceHidden) => {
  if (referenceHidden && isTriggerClick.value && isOpen.value) {
    isOpen.value = false
  }
})
</script>

<template>
  <div
    ref="root"
    class="ui-tooltip"
    :class="[rootClasses, attrs.class]"
    v-bind="attributes"
  >
    <div
      ref="reference"
      :class="triggerClasses"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
    >
      <slot name="activator" />
    </div>
    <div
      v-if="tooltipVisible"
      ref="floating"
      :class="contentClasses"
      :style="floatingStyles"
    >
      <slot>{{ text }}</slot>
      <div
          ref="floatingArrow"
          :class="arrowClasses"
          :style="floatingArrowStyles"
      />
    </div>
  </div>
</template>
