<script setup lang="ts">
import { computed } from "vue";
import {
  type UiBaseNotificationProps,
  type UiBaseNotificationSlots,
} from "./types.ts";
import { useAppConfig } from "../../../composables/useAppConfig.ts";
import { flattenClasses } from "../../../helpers/flattenClasses.ts";

defineOptions({
  name: "UiBaseNotification",
});

defineSlots<UiBaseNotificationSlots>();

const appConfig = useAppConfig();
const props = withDefaults(defineProps<UiBaseNotificationProps>(), {
  variant: 'neutral',
});
const baseNotificationTheme = appConfig.components?.baseNotification;

if (!baseNotificationTheme) {
  throw new Error("[UnityUI] BaseNotification theme is not provided in appConfig.components.baseNotification.");
}

const rootClasses = computed(() => {
  return flattenClasses(
    baseNotificationTheme.base,
    baseNotificationTheme.variant[props.variant],
  );
});
</script>

<template>
  <div :class="rootClasses">
    <slot />
  </div>
</template>
