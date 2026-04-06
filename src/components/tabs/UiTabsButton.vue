<template>
  <button
      :class="itemClasses"
      :data-test="item.dataTest"
      :disabled="item.disabled"
      :aria-current="isActive ? 'page' : undefined"
      @click="handleClick"
  >
    <span
        v-if="item.accent"
        :class="tabsTheme.slots.accent"
        aria-hidden="true"
    />
    <span :class="tabsTheme.slots.label">
      {{ item.label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppConfig } from '../../composables/useAppConfig'
import { flattenClasses } from '../../helpers/flattenClasses'
import type { UiTabsItem } from './types.ts'

defineOptions({
  name: 'UiTabsButton',
})

const props = defineProps<{
  item: UiTabsItem
}>()

const emit = defineEmits<{
  (event: 'select', value: UiTabsItem): void
}>()

const router = useRouter()
const route = useRoute()
const appConfig = useAppConfig()
const tabsTheme = appConfig.components?.tabs

if (!tabsTheme) {
  throw new Error('[UnityUI] Tabs theme is not provided in appConfig.components.tabs.')
}

const isActive = computed(() => {
  if (!props.item.to) {
    return false
  }

  return router.resolve(props.item.to).fullPath === route.fullPath
})

const itemClasses = computed(() => {
  return flattenClasses(
    tabsTheme.item.base,
    tabsTheme.item.default,
    !isActive.value && tabsTheme.item.hover,
    isActive.value && tabsTheme.item.selected,
    props.item.disabled && tabsTheme.item.disabled,
  )
})


function handleClick() {
  if (props.item.disabled) {
    return
  }

  if (props.item.to) {
    router.push(props.item.to)
  }

  emit('select', props.item)
}
</script>
