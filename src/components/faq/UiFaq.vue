<script setup lang="ts">
import type { UiFAQProps } from "./types.ts";
import UiBaseAccordion from "../baseAccordion/UiBaseAccordion.vue";
import { ref } from "vue";
import { useAppConfig } from '../../composables/useAppConfig'
import { flattenClasses } from '../../helpers/flattenClasses.ts'

defineProps<UiFAQProps>();

const appConfig = useAppConfig()
const theme = appConfig.components?.faq;

const openedIndex = ref<number | null>(null)

const handleAccordionToggle = (index: number, value: boolean) => {
  openedIndex.value = value ? index : null
}

const getRootClasses = (index: number) => {
  return flattenClasses(
    theme?.base,
    openedIndex.value === index ? theme?.states.opened : theme?.states.default
  )
}
</script>

<template>
<div class="ui-faq">
  <slot name="title">
    <p class="text-center text-title-md mx-auto mb-4">{{ title }}</p>
  </slot>
  <div class="flex flex-col gap-8">
    <UiBaseAccordion
        v-for="(question, index) in questions"
        :key="index"
        :title="question.question"
        :opened="openedIndex === index"
        :root-classes="getRootClasses(index)"
        toggle-classes="flex items-center justify-between w-full cursor-pointer"
        title-classes="text-body font-bold"
        icon-classes="transition-transform"
        content-classes="pt-4 pb-2 text-body text-fg-secondary"
        @toggle="handleAccordionToggle(index, $event)"
    >
      {{question.answer}}
    </UiBaseAccordion>
  </div>
</div>
</template>
