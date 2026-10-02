<script setup lang="ts">
import UiIcon from '../icon/UiIcon.vue'
import type {
  CarouselDirection,
  UiCarouselNavigationEmits,
  UiCarouselNavigationProps,
} from './types'

defineOptions({
  name: 'UiCarouselNavigation',
})

withDefaults(defineProps<UiCarouselNavigationProps>(), {
  backward: false,
  forward: false,
  previousLabel: 'Previous slide',
  nextLabel: 'Next slide',
})

const emit = defineEmits<UiCarouselNavigationEmits>()

function change(direction: CarouselDirection) {
  emit('change', direction)
}
</script>

<template>
  <div
    class="ui-carousel-navigation"
  >
    <button
      v-show="backward"
      type="button"
      class="ui-carousel-navigation__button ui-carousel-navigation__button--previous"
      :aria-label="previousLabel"
      @click="change(-1)"
    >
      <UiIcon
        name="line_dropdown_left"
        size="16"
      />
    </button>

    <button
      v-show="forward"
      type="button"
      class="ui-carousel-navigation__button ui-carousel-navigation__button--next"
      :aria-label="nextLabel"
      @click="change(1)"
    >
      <UiIcon
        name="line_dropdown_right"
        size="16"
      />
    </button>
  </div>
</template>
