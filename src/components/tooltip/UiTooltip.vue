<script setup lang="ts">
import {computed, onMounted, ref, useAttrs, watch} from 'vue'
import {arrow, flip, offset, shift, useFloating} from '@floating-ui/vue'
import {useAppConfig} from '../../composables/useAppConfig'
import {TOOLTIP_PLACEMENT_MAP, type UiTooltipPlacement, type UiTooltipProps} from './types.ts'
import UiIcon from "../icon/UiIcon.vue";

const props = withDefaults(defineProps<UiTooltipProps>(), {
  text: '',
  placement: 'top-center',
  offsetValue: 8,
  disabled: false,
  trigger: 'hover',
})

defineOptions({
  name: 'UiTooltip',
  inheritAttrs: false
})

const isOpen = ref(false)
const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const floatingArrow = ref<HTMLElement | null>(null);
const attrs = useAttrs()
const allowedPlacements = Object.keys(TOOLTIP_PLACEMENT_MAP) as UiTooltipPlacement[]

const OPPOSITE_SIDE_BY_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

const tooltipVisible = computed(() => !props.disabled && isOpen.value)
const floatingArrowX = computed(() => middlewareData.value.arrow?.x ?? null);
const floatingArrowY = computed(() => middlewareData.value.arrow?.y ?? null);
const resolvedPlacement = computed(() => TOOLTIP_PLACEMENT_MAP[props.placement])
const resolvedFallbackPlacements = computed(() => {
  const placements = props.fallbackPlacements ?? allowedPlacements.filter((placement) => placement !== props.placement)

  return placements.map((placement) => TOOLTIP_PLACEMENT_MAP[placement])
})

const VIEWPORT_PADDING = 8

const middleware = computed(() => {
  return [
    offset(props.offsetValue + 8),
    flip({
      padding: VIEWPORT_PADDING,
      boundary: 'clippingAncestors',
      rootBoundary: 'viewport',
      fallbackPlacements: resolvedFallbackPlacements.value,
    }),
    shift({
      padding: VIEWPORT_PADDING,
      boundary: 'clippingAncestors',
      rootBoundary: 'viewport',
      crossAxis: true,
    }),
    arrow({ element: floatingArrow, padding: 16 }),
  ]
})

const { floatingStyles, middlewareData, placement: currentPlacement } = useFloating(reference, floating, {
  transform: false,
  open: tooltipVisible,
  placement: resolvedPlacement,
  middleware,
  strategy: 'absolute',
})

const appConfig = useAppConfig()
const tooltipTheme = appConfig.components?.tooltip

if (!tooltipTheme) {
  throw new Error('[UnityUI] Tooltip theme is not provided in appConfig.components.tooltip.')
}

const side = computed(() => currentPlacement.value.split("-")[0]);
const floatingArrowStyles = computed(() => ({
  top: floatingArrowY.value === null ? "" : `${floatingArrowY.value}px`,
  left: floatingArrowX.value === null ? "" : `${floatingArrowX.value}px`,
  [OPPOSITE_SIDE_BY_SIDE[side.value]]: "-4px",
}));

const isTriggerHover = props.trigger === 'hover'
const isTriggerClick = props.trigger === 'click'
const isTriggerAlways = props.trigger === 'always'
const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

const isTooltipHidden = computed(() => (
  Boolean(middlewareData.value.hide?.referenceHidden) ||
  Boolean(middlewareData.value.hide?.escaped)
))
const floatingVisibilityStyles = computed(() => ({
  visibility: isTooltipHidden.value ? 'hidden' : 'visible',
  pointerEvents: isTooltipHidden.value ? 'none' : 'auto',
}))

const isReferenceHidden = computed(() => Boolean(middlewareData.value.hide?.referenceHidden))
const handleMouseEnter = () => {
  if (isTriggerHover && !props.disabled) {
    isOpen.value = true
  }
}
const handleMouseLeave = () => {
  if (isTriggerHover) {
    isOpen.value = false
  }
}

const handleClick = () => {
  if (isTriggerClick && !props.disabled) {
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  if (isTriggerAlways) {
    isOpen.value = true
  }
})

watch(isReferenceHidden, (referenceHidden) => {
  if (referenceHidden && isTriggerClick && isOpen.value) {
    isOpen.value = false
  }
})
</script>

<template>
  <div
    class="ui-tooltip"
    :class="[tooltipTheme.base, attrs.class]"
    v-bind="attributes"
  >
    <div
      ref="reference"
      :class="tooltipTheme.slots.trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
    >
      <slot name="activator" />
    </div>
    <div
      v-if="tooltipVisible"
      ref="floating"
      :class="tooltipTheme.slots.content"
      :style="[floatingStyles, floatingVisibilityStyles]"
      class="ui-tooltip__content relative flex gap-4"
    >
      <div
          ref="floatingArrow"
          class="size-8 absolute rotate-45"
          :class="tooltipTheme.slots.content_arrow"
          :style="floatingArrowStyles"
      />
      <UiIcon
          v-if="iconName"
          :name="iconName"
          size="16"
      />
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>
