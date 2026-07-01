<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { flattenClasses } from '../../helpers/flattenClasses'
import UiIcon from '../icon/UiIcon.vue'
import type { UiButtonEmits, UiButtonProps, UiButtonSlots } from './types'

defineOptions({
  name: 'UiButton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiButtonProps>(), {
  size: 'md',
  variant: 'primary',
  layout: 'standard',
  type: 'button',
  caption: '',
  disabled: false,
  fullWidth: false,
  fullWidthMobile: false,
  loading: false
})

const emit = defineEmits<UiButtonEmits>()
defineSlots<UiButtonSlots>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const buttonTheme = appConfig.components?.button

if (!buttonTheme) {
  throw new Error('[UnityUI] Button theme is not provided in appConfig.components.button.')
}

const isStandardType = props.layout === 'standard'
const isCaptionType = props.layout === 'caption'
const isActionType = props.layout === 'action'
const mainIconName = ['icon', 'slab', 'action'].includes(props.layout) ? props.iconName : ''

const buttonDisabled = computed(() => props.disabled || props.loading)
const showSideSlots = computed(() => isStandardType)
const showLeadingIcon = computed(() => showSideSlots.value && Boolean(props.leadingIconName))
const showTrailingIcon = computed(() => showSideSlots.value && Boolean(props.trailingIconName))
const showLabel = computed(() => props.layout !== 'icon')
const showCaption = computed(() => isCaptionType && Boolean(props.caption))

const supportedSize = computed(() => {
  const sizes = buttonTheme.type[props.layout].sizes

  if (sizes[props.size]) {
    return props.size
  }

  return Object.keys(sizes)[0] ?? 'sm'
})
const typeConfig = computed(() => buttonTheme.type[props.layout])
const sizeConfig = computed(() => typeConfig.value.sizes[supportedSize.value])
const variantConfig = computed(() => buttonTheme.variant[props.variant])
const variantStateClasses = computed(() => {
  return flattenClasses(
    variantConfig.value.base,
    variantConfig.value.hover,
    variantConfig.value.pressed,
  )
})

const fullWidthClasses = computed(() => {
  return props.fullWidth && (isStandardType || isCaptionType) ? buttonTheme.states.fullWidth : ''
})
const fullWidthMobileClasses = computed(() => {
  return props.fullWidthMobile && (isStandardType || isCaptionType) ? buttonTheme.states.fullWidthMobile : ''
})
const rootClasses = computed(() => {
  return flattenClasses(
    variantConfig.value.disabled,
  )
})

const contentClasses = computed(() => {
  const variantClasses = isActionType ? '' : variantStateClasses.value

  return flattenClasses(
    buttonTheme.base,
    typeConfig.value.base,
    !isActionType && sizeConfig.value.container,
    variantClasses,
    fullWidthClasses.value,
    fullWidthMobileClasses.value,
  )
})

const attributes = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const leadingIconClasses = computed(() => {
  return flattenClasses(buttonTheme.slots.leadingIcon, sizeConfig.value.icon, props.leadingIconClass)
})
const trailingIconClasses = computed(() => {
  return flattenClasses(buttonTheme.slots.trailingIcon, sizeConfig.value.icon, props.trailingIconClass)
})
const mainIconWrapperClasses = computed(() => {
  const variantClasses = isActionType ? variantStateClasses.value : ''

  return flattenClasses(
    buttonTheme.slots.leadingIcon,
    isActionType && sizeConfig.value.container,
    variantClasses,
  )
})
const labelClasses = computed(() => {
  return flattenClasses(buttonTheme.slots.label, sizeConfig.value.label)
})
const loadingOverlayClasses = computed(() => {
  return flattenClasses(
    'absolute inset-0',
    buttonTheme.base,
    typeConfig.value.base,
    sizeConfig.value.container,
    fullWidthClasses.value,
    fullWidthMobileClasses.value,
    variantConfig.value.loading,
  )
})
const loadingIconClasses = computed(() => {
  return flattenClasses(sizeConfig.value.icon, buttonTheme.animation.loading)
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <button
      class="ui-button group bg-transparent p-0 relative transition-colors"
      :class="[rootClasses, attrs.class, fullWidthClasses, fullWidthMobileClasses]"
      v-bind="attributes"
      :type="type"
      :disabled="buttonDisabled"
      :aria-busy="loading || undefined"
      @click="handleClick"
  >
    <span :class="contentClasses">
      <slot
          name="leading"
          v-if="showSideSlots"
      >
        <UiIcon
            v-if="showLeadingIcon"
            :name="leadingIconName"
            :class="leadingIconClasses"
        />
      </slot>
      <span
          v-if="mainIconName"
          :class="mainIconWrapperClasses"
      >
        <UiIcon
            :name="mainIconName"
            :class="sizeConfig.icon"
        />
      </span>
      <span
          v-if="showLabel"
          :class="labelClasses"
      >
        <slot />
      </span>
      <span
          v-if="showCaption"
          :class="sizeConfig.caption">
        {{caption}}
      </span>
      <slot
          name="trailing"
          v-if="showSideSlots"
      >
        <UiIcon
            v-if="showTrailingIcon"
            :name="trailingIconName"
            :class="trailingIconClasses"
        />
      </slot>
    </span>
    <span
        v-if="loading"
        :class="loadingOverlayClasses"
    >
      <UiIcon
          name="line_loader"
          :class="loadingIconClasses"
      />
    </span>
  </button>
</template>
