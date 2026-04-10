<script setup lang="ts">
import { RADIAL_PROGRESS_START_ANGLE_MAP, type UiRadialProgressProps } from './types.ts'
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useAppConfig } from '../../../composables/useAppConfig'
import { flattenClasses } from '../../../helpers/flattenClasses'

defineOptions({
  name: "UiCircleProgressBar",
  inheritAttrs: false,
});

const SPACING = 2;

const props = withDefaults(defineProps<UiRadialProgressProps>(), {
  max: 100,
  size: 100,
  startAngle: 'bottom',
  gap: 0,
});

const appConfig = useAppConfig()
const radialProgressTheme = appConfig.components?.radialProgress

if (!radialProgressTheme) {
  throw new Error('[UnityUI] Radial progress theme is not provided in appConfig.components.radialProgress.')
}

const progressLineElement = ref<SVGCircleElement | null>(null)
const progressAnimation = ref<Animation | null>(null)

// Нормализованные входные значения для дальнейших SVG-расчётов.
const safeMax = computed(() => props.max ?? 100);
const safeSize = computed(() => Math.max(0, props.size));
const safeStroke = computed(() => Math.max(0, props.progressWidth));

// Область видимости SVG под размер компонента с небольшим отступом под stroke.
const viewBox = computed(() => `-${SPACING / 2} -${SPACING / 2} ${safeSize.value} ${safeSize.value}`);

// Текущее значение прогресса, ограниченное допустимым диапазоном.
const currentProgress = computed(() => Math.min(Math.max(props.progress, 0), safeMax.value));

// Базовая геометрия круга, рассчитанная из размера компонента и толщины линии.
const circleSize = computed(() => (safeSize.value - SPACING) / 2);
const radius = computed(() => Math.max(0, circleSize.value - (safeStroke.value - SPACING) / 2));
const fullCirc = computed(() => radius.value * Math.PI * 2);

// Размер gap, переведённый из градусов в длину вырезанной дуги.
const gapLength = computed(() => {
  const gap = Math.min(Math.max(props.gap ?? 0, 0), 359.9999);
  return (gap / 360) * fullCirc.value;
});
const visibleArc = computed(() => Math.max(0, fullCirc.value - gapLength.value));

// Прогресс, переведённый в длину видимой части дуги.
const range = computed(() => Math.max(1e-6, safeMax.value));
const progressRatio = computed(() => currentProgress.value / range.value);
const progressLen = computed(() => visibleArc.value * progressRatio.value);

// Компенсация для rounded linecap, чтобы конец линии визуально не выходил за пределы.
const capComp = computed(() => (props.rounded && props.progress < props.max ? safeStroke.value : 0));

// Паттерны dash для фоновой окружности и активной дуги прогресса.
const dashArrayTrail = computed(() => `${visibleArc.value} ${gapLength.value}`);
const dashArrayProgress = computed(() => {
  const len = Math.max(0, progressLen.value - capComp.value);
  return `${len} ${Math.max(0, fullCirc.value - len)}`;
});

// Общий dash offset и стартовая позиция для поворота обеих окружностей.
const dashOffsetCommon = computed(() => gapLength.value / 2);
const adjustedStartAngle = computed(() => RADIAL_PROGRESS_START_ANGLE_MAP[props.startAngle]);

// Флаг пустого прогресса для использования в шаблоне.
const isZero = computed(() => progressLen.value <= 0.0001);

const strokeType = computed(() => props.rounded ? '[stroke-linecap:round]' : '[stroke-linecap:butt]')
const rootClasses = computed(() => flattenClasses(radialProgressTheme.base))
const svgClasses = computed(() => flattenClasses(radialProgressTheme.slots.svg))
const trailClasses = computed(() => flattenClasses(radialProgressTheme.slots.trail, strokeType.value))
const lineClasses = computed(() => flattenClasses(radialProgressTheme.slots.line, strokeType.value))
const contentClasses = computed(() => flattenClasses(radialProgressTheme.slots.content))

function runProgressAnimation() {
  const lineElement = progressLineElement.value

  if (!lineElement) {
    return
  }

  progressAnimation.value?.cancel()

  if (!props.isAnimation) {
    lineElement.style.strokeDasharray = dashArrayProgress.value
    return
  }

  progressAnimation.value = lineElement.animate(
    [
      { strokeDasharray: `0 ${fullCirc.value}` },
      { strokeDasharray: dashArrayProgress.value },
    ],
    {
      duration: 500,
      easing: 'ease',
      fill: 'forwards',
    },
  )
}

watch(
  [dashArrayProgress, fullCirc, () => props.isAnimation],
  () => {
    runProgressAnimation()
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(() => {
  progressAnimation.value?.cancel()
})
</script>

<template>
  <div
      class="ui-circle-progress"
      :class="rootClasses"
      :style="{ width: `${safeSize}px`, height: `${safeSize}px` }"
      role="progressbar"
      :aria-valuemin="0"
      :aria-valuemax="safeMax"
      :aria-valuenow="currentProgress"
  >
    <svg :class="svgClasses" :viewBox="viewBox" aria-hidden="true">
      <circle
          class="ui-circle-progress-bar"
          :class="trailClasses"
          :r="radius"
          :cx="circleSize"
          :cy="circleSize"
          :stroke-width="safeStroke"
          fill="none"
          :stroke-dasharray="dashArrayTrail"
          :stroke-dashoffset="dashOffsetCommon"
          :transform="`rotate(${adjustedStartAngle} ${circleSize} ${circleSize})`"
      />
      <circle
          class="ui-circle-progress-line"
          ref="progressLineElement"
          :class="lineClasses"
          :data-empty="isZero"
          :r="radius"
          :cx="circleSize"
          :cy="circleSize"
          :stroke-width="safeStroke"
          fill="none"
          :stroke-dasharray="dashArrayProgress"
          :stroke-dashoffset="dashOffsetCommon"
          :transform="`rotate(${adjustedStartAngle} ${circleSize} ${circleSize})`"
      />
    </svg>

    <div class="ui-circle-progress__content" :class="contentClasses">
      <slot :progress="currentProgress" :max="safeMax" />
    </div>
  </div>
</template>
