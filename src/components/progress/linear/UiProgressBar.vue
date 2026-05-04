<script setup lang="ts">
import type { UiLinearProgressProps } from './types.ts'
import { useAppConfig } from '../../../composables/useAppConfig'

defineOptions({
  name: 'ProgressBar',
})

withDefaults(defineProps<UiLinearProgressProps>(), {
  progress: 0,
})

const appConfig = useAppConfig()
const linearProgressTheme = appConfig.components?.linearProgress

</script>

<template>
  <div :class="linearProgressTheme.base">
    <slot name="top" />
    <div class="flex items-center gap-2">
      <div
          :class="linearProgressTheme.full"
      >
        <div
            :class="linearProgressTheme.progress"
            :style="{width: progress + '%'}"
        />
      </div>
      <span class="font-bold text-fg-primary"><slot name="left" /></span>
    </div>
    <slot name="bottom" />
  </div>
</template>
