import type { ButtonSize } from './types'
import { tokenClass } from '../theme-utils'

type ButtonClassList = readonly string[]
type ButtonTypeSizeConfig = {
  base?: ButtonClassList
  container: ButtonClassList
  icon?: ButtonClassList
  label?: ButtonClassList
  caption?: ButtonClassList
}
type ButtonTypeSizeMap = Partial<Record<ButtonSize, ButtonTypeSizeConfig>>

const BUTTON_LABEL_TEXT_BY_SIZE: Record<ButtonSize, string> = {
  sm: 'text-button-sm',
  md: 'text-button-md',
  lg: 'text-button-lg',
}

const STANDARD_ICON_BY_SIZE: Record<ButtonSize, ButtonClassList> = {
  sm: ['!w-16', '!h-16'],
  md: [],
  lg: [],
}

const ICON_ONLY_ICON_BY_SIZE: Record<ButtonSize, ButtonClassList> = {
  sm: ['!w-16', '!h-16'],
  md: ['w-24'],
  lg: ['w-24'],
}

const BUTTON_BASE: ButtonClassList = ['flex']
const LABEL_BASE: ButtonClassList = ['truncate lowercase first-letter:uppercase']
const CAPTION_BASE: ButtonClassList = ['text-button-caption', ...LABEL_BASE, 'opacity-85']
const SLOT_ICON_BASE: ButtonClassList = ['shrink-0']


const button = {
  base: BUTTON_BASE,
  type: {
    standard: {
      base: ['flex-row', 'items-center', 'justify-center'],
      sizes: {
        sm: {
          base: [tokenClass('--radius-button-default-sm', 'rounded')],
          container: [
            tokenClass('--component-button-height-standard-sm', 'h'),
            tokenClass('--component-button-gap-standard-sm', 'gap'),
            tokenClass('--radius-button-default-sm', 'rounded'),
            tokenClass('--component-button-padding-x-standard-sm', 'px'),
            tokenClass('--component-button-padding-y-standard-sm', 'py'),
          ],
          icon: STANDARD_ICON_BY_SIZE.sm,
          label: [BUTTON_LABEL_TEXT_BY_SIZE.sm, ...LABEL_BASE],
        },
        md: {
          base: [tokenClass('--radius-button-default-md', 'rounded')],
          container: [
            tokenClass('--component-button-height-standard-md', 'h'),
            tokenClass('--component-button-gap-standard-md', 'gap'),
            tokenClass('--radius-button-default-md', 'rounded'),
            tokenClass('--component-button-padding-x-standard-md', 'px'),
            tokenClass('--component-button-padding-y-standard-md', 'py'),
          ],
          icon: STANDARD_ICON_BY_SIZE.md,
          label: [BUTTON_LABEL_TEXT_BY_SIZE.md, ...LABEL_BASE],
        },
        lg: {
          base: [tokenClass('--radius-button-default-lg', 'rounded')],
          container: [
            tokenClass('--component-button-height-standard-lg', 'h'),
            tokenClass('--component-button-gap-standard-lg', 'gap'),
            tokenClass('--radius-button-default-lg', 'rounded'),
            tokenClass('--component-button-padding-x-standard-lg', 'px'),
            tokenClass('--component-button-padding-y-standard-lg', 'py'),
          ],
          icon: STANDARD_ICON_BY_SIZE.lg,
          label: [BUTTON_LABEL_TEXT_BY_SIZE.lg, ...LABEL_BASE],
        },
      } satisfies ButtonTypeSizeMap,
    },
    icon: {
      base: ['aspect-square', 'p-0', 'flex', 'items-center', 'justify-center'],
      sizes: {
        sm: {
          base: [tokenClass('--radius-button-icon', 'rounded')],
          container: [
            tokenClass('--component-button-height-standard-sm', 'h'),
            tokenClass('--radius-button-icon', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.sm,
        },
        md: {
          base: [tokenClass('--radius-button-icon', 'rounded')],
          container: [
            tokenClass('--component-button-height-standard-md', 'h'),
            tokenClass('--radius-button-icon', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.md,
        },
        lg: {
          base: [tokenClass('--radius-button-icon', 'rounded')],
          container: [
            tokenClass('--component-button-height-standard-lg', 'h'),
            tokenClass('--radius-button-icon', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.lg,
        },
      } satisfies ButtonTypeSizeMap,
    },
    caption: {
      base: ['flex-col', 'text-center', 'justify-center', 'items-center'],
      sizes: {
        sm: {
          base: [tokenClass('--radius-button-default-sm', 'rounded')],
          container: [
            tokenClass('--component-button-height-caption-sm', 'h'),
            tokenClass('--component-button-gap-caption-sm', 'gap'),
            tokenClass('--radius-button-default-sm', 'rounded'),
            tokenClass('--component-button-padding-x-caption-sm', 'px'),
            tokenClass('--component-button-padding-y-caption-sm', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.sm, ...LABEL_BASE],
          caption: CAPTION_BASE,
        },
        md: {
          base: [tokenClass('--radius-button-default-md', 'rounded')],
          container: [
            tokenClass('--component-button-height-caption-md', 'h'),
            tokenClass('--component-button-gap-caption-md', 'gap'),
            tokenClass('--radius-button-default-md', 'rounded'),
            tokenClass('--component-button-padding-x-caption-md', 'px'),
            tokenClass('--component-button-padding-y-caption-md', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.md, ...LABEL_BASE],
          caption: CAPTION_BASE,
        },
        lg: {
          base: [tokenClass('--radius-button-default-lg', 'rounded')],
          container: [
            tokenClass('--component-button-height-caption-lg', 'h'),
            tokenClass('--component-button-gap-caption-lg', 'gap'),
            tokenClass('--radius-button-default-lg', 'rounded'),
            tokenClass('--component-button-padding-x-caption-lg', 'px'),
            tokenClass('--component-button-padding-y-caption-lg', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.lg, ...LABEL_BASE],
          caption: CAPTION_BASE,
        },
      } satisfies ButtonTypeSizeMap,
    },
    slab: {
      base: ['flex-col', 'items-center', 'justify-center'],
      sizes: {
        sm: {
          base: [tokenClass('--radius-button-slab', 'rounded')],
          container: [
            tokenClass('--component-button-height-slab-sm', 'h'),
            tokenClass('--component-button-gap-slab-sm', 'gap'),
            tokenClass('--radius-button-slab', 'rounded'),
            tokenClass('--component-button-padding-x-slab-sm', 'px'),
            tokenClass('--component-button-padding-y-slab-sm', 'py'),
          ],
          icon: ['w-6'],
          label: ['text-button-xs', ...LABEL_BASE],
        },
      } satisfies ButtonTypeSizeMap,
    },
    action: {
      base: [
        'flex-col',
        'items-center',
        'justify-center',
        'text-center',
        tokenClass('--component-button-gap-action-sm', 'gap'),
        tokenClass('--component-button-gap-action-sm', 'gap'),
      ],
      sizes: {
        sm: {
          container: [
            'flex justify-center items-center',
            tokenClass('--component-button-height-action-sm', 'w'),
            tokenClass('--component-button-height-action-sm', 'h'),
            tokenClass('--radius-button-action', 'rounded'),
          ],
          icon: ['w-6'],
          label: [
            'text-button-caption',
            tokenClass('--component-button-label', 'text'),
            ...LABEL_BASE
          ],
        },
      } satisfies ButtonTypeSizeMap,
    },
  },
  states: {
    fullWidth: ['w-full'],
    fullWidthMobile: ['w-full', 'md:w-auto'],
  },
  slots: {
    leadingIcon: SLOT_ICON_BASE,
    trailingIcon: SLOT_ICON_BASE,
    label: LABEL_BASE,
  },
  animation: {
    loading: 'animate-spin',
  }
} as const

export type ButtonUiOptimized = typeof button

export default button
