<script setup lang="ts">
import { computed } from 'vue'

import type {
  UiReadMoreProps,
  UiReadMoreSlots,
} from './types'
import { useExpandableContent } from '../../composables/useExpandableContent'
import UiLink from '../link/UiLink.vue'

defineOptions({
  name: 'ReadMoreBlock',
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

function handleClickReadMore(): void {
  toggleContent()
}
</script>

<template>
  <div>
    <div
        ref="contentWrapper"
        :class="{
            'after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-full after:w-full after:content-empty': !isOpen
        }"
        :style="contentStyle"
        class="relative overflow-hidden transition-height"
    >
      <div ref="content">
        <slot />
      </div>
    </div>

    <UiLink
        v-if="showMoreButton && (!isOpen || showLessButton)"
        class="mt-4 block cursor-pointer"
        @click.prevent="handleClickReadMore"
    >
      {{ textButton }}
    </UiLink>
  </div>
</template>
