<template>
    <div
        class="modal-content ui-modal-content"
        :class="modalContentClasses"
        data-test="modal-content"
    >
      <slot
          name="header"
          v-if="!modal.hideHeaderToolbar"
      >
        <UiModalHeaderDefault
            :title="modal.title"
            :hide-close-button="modal.hideCloseButton"
            :modal-name="modal.name"
            @close="close"
        >
          <template
              v-if="$slots['header-left']"
              #left
          >
            <slot name="header-left" />
          </template>
          <template
              v-if="$slots['header-right']"
              #right
          >
            <slot name="header-right" />
          </template>
        </UiModalHeaderDefault>
      </slot>
      <div
          class="ui-modal-content__body"
          data-test="modal-common__body"
      >
        <div
            ref="scroller"
            class="ui-modal-content__scroll"
            :class="{ 'ui-modal-content__scroll--scrollable': isScrollable }"
        >
          <div ref="scrollContent">
            <slot />
          </div>
        </div>
        <template v-if="!modal.hideScrollFade">
          <div
              class="ui-modal-content__fade ui-modal-content__fade--top"
              :class="{ 'ui-modal-content__fade--visible': showTop }"
              aria-hidden="true"
          />
          <div
              class="ui-modal-content__fade ui-modal-content__fade--bottom"
              :class="{ 'ui-modal-content__fade--visible': showBottom }"
              aria-hidden="true"
          />
        </template>
      </div>
      <slot
          v-if="modal.showFooter"
          name="bottom-side-under-scroll"
      >
        <UiModalFooterDefault
            v-if="modal.footer"
            v-bind="modal.footer"
            @primary="emits('clickPrimary', $event)"
            @secondary="emits('clickSecondary', $event)"
        />
      </slot>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import UiModalHeaderDefault from './headers/default/UiModalHeaderDefault.vue'
import UiModalFooterDefault from './footers/default/UiModalFooterDefault.vue'
import type { IModalOptions } from './types'
import { useScrollFade } from './useScrollFade'

defineOptions({
    name: 'ModalCommonSlot',
})

const props = defineProps<{
  modal: IModalOptions
}>()

const emits = defineEmits<{
  (event: 'clickCloseButton'): void
  (event: 'clickPrimary', value: MouseEvent): void
  (event: 'clickSecondary', value: MouseEvent): void
}>()

const modalContentClasses = computed(() => ({
  'ui-modal-content--fullscreen': props.modal.fullScreen,
  'ui-modal-content--hug': props.modal.hug && !props.modal.fullScreen,
}))

const scroller = ref<HTMLElement | null>(null)
const scrollContent = ref<HTMLElement | null>(null)
const { state: scrollState, showTop, showBottom } = useScrollFade(scroller, scrollContent)
const isScrollable = computed(() => scrollState.value !== 'none')

function close() {
  emits('clickCloseButton')
}

</script>
