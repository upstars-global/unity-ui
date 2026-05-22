<template>
    <div
        v-show="showModal"
        class="modal-container"
        :class="theme?.base"
    >
        <transition-group
            :name="isMobile ? 'modal-mobile' : 'modal'"
            tag="div"
        >
            <div
                v-for="modal in modals"
                :key="modal.name"
                class="modal-item w-full h-full fixed top-0 left-0 bottom-0 flex md:items-center items-end justify-center"
                :data-test="modal.name"
                @click="closeOnOverlay(modal)"
            >
                <component
                    :is="modal.component"
                    :class="[modal.component.name, modal.name]"
                    :modal="modal"
                    @clickCloseButton="close(modal.name)"
                />
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import type { IModalOptions } from './types'
import { useModalController } from './useModalController'

defineOptions({
    name: 'ModalController',
})

const appConfig = useAppConfig()
const { modals, showModal, close } = useModalController()
const isMobile = computed(() => Boolean(appConfig.store?.env?.isMobile))
const theme = appConfig.components?.modal;

function closeOnOverlay(
    modal?: IModalOptions,
    clickOnCloseButton = false,
) {
  if (modal?.blockCloseOverlay && !clickOnCloseButton) {
    return
  }

  close(modal?.name)
}
</script>
