import {computed, ref, type Ref, watch} from 'vue'
import type {UiSuggestListExposed} from '../components/form/suggest/types'

export type InputSuggestValue = string | number
export type InputSuggestReplacer = (value: string, replacement?: string) => string
export type InputSuggestChangeEmit = (event: 'input:change', value: InputSuggestValue) => void

export interface UseInputSuggestOptions {
  modelValue: Ref<InputSuggestValue>
  suggestList: Ref<string[] | undefined>
  suggestListReplacer: Ref<InputSuggestReplacer | undefined>
  suggestListRef: Ref<UiSuggestListExposed | null>
}

export interface UseInputSuggestResult {
  keydownSuggestHandler: (event: KeyboardEvent) => void
  selectSuggestItem: (payload?: { selectValue?: string }) => void
  suggestItemPosition: Ref<number>
  suggestListDisable: () => void
  suggestListRendered: Readonly<Ref<boolean>>
}

export function useInputSuggest({
  modelValue,
  suggestList,
  suggestListReplacer,
  suggestListRef,
}: UseInputSuggestOptions): UseInputSuggestResult {
  const suggestItemPosition = ref(-1)
  const suggestListVisible = ref(true)

  const suggestListRendered = computed(() => {
    return Boolean(suggestList.value?.length) && suggestListVisible.value
  })

  function syncSuggestPosition() {
    suggestItemPosition.value = suggestListRef.value?.activeIndex ?? -1
  }

  function suggestListDisable() {
    suggestListVisible.value = false
  }

  function suggestListShow() {
    suggestListVisible.value = true
  }

  watch(modelValue, () => {
    suggestListShow()
  })

  function selectSuggestItem(payload: { selectValue?: string } = {}) {
    if (!suggestListRendered.value || !suggestListRef.value) {
      return
    }

    if (payload.selectValue) {
      const index = suggestList.value?.findIndex((item) => item === payload.selectValue) ?? -1

      if (index >= 0) {
        suggestListRef.value.setActiveIndex(index)
      }
    }

    const selectedItem = suggestListRef.value.selectActiveItem()

    if (!selectedItem) {
      return
    }

    modelValue.value = suggestListReplacer.value?.(String(modelValue.value), String(selectedItem.value)) ?? selectedItem.value
    syncSuggestPosition()
    suggestListDisable()
  }

  function keydownSuggestHandler(event: KeyboardEvent) {
    if (!suggestListRendered.value || !suggestListRef.value) {
      return
    }

    const handled = suggestListRef.value.handleKeydown(event)

    if (handled) {
      syncSuggestPosition()
      return
    }

    if (event.key === 'Escape') {
      suggestListDisable()
    }
  }

  return {
    keydownSuggestHandler,
    selectSuggestItem,
    suggestItemPosition,
    suggestListDisable,
    suggestListRendered,
  }
}
