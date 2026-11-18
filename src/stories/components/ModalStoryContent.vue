<script setup lang="ts">
import { computed, ref } from 'vue'
import UiBadge from '../../components/badge/UiBadge.vue'
import UiButton from '../../components/button/UiButton.vue'
import UiIcon from '../../components/icon/UiIcon.vue'
import ModalCommonSlot from '../../components/modal/ModalCommonSlot.vue'
import UiModalHeaderDefault from '../../components/modal/headers/default/UiModalHeaderDefault.vue'
import type { IModalOptions } from '../../components/modal/types'
import modalApi from '../../plugins/modal'

export type ModalStoryFooter = 'slot' | 'single' | 'horizontal' | 'vertical'
export type ModalStoryHeader = 'title' | 'back' | 'logo' | 'custom'
export type ModalStoryContentVariant = 'compact' | 'short' | 'long' | 'list' | 'dynamic'

export interface ModalStoryOptions extends IModalOptions {
  contentVariant?: ModalStoryContentVariant
  headerVariant?: ModalStoryHeader
  footerType?: ModalStoryFooter
}

const props = defineProps<{
  modal: ModalStoryOptions
}>()

const PARAGRAPH =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const LIST_ITEMS = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Transaction #${1000 + index}`,
  amount: `${(index + 1) * 25} €`,
  done: index % 3 !== 0,
}))

const contentVariant = computed(() => props.modal.contentVariant ?? 'short')
const headerVariant = computed(() => props.modal.headerVariant ?? 'title')
const footerType = computed(() => props.modal.footerType ?? 'vertical')

// `dynamic`: content grows/shrinks while the modal is open, so the fades
// have to appear and disappear without a scroll event
const dynamicCount = ref(1)

const paragraphs = computed(() => {
  switch (contentVariant.value) {
    case 'compact':
      return ['Short text, the width follows it.']
    case 'long':
      return Array.from({ length: 12 }, () => PARAGRAPH)
    case 'dynamic':
      return Array.from({ length: dynamicCount.value }, () => PARAGRAPH)
    case 'list':
      return []
    default:
      return [PARAGRAPH, PARAGRAPH]
  }
})

function close() {
  modalApi.close({ name: props.modal.name, clickOnCloseButton: true })
}
</script>

<template>
  <ModalCommonSlot
    :modal="modal"
    @click-close-button="close"
    @click-primary="close"
    @click-secondary="close"
  >
    <!-- Header: left area — back arrow -->
    <template
      v-if="headerVariant === 'back'"
      #header-left
    >
      <button
        type="button"
        class="flex h-full w-full items-center justify-center"
        aria-label="Back"
        @click="close"
      >
        <UiIcon name="line_arrow_back" />
      </button>
    </template>

    <!-- Header: left area — logo -->
    <template
      v-else-if="headerVariant === 'logo'"
      #header-left
    >
      <span class="flex h-full w-full items-center justify-center rounded-full bg-primary-500 text-tiny font-bold text-white">
        U
      </span>
    </template>

    <!-- Header: whole header replaced, default header component with a custom title -->
    <template
      v-if="headerVariant === 'custom'"
      #header
    >
      <UiModalHeaderDefault
        :hide-close-button="modal.hideCloseButton"
        :modal-name="modal.name"
        @close="close"
      >
        <template #title>
          <span class="inline-flex max-w-full items-center gap-8">
            <span class="truncate">{{ modal.title }}</span>
            <UiBadge variant="navigation-new" label="NEW" />
          </span>
        </template>
      </UiModalHeaderDefault>
    </template>

    <!-- Header/footer bring their own padding; without them the content keeps the same offset -->
    <div
      class="flex flex-col gap-12 px-16 md:px-24"
      :class="{
        'pt-16 md:pt-24': modal.hideHeaderToolbar,
        'pb-16 md:pb-24': !modal.showFooter,
      }"
    >
      <div class="flex flex-wrap gap-8">
        <UiBadge variant="status-success" label="ACTIVE" />
        <UiBadge variant="navigation-new" label="NEW" />
      </div>

      <div
        v-if="contentVariant === 'dynamic'"
        class="flex flex-wrap items-center gap-8"
      >
        <UiButton variant="secondary" size="sm" @click="dynamicCount += 1">
          Add paragraph
        </UiButton>
        <UiButton
          variant="tertiary"
          size="sm"
          :disabled="dynamicCount === 0"
          @click="dynamicCount -= 1"
        >
          Remove
        </UiButton>
        <span class="text-caption text-page-secondary">{{ dynamicCount }} paragraph(s)</span>
      </div>

      <ul
        v-if="contentVariant === 'list'"
        class="flex flex-col gap-8"
      >
        <li
          v-for="item in LIST_ITEMS"
          :key="item.id"
          class="flex items-center justify-between gap-8 rounded-12 bg-page-deep px-12 py-8"
        >
          <span class="text-body">{{ item.name }}</span>
          <span class="flex items-center gap-8">
            <span class="text-caption text-page-secondary">{{ item.amount }}</span>
            <UiBadge
              :variant="item.done ? 'status-success' : 'status-warning'"
              :label="item.done ? 'DONE' : 'PENDING'"
            />
          </span>
        </li>
      </ul>

      <p
        v-for="(text, index) in paragraphs"
        :key="index"
        class="text-body text-page-secondary"
      >
        {{ text }}
      </p>
    </div>

    <!-- Without this override the slot falls back to UiModalFooterDefault (modal.footer) -->
    <template
      v-if="footerType === 'slot'"
      #bottom-side-under-scroll
    >
      <p class="w-full p-16 text-body text-page-secondary md:p-24">
        Custom footer slot content
      </p>
    </template>
  </ModalCommonSlot>
</template>
