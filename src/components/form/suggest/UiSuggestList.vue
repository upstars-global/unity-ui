<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAppConfig } from '../../../composables/useAppConfig'
import { useSuggestListNavigation } from '../../../composables/useSuggestListNavigation'
import UiIcon from '../../icon/UiIcon.vue'
import type {
  UiSuggestListEmits,
  UiSuggestListExposed,
  UiSuggestListItem,
  UiSuggestListProps,
  UiSuggestListSlots,
} from './types.ts'

defineOptions({
  name: 'UiSuggestList',
})

const props = withDefaults(defineProps<UiSuggestListProps>(), {
  items: () => [],
  visible: false,
  disabled: false,
  emptyText: 'No options',
  trailingIconName: 'line_arrow_top_left',
  selectedValue: null,
  variant: 'floating',
  idPrefix: undefined,
  closeOnClickOutside: undefined,
})

const emit = defineEmits<UiSuggestListEmits>()
defineSlots<UiSuggestListSlots>()

const appConfig = useAppConfig()
const suggestTheme = appConfig.components.suggest
const rootRef = ref<HTMLElement | null>(null)

const normalizedItems = computed<UiSuggestListItem[]>(() => {
  return props.items.map((item) => {
    if (typeof item === 'string') {
      return {
        label: item,
        value: item,
      }
    }

    return item
  })
})

const selectedIndex = computed(() => {
  if (props.selectedValue === null || props.selectedValue === undefined) {
    return -1
  }

  return normalizedItems.value.findIndex((item) => item.value === props.selectedValue)
})

const isFloating = computed(() => props.variant === 'floating')
const shouldCloseOnClickOutside = computed(() => props.closeOnClickOutside ?? isFloating.value)
const rootClasses = computed(() => {
  return [
    suggestTheme.base,
    isFloating.value ? suggestTheme.slots.floating : suggestTheme.slots.embedded,
    suggestTheme.slots.panel,
  ]
})

const {
  activeIndex,
  focusFirst,
  focusLast,
  handleKeydown,
  selectActiveItem,
  setActiveIndex,
  syncActiveIndex,
} = useSuggestListNavigation({
  items: normalizedItems,
  listRef: rootRef,
  onActiveChange({ item, index }) {
    emit('active-change', { item, index })
  },
  onSelect({ item, index }) {
    emit('select', {
      item,
      index,
      label: item.label,
      value: item.value,
    })
  },
})

function getItemId(index: number) {
  if (!props.idPrefix) {
    return undefined
  }

  return `${props.idPrefix}-${index}`
}

function handlerClickOutside(event: Event) {
  if (!shouldCloseOnClickOutside.value) {
    return
  }

  emit('close', event)
}

function selectItem(item: UiSuggestListItem, index: number) {
  if (item.disabled) {
    return
  }

  setActiveIndex(index)
  emit('select', {
    item,
    index,
    label: item.label,
    value: item.value,
  })
}

function handleMouseEnter(item: UiSuggestListItem, index: number) {
  if (item.disabled) {
    return
  }

  setActiveIndex(index)
  emit('hover', {
    item,
    index,
    label: item.label,
    value: item.value,
  })
}

watch([() => props.visible, selectedIndex], ([visible, index]) => {
  if (visible) {
    syncActiveIndex(index)
  }
})

defineExpose<UiSuggestListExposed>({
  get activeIndex() {
    return activeIndex.value
  },
  handleKeydown,
  setActiveIndex,
  syncActiveIndex,
  focusFirst,
  focusLast,
  selectActiveItem,
  getItemId,
})
</script>

<template>
  <div
    v-if="visible"
    ref="rootRef"
    v-click-outside="handlerClickOutside"
    class="ui-input-suggest"
    :class="rootClasses"
    role="listbox"
  >
    <template v-if="normalizedItems.length">
      <button
        v-for="(suggestItem, index) in normalizedItems"
        :id="getItemId(index)"
        :key="`${suggestItem.value}`"
        :data-suggest-index="index"
        type="button"
        role="option"
        class="ui-input-suggest__item text-left"
        :disabled="disabled || suggestItem.disabled"
        :aria-selected="selectedIndex === index"
        :data-active="activeIndex === index"
        :class="suggestTheme.slots.item"
        @mouseenter="handleMouseEnter(suggestItem, index)"
        @click="selectItem(suggestItem, index)"
      >
        <slot
          name="leading"
          :item="suggestItem"
          :active="activeIndex === index"
          :selected="selectedIndex === index"
        >
          <UiIcon
            v-if="suggestItem.leadingIconName || leadingIconName"
            :class="suggestTheme.slots.icon"
            :name="suggestItem.leadingIconName || leadingIconName"
          />
        </slot>
        <slot
          :item="suggestItem"
          :active="activeIndex === index"
          :selected="selectedIndex === index"
        >
          <span class="min-w-0 flex-1 truncate">
            {{ suggestItem.label }}
          </span>
        </slot>
        <slot
          name="trailing"
          :item="suggestItem"
          :active="activeIndex === index"
          :selected="selectedIndex === index"
        >
          <UiIcon
            v-if="suggestItem.trailingIconName || trailingIconName"
            class="ml-auto"
            :class="suggestTheme.slots.icon"
            :name="suggestItem.trailingIconName || trailingIconName"
          />
        </slot>
      </button>
    </template>
    <template v-else>
      <slot name="empty">
        <div :class="suggestTheme.slots.empty">
          {{ emptyText }}
        </div>
      </slot>
    </template>
  </div>
</template>
