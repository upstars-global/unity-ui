<template>
  <div
      ref="roundMenu"
      class="ui-tabs"
      :class="rootClasses"
  >
    <template
        v-for="entry in menuItems"
        :key="entry.key"
    >
      <slot :item="entry.item">
        <UiTabsButton
            :item="entry.item"
            @select="handlerTabClick"
        />
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { flattenClasses } from '../../helpers/flattenClasses'
import UiTabsButton from './UiTabsButton.vue'
import type { UiTabsEmits, UiTabsItem, UiTabsProps } from './types.ts'

defineOptions({
  name: 'FeMenuRound',
})

const props = withDefaults(defineProps<UiTabsProps>(), {
  currentRefs: () => ({}),
})
const emit = defineEmits<UiTabsEmits>()

const appConfig = useAppConfig()
const tabsTheme = appConfig.components?.tabs

if (!tabsTheme) {
  throw new Error('[UnityUI] Tabs theme is not provided in appConfig.components.tabs.')
}

const roundMenu = ref<HTMLDivElement | null>(null)
const rootClasses = computed(() => flattenClasses(tabsTheme.base))
const menuItems = computed(() => {
  return props.menu.map((item) => ({
    item,
    key: typeof item.to === 'string' ? item.to : item.label,
  }))
})

onMounted(() => {
  roundMenu.value?.querySelector('[aria-current="page"], .active')?.scrollIntoView(false)
})

function handlerTabClick(item: UiTabsItem) {
  emit('changeTab', item)
}
</script>
