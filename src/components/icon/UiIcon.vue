<script setup lang="ts">
import {computed, useAttrs} from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import type { UiThemeIconName } from '../../themes/registry'

type IconSize = '16' | '24' | '72' | 'full'

interface UiIconProps {
  name?: UiThemeIconName
  size?: IconSize
}

const SIZE_CLASSES_LIST: Record<IconSize, string> = {
  '16': 'w-4 h-4',
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

const attrs = useAttrs()

const appConfig = useAppConfig()
const iconRaw = computed(() => {
  if (!props.name) {
    return
  }
  return appConfig.icons?.[props.name]
})

const className = computed(() => {
  return [
    SIZE_CLASSES_LIST[props.size],
    attrs.class
  ]
})
</script>

<template>
  <div class="ui-icon shrink-0" v-if="iconRaw" :class="className" v-html="iconRaw"  />
</template>
