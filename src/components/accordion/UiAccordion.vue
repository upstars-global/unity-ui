<script setup lang="ts">
import { useAppConfig } from '../../composables/useAppConfig'
import type { UiAccordionProps } from './types.ts'
import { computed } from 'vue'
import { flattenClasses } from '../../helpers/flattenClasses.ts'
import UiBaseAccordion from "../baseAccordion/UiBaseAccordion.vue";

defineOptions({
  name: 'UiAccordion',
  inheritAttrs: false
})

withDefaults(defineProps<UiAccordionProps>(), {
  title: 'Dropdown',
  defaultOpened: false,
})


const slots = defineSlots<{
  default?: () => unknown
  action?: () => unknown
}>()
const appConfig = useAppConfig()
const theme = appConfig.components?.accordion;

const rootClasses = computed(() => {
  return flattenClasses(
    theme?.base
  )
})

</script>

<template>
  <UiBaseAccordion
      :title="title"
      :root-classes="rootClasses"
      toggle-classes="flex text-center items-center justify-center w-full relative"
      title-classes="text-body font-bold"
      icon-classes="absolute top-0 right-0 transition-transform"
      content-classes="pt-4 pb-2"
      :default-opened="defaultOpened"
  >
    <template #default>
      <slot />
      <div
        v-if="slots.action"
        class="flex items-center justify-center w-full mt-4"
      >
        <slot name="action" />
      </div>
    </template>
  </UiBaseAccordion>
</template>
