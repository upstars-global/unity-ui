<script setup lang="ts">
import { computed, toRef, useAttrs } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useTimer } from '../../composables/useTimer'
import { flattenClasses } from '../../helpers/flattenClasses'
import { type UiTimerProps } from './types'

defineOptions({
  name: 'UiTimer',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiTimerProps>(), {
  variant: 'filled',
})

const appConfig = useAppConfig()
const attrs = useAttrs()
const timerTheme = appConfig.components?.timer

if (!timerTheme) {
  throw new Error('[UnityUI] Timer theme is not provided in appConfig.components.timer.')
}

const { leadingLabel, resolvedState, timerText } = useTimer({
  config: toRef(props, 'config'),
  labels: props.labels,
})


const variantConfig = timerTheme.variant[props.variant]

const rootClasses = computed(() => {
  return flattenClasses(
      timerTheme.base,
      timerTheme.size.default.container,
      variantConfig.container,
  )
})
const textClasses = computed(() => {
  return flattenClasses(
    timerTheme.slots.text,
      timerTheme.size.default.text,
    variantConfig.text,
  )
})
const labelClasses = computed(() => {
  return flattenClasses(
      timerTheme.slots.text,
      timerTheme.size.default.text,
      variantConfig.label,
  )
})
const dotClasses = computed(() => {
  return flattenClasses(
      timerTheme.size.default.dot,
      timerTheme.state[resolvedState.value]
  )
})

const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})
const showLeadingLabel = computed(() => Boolean(leadingLabel.value))
</script>

<template>
  <span
    class="ui-timer"
    :class="[rootClasses, attrs.class]"
    v-bind="attributes"
    role="timer"
    aria-atomic="true"
  >
    <span
      aria-hidden="true"
      :class="dotClasses"
    />
    <span
      v-if="showLeadingLabel"
      :class="labelClasses"
    >
      {{ leadingLabel }}
    </span>
    <span :class="textClasses">
      {{ timerText }}
    </span>
  </span>
</template>
