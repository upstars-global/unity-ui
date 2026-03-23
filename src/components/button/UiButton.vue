<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import UiIcon from '../icon/UiIcon.vue'
import type { UiButtonProps } from './types'

defineOptions({
  name: 'UiButton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiButtonProps>(), {
  size: 'md',
  variant: 'filled',
  type: 'standard',
  caption: '',
  disabled: false,
  fullWidth: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const appConfig = useAppConfig()
const attrs = useAttrs()
const buttonTheme = appConfig.components?.button

if (!buttonTheme) {
  throw new Error('[UnityUI] Button theme is not provided in appConfig.components.button.')
}

const flattenClasses = (...tokens: Array<string | undefined | false | null>) => {
  return tokens.filter(Boolean).join(' ')
}

const isStandardType = props.type === 'standard'
const isCaptionType = props.type === 'caption'
const isActionType = props.type === 'action'

const buttonDisabled = computed(() => props.disabled || props.loading);
const hasLeadingIcon = computed(() => Boolean(props.leadingIconName))
const hasTrailingIcon = computed(() => Boolean(props.trailingIconName))
const showSideSlots = computed(() => isStandardType && !props.loading)
const showLeadingIcon = computed(() => showSideSlots.value && hasLeadingIcon.value)
const showTrailingIcon = computed(() => showSideSlots.value && hasTrailingIcon.value)
const showLabel = computed(() => {
  if (props.type === 'icon') {
    return false
  }

  if (props.loading) {
    return props.type === 'action' || props.type === 'slab'
  }

  return true
})
const showCaption = computed(() => Boolean(props.caption) && isCaptionType && !props.loading)


const supportedSize = computed(() => {
  const typeConfig = buttonTheme.type[props.type]

  if (typeConfig.sizes[props.size]) {
    return props.size
  }

  return Object.keys(typeConfig.sizes)[0] ?? 'sm'
})
const typeConfig = buttonTheme.type[props.type]
const sizeConfig = computed(() => typeConfig.sizes[supportedSize.value])
const variantConfig = computed(() => buttonTheme.variant[props.variant])
const variantClasses = computed(() => {
  return flattenClasses(
      variantConfig.value.base,
      variantConfig.value.hover,
      variantConfig.value.pressed,
      variantConfig.value.loading,
  )
})

const fullWidthClasses = computed(() => {
  return props.fullWidth && (isStandardType || isCaptionType) ? buttonTheme.states.fullWidth : "";
})
const buttonBaseClass = computed(() => {
  return flattenClasses(
      fullWidthClasses.value,
      variantConfig.value.disabled
  )
})
const className = computed(() => {
  const variant = isActionType ? '' : `${variantClasses.value} ${sizeConfig.value.container}`
  return flattenClasses(
      buttonTheme.base,
      typeConfig.base,
      variant,
      fullWidthClasses.value,
  )
})

const attributes = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})


const leadingIconClasses = computed(() => {
  return flattenClasses(buttonTheme.slots.leadingIcon, sizeConfig.value.icon)
})
const trailingIconClasses = computed(() => {
  return flattenClasses(buttonTheme.slots.trailingIcon, sizeConfig.value.icon)
})
const mainIconWrapperClasses = computed(() => {
  const variant = isActionType ? `${variantClasses.value} ${sizeConfig.value.container}` : ''
  return flattenClasses(buttonTheme.slots.leadingIcon, variant)
})
const labelClasses = computed(() => {
  return `${buttonTheme.slots.label} ${sizeConfig.value.label}`
})

const mainIconName = computed(() => {
  return props.loading ? 'line_loader' :
      ['icon', 'slab', 'action'].includes(props.type) ? props.iconName: ''
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <button
      class="ui-button group"
      :class="buttonBaseClass"
      v-bind="attributes"
      :disabled="buttonDisabled"
      :aria-busy="loading || undefined"
      @click="handleClick"
  >
    <span :class="className">
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
  </button>
</template>
