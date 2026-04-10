<script setup lang="ts">
import {
  type UiInlineNotificationProps,
} from "./types.ts";
import { useAppConfig } from "../../../composables/useAppConfig.ts";
import UiBaseNotification from "../baseNotification/UiBaseNotification.vue";
import UiIcon from "../../icon/UiIcon.vue";
import {computed} from "vue";

defineOptions({
  name: "UiInlineNotification",
});

const appConfig = useAppConfig();
const props = withDefaults(defineProps<UiInlineNotificationProps>(), {
  variant: 'neutral',
});
const inlineNotificationTheme = appConfig.components?.inlineNotification;

if (!inlineNotificationTheme) {
  throw new Error("[UnityUI] InlineNotificationTheme theme is not provided in appConfig.components.inlineNotification.");
}

const rootClasses = computed(() => {
  return inlineNotificationTheme.base;
})
const contentClasses = computed(() => {
  return props.iconName? inlineNotificationTheme.type.icon : inlineNotificationTheme.type.base;
})
</script>

<template>
  <UiBaseNotification :variant="variant" :class="rootClasses">
    <div :class="contentClasses">
      <UiIcon
          v-if="iconName"
          :name="iconName"
          class="!w-4 !h-4"
      />
      <span>{{message}}</span>
    </div>
  </UiBaseNotification>
</template>
