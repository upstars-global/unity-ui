import { computed, ref, type Ref, watch } from 'vue'
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
  suggestListRef: _suggestListRef,
}: UseInputSuggestOptions): UseInputSuggestResult {
  const suggestItemPosition = ref(-1)
  const suggestListVisible = ref(true)

  const suggestListRendered = computed(() => {
    return Boolean(suggestList.value?.length) && suggestListVisible.value
  })

  function suggestListDisable() {
    suggestListVisible.value = false
    suggestItemPosition.value = -1
  }

  function suggestListShow() {
    suggestListVisible.value = true
  }

  watch(modelValue, () => {
    suggestListShow()
  })

  function selectSuggestItem(payload: { selectValue?: string } = {}) {
    if (!suggestListRendered.value || !payload.selectValue) {
      return
    }

    modelValue.value = suggestListReplacer.value?.(String(modelValue.value), payload.selectValue) ?? payload.selectValue
    suggestListDisable()
  }


  return {
    selectSuggestItem,
    suggestItemPosition,
    suggestListDisable,
    suggestListRendered,
  }
}
