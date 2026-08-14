<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../../composables/useAppConfig'
import UiIcon from '../../icon/UiIcon.vue'
import type {
  UiSuggestListItem,
  UiSuggestListProps,
  UiSuggestListSlots,
  UiSuggestListEmits,
  UiSuggestListExposed,
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

function selectItem(item: UiSuggestListItem, index: number, $event: Event) {
  if (item.disabled || selectedIndex.value === index) {
    return
  }

  emit('select', {
    item,
    index,
    label: item.label,
    value: item.value,
  })
}

defineExpose<UiSuggestListExposed>({
  getItemId,
})
</script>

<template>
  <div
    v-if="visible"
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
        class="ui-input-suggest__item flex shrink-0 grow-0 items-center cursor-pointer text-body font-medium text-nowrap text-left"
        :disabled="disabled || suggestItem.disabled"
        :aria-selected="selectedIndex === index"
        @click="selectItem(suggestItem, index, $event)"
      >
        <slot
          name="leading"
          :item="suggestItem"
          :active="false"
          :selected="selectedIndex === index"
        >
          <UiIcon
            v-if="suggestItem.leadingIconName || leadingIconName"
            :class="suggestTheme.slots.icon"
            :name="suggestItem.leadingIconName || leadingIconName"
            class="ui-input-suggest__leading-icon"
          />
        </slot>
        <slot
          :item="suggestItem"
          :selected="selectedIndex === index"
        >
          <span class="min-w-0 flex-1 truncate ui-input-suggest__label">
            {{ suggestItem.label }}
          </span>
        </slot>
        <UiIcon
            v-if="selectedIndex === index"
            name="line_check"
            class="text-fg-status-success"
        />
        <template v-else>
          <slot
              name="trailing"
              :item="suggestItem"
              :selected="selectedIndex === index"
          >
            <UiIcon
                v-if="suggestItem.trailingIconName || trailingIconName"
                class="ml-auto"
                :class="suggestTheme.slots.icon"
                :name="suggestItem.trailingIconName || trailingIconName"
            />
          </slot>
        </template>
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
