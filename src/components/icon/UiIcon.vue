<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import type { UiThemeIconName } from '../../themes/registry'

type IconSize = '24' | '72' | 'full'

interface UiIconProps {
  name?: UiThemeIconName
  size?: IconSize
}

const SIZE_CLASSES_LIST: Record<IconSize, string> = {
  '24': 'w-6 h-6',
  '72': 'w-18 h-18',
  full: 'w-full h-full'
}

defineOptions({
  name: 'UiIcon',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiIconProps>(), {
  name: undefined,
  size: '24',
  ui: undefined
})

const appConfig = useAppConfig()
const iconRaw = computed(() => {
  if (!props.name) {
    return
  }
  return appConfig.icons?.[props.name]
})

const className = computed(() => {

  return [
    'ui-icon',
    SIZE_CLASSES_LIST[props.size],
  ]
})
</script>

<template>
  <div v-if="iconRaw" :class="className" v-html="iconRaw" />
</template>
