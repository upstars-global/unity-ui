<script setup lang="ts">
import { computed, resolveComponent, useAttrs } from 'vue'
import type {UiLinkEmits, UiLinkProps, UiLinkSlots} from "./types.ts";
import { useAppConfig } from '../../composables/useAppConfig'
import { isExternalUrl } from "../../helpers/externalUrl.ts";

const VUE_ROUTER_LINK_TAG = 'RouterLink'

defineOptions({
  name: 'UiLink',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiLinkProps>(), {
  to: undefined,
  size: 'default',
})

const attrs = useAttrs()

defineEmits<UiLinkEmits>()
defineSlots<UiLinkSlots>()

const appConfig = useAppConfig()
const linkTheme = appConfig.components?.link

if (!linkTheme) {
  throw new Error('[UnityUI] Link theme is not provided in appConfig.components.link.')
}

const flattenClasses = (...tokens: Array<string | undefined | false | null>) => {
  return tokens.filter(Boolean).join(' ')
}

const isBelongsToCurrentDomain = computed(() => {
  if (typeof window !== 'undefined') {
    const currentDomain = location.hostname
    const regex = new RegExp(`^(http|https)://${currentDomain.replace('.', '\\.')}.*$`)

    return typeof props.to === 'string' && regex.test(props.to)
  }

  return false
})
const isExternal = computed(() => {
  if (isBelongsToCurrentDomain.value) {
    return false
  }

  return typeof props.to === 'string' && isExternalUrl(props.to)
})
const isSpecialLink = computed(() => {
  if (typeof props.to !== 'string') {
    return false
  }

  return /tel:/.test(props.to) || /mailto:/.test(props.to) || props.to.startsWith('#')
})
const isNativeLinkTag = computed(() => isExternal.value || isBelongsToCurrentDomain.value || isSpecialLink.value)

const parsedAttrs = computed(() => {
  const {
    class: className,
    target,
    rel,
    ...rest
  } = attrs

  return {
    className: className as string | undefined,
    target: target as string | undefined,
    rel: rel as string | undefined,
    rest,
  }
})

const targetAttribute = computed(() => (isExternal.value ? '_blank' : parsedAttrs.value.target))
const relAttribute = computed(() => {
  if (!targetAttribute.value?.includes('_blank') || (targetAttribute.value?.includes('_blank') && !isExternal.value)) {
    return parsedAttrs.value.rel
  }

  return `${parsedAttrs.value.rel || ''} noreferrer noopener`.trim()
})

const url = computed(() => {
  if (!props.to) {
    return undefined
  }

  if (isNativeLinkTag.value) {
    return { href: props.to }
  }

  return { to: props.to }
})
const component = computed(() => {
  if (!props.to) {
    return 'span'
  }

  return isNativeLinkTag.value ? 'a' : resolveComponent(VUE_ROUTER_LINK_TAG)
})

const supportedSize = computed(() => {
  if (linkTheme.size[props.size]) {
    return props.size
  }

  return Object.keys(linkTheme.size)[0] ?? 'default'
})

const className = computed(() => {
  return flattenClasses(
      linkTheme.base,
      linkTheme.size[supportedSize.value],
      parsedAttrs.value.className
  )
})

const computedProps = computed(() => {
  if (component.value === 'span') {
    return {
      ...parsedAttrs.value.rest
    }
  }

  const result: Record<string, unknown> = {
    ...parsedAttrs.value.rest,
    ...url.value
  }

  return result
})
</script>

<template>
  <component
      :is="component"
      :class="className"
      v-bind="computedProps"
      :target="targetAttribute"
      :rel="relAttribute"
      @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>
