import { computed, ref, watch, type Ref } from 'vue'

export type InputSuggestValue = string | number
export type InputSuggestReplacer = (value: string, replacement?: string) => string
export type InputSuggestChangeEmit = (event: 'input:change', value: InputSuggestValue) => void

export interface UseInputSuggestOptions {
  modelValue: Ref<InputSuggestValue>
  suggestList: Ref<string[] | undefined>
  suggestListReplacer: Ref<InputSuggestReplacer | undefined>
  suggestListRef: Ref<HTMLElement | null>
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
}: UseInputSuggestOptions): UseInputSuggestResult {
  const suggestItemPosition = ref(-1)
  const suggestListVisible = ref(true)

  const suggestListRendered = computed(() => {
    return Boolean(suggestList.value?.length) && suggestListVisible.value
  })

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
    if (!suggestListRendered.value) {
      return
    }

    const suggestItemValue = payload.selectValue || suggestList.value?.[suggestItemPosition.value]
    const nextValue = suggestListReplacer.value?.(String(modelValue.value), suggestItemValue) || modelValue.value

    suggestListDisable()
  }

  function keydownSuggestHandler(event: KeyboardEvent) {

    if (!suggestListRendered.value) {
      return
    }

    event.preventDefault()

    if (
      event.key === 'ArrowDown' &&
      suggestItemPosition.value >= -1 &&
      suggestItemPosition.value < (suggestList.value?.length ?? 0) - 1
    ) {
      suggestItemPosition.value += 1
    } else if (event.key === 'ArrowUp' && suggestItemPosition.value >= 0) {
      suggestItemPosition.value -= 1
    }

    /*scrollToSuggestItem()*/
  }

  return {
    keydownSuggestHandler,
    selectSuggestItem,
    suggestItemPosition,
    suggestListDisable,
    suggestListRendered,
  }
}
