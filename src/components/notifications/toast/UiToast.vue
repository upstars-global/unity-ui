<template>
  <div :class="rootClasses" :style="styles">
    <transition-group
      :enter-active-class="toastTheme.transitionGroup.enterActiveClass"
      :enter-from-class="toastTheme.transitionGroup.enterFromClass"
      :leave-active-class="toastTheme.transitionGroup.leaveActiveClass"
      :leave-to-class="toastTheme.transitionGroup.leaveToClass"
    >
      <template
        v-for="item in list"
        :key="item.id"
      >
        <UiBaseNotification
            :variant="item.variant ?? 'neutral'"
            :class="toastTheme.slots.item"
        >
          <UiIcon
              v-if="item.icon"
              class="shrink-0"
              :name="item.icon"
              @click="clickHandler(item)"
          />
          <div
              class="w-full cursor-pointer"
              @click="clickHandler(item)"
          >
            <div
                class="flex gap-2 justify-between  mb-1 w-full"
                :class="item.text ? 'items-start' : 'items-center'"
            >
              <p
                  v-if="item.title"
                  class="text-subtitle"
                  v-html="item.title"
              />
              <div @click.stop="closeHandler(item)">
                <UiIcon
                    name="line_close"
                    class="cursor-pointer"
                />
              </div>
            </div>
            <p v-if="item.text" class="text-body" v-html="item.text" />
          </div>
        </UiBaseNotification>
      </template>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import UiIcon from "../../icon/UiIcon.vue";
import UiBaseNotification from "../baseNotification/UiBaseNotification.vue";
import { useEventBus } from "../../../composables/useEventBus.ts";
import { useAppConfig } from "../../../composables/useAppConfig.ts";
import { flattenClasses } from "../../../helpers/flattenClasses.ts";
import type {
  UiToastClosePayload,
  UiToastItem,
} from "./types.ts";

defineOptions({
  name: "UiToast",
});

const bus = useEventBus();
const appConfig = useAppConfig();
const toastTheme = appConfig.components?.toast;

const group = "basic";
const styles = "";
const list = ref<UiToastItem[]>([]);

if (!toastTheme) {
  throw new Error("[UnityUI] Toast theme is not provided in appConfig.components.toast.");
}

const rootClasses = computed(() => {
  return flattenClasses(
    group,
    toastTheme.base,
    toastTheme.slots.list,
  );
});

function remove(id?: number) {
  list.value = list.value.filter((item) => item.id !== id);
}

function setTimer(toast: UiToastItem) {
  const timer = toast.time === 0 ? 0 : 10000;

  if (timer > 0) {
    setTimeout(() => {
      remove(toast.id);
    }, timer);
  }
}

function show(toast: UiToastItem) {
  const nextToast: UiToastItem = { ...toast };

  if (!Object.prototype.hasOwnProperty.call(nextToast, "id")) {
    nextToast.id = Math.random();
  }

  setTimer(nextToast);
  list.value.push(nextToast);
}

function close(toast: UiToastClosePayload) {
  remove(toast.id);
}

function clickHandler(item: UiToastItem) {
  if (item.url) {
    // this.$router.push(item.url); // переходы нужно обсудить так как пути не соответсвуют текущим роутам
  } else if (item.callback) {
    item.callback();
  }
}

function closeHandler(item: UiToastItem) {
  if (item.callback) {
    item.callback();
  }
  remove(item.id);
}

onMounted(() => {
  bus?.$on("toast.show", show);
  bus?.$on("toast.close", close);
});

onBeforeUnmount(() => {
  bus?.$off("toast.show", show);
  bus?.$off("toast.close", close);
});
</script>
