<script setup lang="ts">
import UiIcon from "../../icon/UiIcon.vue";
import type {UiSuggestListEmits, UiSuggestListProps} from "./types.ts";
import { useAppConfig } from '../../../composables/useAppConfig'

withDefaults(defineProps<UiSuggestListProps>(), {
  items: [],
  visible: false,
  activeIndex: 0,
  disabled: false,

})
const emit = defineEmits<UiSuggestListEmits>()
const appConfig = useAppConfig()
const suggestTheme = appConfig.components.suggest


function handlerClickOutside(event: any) {
  emit('close', event)
}
function selectItem(value: string, index: number) {
  emit('select', {value, index})
}
</script>

<template>
  <div
      v-if="visible"
      ref="suggestListRef"
      v-click-outside="handlerClickOutside"
      class="ui-input-suggest"
      :class="suggestTheme.base"
  >
    <div
        v-for="(suggestItem, index) in items"
        :key="suggestItem"
        class="ui-input-suggest__item"
        :aria-selected="activeIndex === index"
        :class="suggestTheme.slots.item"
        @click="selectItem(suggestItem, index)"
    >
      {{ suggestItem }}
      <UiIcon
          name="line_arrow_top_left"
      />
    </div>
  </div>
</template>