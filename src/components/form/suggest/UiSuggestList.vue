<script setup lang="ts">
import { computed } from 'vue'
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
    :class="{
      'ui-input-suggest--floating': variant === 'floating',
      'ui-input-suggest--embedded': variant === 'embedded',
    }"
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
        class="ui-input-suggest__item"
        :disabled="disabled || suggestItem.disabled"
        :aria-selected="selectedIndex === index"
        @click="selectItem(suggestItem, index)"
      >
        <slot
          name="leading"
          :item="suggestItem"
          :active="false"
          :selected="selectedIndex === index"
        >
          <UiIcon
            v-if="suggestItem.leadingIconName || leadingIconName"
            :name="suggestItem.leadingIconName || leadingIconName"
            class="ui-input-suggest__icon ui-input-suggest__leading-icon"
          />
        </slot>
        <slot
          :item="suggestItem"
          :selected="selectedIndex === index"
        >
          <div class="flex flex-col min-w-0 flex-1" >
            <span
                v-if="suggestItem.additionalLabel"
                class="ui-input-suggest__additional-label"
            >
              {{ suggestItem.additionalLabel }}
            </span>
            <span class="ui-input-suggest__label">
              {{ suggestItem.label }}
            </span>
          </div>
        </slot>
        <UiIcon
            v-if="selectedIndex === index"
            name="line_check"
            class="ui-input-suggest__icon"
        />
        <template v-else>
          <slot
              name="trailing"
              :item="suggestItem"
              :selected="selectedIndex === index"
          >
            <UiIcon
                v-if="suggestItem.trailingIconName || trailingIconName"
                class="ui-input-suggest__icon ui-input-suggest__trailing-icon"
                :name="suggestItem.trailingIconName || trailingIconName"
            />
          </slot>
        </template>
      </button>
    </template>
    <template v-else>
      <slot name="empty">
        <div class="ui-input-suggest__empty">
          {{ emptyText }}
        </div>
      </slot>
    </template>
  </div>
</template>
