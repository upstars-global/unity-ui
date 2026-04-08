<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import type {
  UiReadMoreProps,
  UiReadMoreSlots,
} from './types'
import { useExpandableContent } from '../../composables/useExpandableContent'
import { useAppConfig } from '../../composables/useAppConfig'
import { flattenClasses } from '../../helpers/flattenClasses'
import UiButton from "@src/components/button/UiButton.vue";
import UiIcon from "@src/components/icon/UiIcon.vue";

defineOptions({
  name: 'ReadMoreBlock',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiReadMoreProps>(), {
  startHeight: 10,
  showLessButton: true,
  buttonLabel: () => ({
    more: 'Read more',
    less: 'Read less',
  }),
})

const slots = defineSlots<UiReadMoreSlots>()
const attrs = useAttrs()
const appConfig = useAppConfig()
const readMoreTheme = appConfig.components?.readMore

if (!readMoreTheme) {
  throw new Error('[UnityUI] ReadMore theme is not provided in appConfig.components.readMore.')
}

const {
  contentWrapper,
  content,
  contentStyle,
  isOpen,
  toggleContent,
} = useExpandableContent({
  collapsedHeight: props.startHeight,
  initialOpen: false,
  styleProperty: 'maxHeight',
})

const textButton = computed(() => {
  return isOpen.value ? props.buttonLabel.less : props.buttonLabel.more
})

const showMoreButton = computed(() => Boolean(slots.default))

const rootClasses = computed(() => {
  return flattenClasses(readMoreTheme.base, attrs.class)
})

const contentWrapperClasses = computed(() => {
  return flattenClasses(
    readMoreTheme.slots.contentWrapper,
    !isOpen.value && readMoreTheme.slots.collapsedOverlay,
  )
})
const leadingIconClass = computed(() => {
  return isOpen.value ? 'rotate-180': '';
})
const attributes = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})

function handleClickReadMore(): void {
  toggleContent()
}
</script>

<template>
  <div
    :class="rootClasses"
    v-bind="attributes"
  >
    <div
      ref="contentWrapper"
      :class="contentWrapperClasses"
      :style="contentStyle"
    >
      <div ref="content">
        <slot />
      </div>
    </div>

    <UiIcon
        name="fill_more"
        class="text-fg-secondary"
        v-show="!isOpen"
    />

    <UiButton
      v-if="showMoreButton && (!isOpen || showLessButton)"
      :class="readMoreTheme.slots.toggle"
      variant="tertiary"
      size="sm"
      leading-icon-name="line_dropdown_down"
      :leading-icon-class="leadingIconClass"
      @click.prevent="handleClickReadMore"
    >
      {{ textButton }}
    </UiButton>
  </div>
</template>
