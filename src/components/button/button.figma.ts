// url=https://www.figma.com/design/z9ee1Mqb4H4K3NBSsDH3g1/%E2%9A%99%EF%B8%8F-White-Label-Design-System?node-id=2247-1120&m=dev
// source=src/components/button/UiButton.vue
// component=UiButton

import figma from 'figma'
import {
  BUTTON_LAYOUTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  type ButtonLayout,
  type ButtonSize,
  type ButtonVariant,
} from './types'

const instance = figma.selectedInstance

const DEFAULT_VARIANT: ButtonVariant = 'primary'
const DEFAULT_SIZE: ButtonSize = 'md'
const DEFAULT_LAYOUT: ButtonLayout = 'standard'

function createEnumMap<const Values extends readonly string[]>(values: Values) {
  return Object.fromEntries(values.map((value) => [value, value])) as {
    [Value in Values[number]]: Value
  }
}

const variant: ButtonVariant = instance.getEnum(
  'color',
  createEnumMap(BUTTON_VARIANTS),
) ?? DEFAULT_VARIANT

const size: ButtonSize = instance.getEnum(
  'size',
  createEnumMap(BUTTON_SIZES),
) ?? DEFAULT_SIZE

const layout: ButtonLayout = instance.getEnum(
  'type',
  createEnumMap(BUTTON_LAYOUTS),
) ?? DEFAULT_LAYOUT

const state = instance.getEnum('state', {
  default: 'default',
  hover: 'hover',
  pressed: 'pressed',
  disabled: 'disabled',
  loading: 'loading',
}) ?? 'default'

const label = instance.getString('Label')
const caption = instance.getString('Caption')
const captionVisible = instance.getBoolean('caption text')
const leftIconVisible = instance.getBoolean('left icon active')
const rightIconVisible = instance.getBoolean('right icon active')
const leftIcon = instance.getInstanceSwap('left icon')?.executeTemplate().example
const rightIcon = instance.getInstanceSwap('right icon')?.executeTemplate().example

function renderAttribute(name: string, value: string | boolean | undefined) {
  if (typeof value === 'boolean') {
    return value ? ` ${name}` : ''
  }

  if (!value) {
    return ''
  }

  return ` ${name}="${value.replaceAll('\n', '\\n').replaceAll('"', '\\"')}"`
}

const attributes = figma.code`${renderAttribute('variant', variant)}${renderAttribute('size', size)}${renderAttribute('layout', layout)}${renderAttribute('disabled', state === 'disabled')}${renderAttribute('loading', state === 'loading')}${renderAttribute('caption', layout === 'caption' && captionVisible ? caption : undefined)}`

let content = figma.code`${label}`

if (layout === 'standard') {
  const leadingSlot = leftIconVisible
    ? figma.code`
        <template #leading>
          ${leftIcon}
        </template>
      `
    : null
  const trailingSlot = rightIconVisible
    ? figma.code`
        <template #trailing>
          ${rightIcon}
        </template>
      `
    : null

  content = figma.code`
    ${leadingSlot}
    ${label}
    ${trailingSlot}
  `
} else if (layout === 'icon' || layout === 'slab' || layout === 'action') {
  const labelContent = layout === 'icon' ? null : label

  content = figma.code`
    <template #mainIcon>
      ${leftIcon}
    </template>
    ${labelContent}
  `
}

export default {
  example: figma.code`
    <UiButton${attributes}>
      ${content}
    </UiButton>
  `,
  imports: ["import UiButton from './UiButton.vue'"],
  id: 'ui-button',
  metadata: {
    nestable: true,
  },
}
