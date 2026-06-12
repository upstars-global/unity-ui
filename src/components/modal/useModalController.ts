import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import { useEventBus } from '../../composables/useEventBus.ts'
import type { IModalOptions, UiModalClosePayload } from './types'
import {bodyDisableScroll} from "../../helpers/bodyDisableScroll.ts";

function insertModal(modals: IModalOptions[], modal: IModalOptions) {
  return [...modals, modal]
}

export function useModalController() {
  const bus = useEventBus()
  const modals = ref<IModalOptions[]>([])
  const showModal = computed(() => modals.value.length > 0)

  function remove(name?: string) {
    if (!modals.value.length) {
      return undefined
    }

    if (!name) {
      const removedModal = modals.value[modals.value.length - 1]
      modals.value = modals.value.slice(0, -1)
      return removedModal
    }

    const removedModal = modals.value.find((modal) => modal.name === name)
    modals.value = modals.value.filter((modal) => modal.name !== name)

    return removedModal
  }

  function show(modal: IModalOptions) {
    modals.value = insertModal(
      modals.value.filter((item) => item.name !== modal.name),
        modal,
    )
  }

  function close(payload?: string | UiModalClosePayload) {
    const name = typeof payload === 'string' ? payload : payload?.name
    const removedModal = remove(name)
    removedModal?.callback?.()
  }

  watch(() => showModal.value, (value) => {
    bodyDisableScroll(value);
})

  onMounted(() => {
    bus?.$on('modal.show', show)
    bus?.$on('modal.close', close)
  })

  onBeforeUnmount(() => {
    bus?.$off('modal.show', show)
    bus?.$off('modal.close', close)
  })

  return {
    modals,
    showModal,
    show,
    close,
    remove,
  }
}
