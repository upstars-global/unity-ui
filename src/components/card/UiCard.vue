<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { flattenClasses } from '../../helpers/flattenClasses'
import {
  CARD_DEFAULT_VARIANT,
  type CardVariant,
  type UiCardProps,
  type UiCardSlots,
} from './types'

defineOptions({
  name: 'UiCard',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiCardProps>(), {
  variant: CARD_DEFAULT_VARIANT,
})

defineSlots<UiCardSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const cardTheme = appConfig.components?.card

if (!cardTheme) {
  throw new Error('[UnityUI] Card theme is not provided in appConfig.components.card.')
}

const normalizedVariant = computed<CardVariant>(() => props.variant ?? CARD_DEFAULT_VARIANT)

const rootClasses = computed(() => {
  return flattenClasses(
    cardTheme.base,
    cardTheme.variant[normalizedVariant.value],
  )
})

const contentClasses = computed(() => {
  return flattenClasses(cardTheme.slots.content)
})

const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})
</script>

<template>
  <div
      class="ui-card"
      :class="[rootClasses, attrs.class]"
      v-bind="attributes"
  >
    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>
