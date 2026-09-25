<script setup lang="ts">
import { ref, toRef } from 'vue'
import UiIcon from '../../icon/UiIcon.vue'
import type { SMCNotificationEmits, SMCNotificationProps, SMCNotificationSlots } from './types'
import { useNotificationCountdown } from './useNotificationCountdown'

defineOptions({ name: 'SMCNotification' })

const props = withDefaults(defineProps<SMCNotificationProps>(), {
  titleHtml: '',
  messageHtml: '',
  imageUrl: '',
  duration: 7,
})
const emit = defineEmits<SMCNotificationEmits>()
defineSlots<SMCNotificationSlots>()

const visible = ref(true)
const { phase, dismiss } = useNotificationCountdown(toRef(props, 'duration'), () => { visible.value = false })
const progressElement = ref<HTMLElement>()

function handleDismiss() {
  if (phase.value === 'active') return

  const element = progressElement.value
  if (element) {
    element.animate(
      [{ transform: getComputedStyle(element).transform }, { transform: 'translateX(0)' }],
      { duration: 300, easing: 'ease-out' },
    )
  }
  dismiss()
}
</script>

<template>
  <Transition appear name="smc-notification" @after-leave="emit('dismiss')">
    <div v-if="visible" class="smc-notification select-none" data-test="smc-notification" @click.capture="handleDismiss">
      <div class="smc-notification__card rounded-b-24 p-16 md:rounded-24">
        <div
          class="grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-stretch gap-8"
        >
          <div class="smc-notification__copy min-w-0 flex flex-col gap-4 md:gap-8">
            <div v-if="titleHtml" class="smc-notification__title line-clamp-2 text-title-sm" v-html="titleHtml" />
            <div v-if="messageHtml" class="smc-notification__message line-clamp-3 text-body" v-html="messageHtml" />
          </div>
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="smc-notification__image shrink-0 object-contain"
          />
        </div>
        <div v-if="$slots.actions" class="smc-notification__actions mt-16 flex gap-8">
          <slot name="actions" />
        </div>
      </div>

      <div
        class="smc-notification__dismiss relative mx-auto mt-4 flex h-40 w-fit cursor-pointer items-center gap-4 overflow-hidden rounded-full border-2 pl-16 pr-8 text-body-sm transition-colors duration-200"
        :class="{ 'smc-notification__dismiss--active': phase === 'active' }"
      >
        <span
          ref="progressElement"
          class="smc-notification__progress absolute"
          :class="{
            'smc-notification__progress--running': phase === 'running',
            'smc-notification__progress--active': phase === 'active',
          }"
          :style="{ animationDuration: `${Math.max(0, duration)}s` }"
          aria-hidden="true"
        />
        <span class="relative">{{ dismissLabel }}</span>
        <UiIcon name="fill_close" size="24" class="relative" aria-hidden="true" />
      </div>
    </div>
  </Transition>
</template>
