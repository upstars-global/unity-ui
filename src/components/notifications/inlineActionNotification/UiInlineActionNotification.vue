<script setup lang="ts">
import { useSlots } from "vue";
import {
  type UiInlineNotificationProps,
  type UiInlineNotificationSlots,
} from "./types.ts";
import { useAppConfig } from "../../../composables/useAppConfig.ts";
import UiIcon from "../../icon/UiIcon.vue";

defineOptions({
  name: "UiInlineActionNotification",
});

withDefaults(defineProps<UiInlineNotificationProps>(), {
  title: "",
  message: "",
});

defineSlots<UiInlineNotificationSlots>();

const appConfig = useAppConfig();
const slots = useSlots();
const inlineNotificationTheme = appConfig.components?.inlineActionNotification;

if (!inlineNotificationTheme) {
  throw new Error("[UnityUI] InlineNotification theme is not provided in appConfig.components.inlineNotification.");
}
</script>

<template>
  <div :class="inlineNotificationTheme.base">
    <div :class="inlineNotificationTheme.slots.container">
      <slot name="icon">
        <UiIcon
            v-if="iconName"
            :class="inlineNotificationTheme.slots.icon"
            :name="iconName"
        />
      </slot>
      <div :class="inlineNotificationTheme.slots.content">
        <div :class="inlineNotificationTheme.slots.message">
          <slot>
            <p v-if="title" :class="inlineNotificationTheme.slots.title">
              {{ title }}
            </p>
            <span v-if="message">{{ message }}</span>
          </slot>
        </div>
        <div
          v-if="slots.actions"
          :class="inlineNotificationTheme.slots.actions"
        >
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>
