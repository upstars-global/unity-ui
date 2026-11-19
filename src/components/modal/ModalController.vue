<template>
    <!-- Keeps the backdrop rendered (and fades it) while the last modal plays its leave animation -->
    <transition name="modal-overlay">
      <div
        v-show="showModal"
        class="modal-container ui-modal"
    >
        <transition-group
            name="modal"
            tag="div"
        >
            <div
                v-for="modal in modals"
                :key="modal.name"
                class="modal-item ui-modal__item"
                :class="{ 'ui-modal__item--blocked': modal.blockCloseOverlay }"
                :data-test="modal.name"
                @click="closeOnOverlay(modal)"
            >
                <component
                    :is="modal.component"
                    v-bind="modal.props"
                    :class="[modal.component.name, modal.name]"
                    :modal="modal"
                    @clickCloseButton="close(modal.name)"
                    @click.stop
                />
            </div>
        </transition-group>
    </div>
    </transition>
</template>

<script setup lang="ts">
import type { IModalOptions } from './types'
import { useModalController } from './useModalController'

defineOptions({
    name: 'ModalController',
})

const { modals, showModal, close } = useModalController()

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
