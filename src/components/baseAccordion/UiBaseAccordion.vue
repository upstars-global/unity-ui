<script setup lang="ts">
import { useAppConfig } from '../../composables/useAppConfig.ts'
import { useExpandableContent } from '../../composables/useExpandableContent.ts'
import UiIcon from '../icon/UiIcon.vue'
import type {
  UiBaseAccordionProps,
  UiBaseAccordionSlots,
} from './types.ts'
import { computed, watch } from "vue";

defineOptions({
  name: 'UiBaseAccordion',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiBaseAccordionProps>(), {
  title: '',
  content: '',
  defaultOpened: false,
})

const emit = defineEmits<{
  toggle: [value: boolean]
}>()

const slots = defineSlots<UiBaseAccordionSlots>()

const appConfig = useAppConfig()

const {
  contentWrapper,
  content,
  contentStyle,
  isOpen,
  setOpen,
  toggleContent,
} = useExpandableContent({
  collapsedHeight: 0,
  initialOpen: props.defaultOpened,
  isServer: appConfig.store?.env?.isServer,
  styleProperty: 'maxHeight',
})

watch(
  () => props.opened,
  (opened) => {
    if (opened !== isOpen.value) {
      setOpen(opened)
    }
  },
  { immediate: true }
)

const iconClassesList = computed(() => {
  return [
    props.iconClasses,
    {
      'rotate-180': isOpen.value,
    }
  ]
})

const handleToggle = () => {
  if (typeof props.opened === 'boolean') {
    emit('toggle', !props.opened)
    return
  }

  toggleContent()
  emit('toggle', isOpen.value)
}
</script>

<template>
  <div
      :class="rootClasses"
  >
    <div
        :class="toggleClasses"
        @click="handleToggle"
    >
      <span :class="titleClasses">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <UiIcon
          :class="iconClassesList"
          name="line_dropdown_down"
      />
    </div>

    <div
        ref="contentWrapper"
        class="overflow-hidden transition-height"
        :style="contentStyle"
    >
      <div
          ref="content"
          :class="contentClasses"
      >
        <slot>
          {{ content }}
        </slot>
      </div>
    </div>
  </div>
</template>
