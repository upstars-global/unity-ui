<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { flattenClasses } from '../../helpers/flattenClasses'
import {
  BADGE_DEFAULT_VARIANT,
  type BadgeVariant,
  type UiBadgeProps,
  type UiBadgeSlots,
} from './types'

defineOptions({
  name: 'UiBadge',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiBadgeProps>(), {
  label: 'STATUS',
  variant: BADGE_DEFAULT_VARIANT,
})

defineSlots<UiBadgeSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const slots = useSlots()
const badgeTheme = appConfig.components?.badge

if (!badgeTheme) {
  throw new Error('[UnityUI] Badge theme is not provided in appConfig.components.badge.')
}

const hasDefaultSlot = computed(() => Boolean(slots.default))
const normalizedLabel = computed(() => props.label.toUpperCase())
const normalizedVariant = computed<BadgeVariant>(() => props.variant ?? BADGE_DEFAULT_VARIANT)
const sizeConfig = computed(() => badgeTheme.size.default)
const rootClasses = computed(() => {
  return flattenClasses(
    badgeTheme.base,
    sizeConfig.value.container,
    badgeTheme.variant[normalizedVariant.value],
  )
})
const labelClasses = computed(() => {
  return flattenClasses(badgeTheme.slots.label, sizeConfig.value.label)
})
const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})
</script>

<template>
  <span
      class="ui-badge"
      :class="[rootClasses, attrs.class]"
      v-bind="attributes"
  >
    <span :class="labelClasses">
      <slot v-if="hasDefaultSlot" />
      <template v-else>
        {{ normalizedLabel }}
      </template>
    </span>
  </span>
</template>
