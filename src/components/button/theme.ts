import type { ButtonSize } from './types'
import { tokenClass } from '../theme-utils'

type ButtonClassList = readonly string[]
type ButtonTypeSizeConfig = {
  container: ButtonClassList
  icon?: ButtonClassList
  label?: ButtonClassList
  caption?: ButtonClassList
}
type ButtonTypeSizeMap = Partial<Record<ButtonSize, ButtonTypeSizeConfig>>
type ButtonVariantState = {
  base: ButtonClassList
  hover: ButtonClassList
  pressed: ButtonClassList
  loading: ButtonClassList
  disabled: ButtonClassList
}

const BUTTON_LABEL_TEXT_BY_SIZE: Record<ButtonSize, string> = {
  sm: 'text-button-sm',
  md: 'text-button-md',
  lg: 'text-button-lg',
}

const STANDARD_ICON_BY_SIZE: Record<ButtonSize, ButtonClassList> = {
  sm: ['!w-6', '!h-6'],
  md: ['!w-6', '!h-6'],
  lg: ['!w-6', '!h-6'],
}

const ICON_ONLY_ICON_BY_SIZE: Record<ButtonSize, ButtonClassList> = {
  sm: ['w-4'],
  md: ['w-6'],
  lg: ['w-6'],
}

const BUTTON_BASE: ButtonClassList = ['flex']
const LABEL_BASE: ButtonClassList = ['truncate']
const SLOT_ICON_BASE: ButtonClassList = ['shrink-0']
const DISABLED_OPACITY_SOFT: ButtonClassList = ['[&:disabled:not([aria-busy=true])]:opacity-45']
const DISABLED_OPACITY_STRONG: ButtonClassList = ['[&:disabled:not([aria-busy=true])]:opacity-25']

function buildFilledVariant(tokenGroup: 'primary' | 'destructive', disabled: ButtonClassList): ButtonVariantState {
  return {
    base: [
      '[border-width:var(--component-button-borderwidth-filled)]',
      'border-transparent',
      tokenClass(`--component-button-filled-${tokenGroup}-default-bg`, 'bg'),
      tokenClass(`--component-button-filled-${tokenGroup}-default-fg`, 'text'),
    ],
    hover: [
      tokenClass(`--component-button-filled-${tokenGroup}-hover-bg`, 'group-hover:bg'),
      tokenClass(`--component-button-filled-${tokenGroup}-hover-fg`, 'group-hover:text'),
    ],
    pressed: [
      tokenClass(`--component-button-filled-${tokenGroup}-pressed-bg`, 'group-active:bg'),
      tokenClass(`--component-button-filled-${tokenGroup}-pressed-fg`, 'group-active:text'),
    ],
    loading: [
      tokenClass(`--component-button-filled-${tokenGroup}-pressed-bg`, 'group-aria-busy:bg'),
      tokenClass(`--component-button-filled-${tokenGroup}-pressed-fg`, 'group-aria-busy:text'),
    ],
    disabled,
  }
}

function buildOutlinePrimaryVariant(): ButtonVariantState {
  return {
    base: [
      '[border-width:var(--component-button-borderwidth-outline)]',
      tokenClass('--component-button-outline-primary-default-bordercolor', 'border'),
      tokenClass('--component-button-outline-primary-default-bg', 'bg'),
      tokenClass('--component-button-outline-primary-default-fg', 'text'),
    ],
    hover: [
      tokenClass('--component-button-outline-primary-hover-bordercolor', 'group-hover:border'),
      tokenClass('--component-button-outline-primary-hover-bg', 'group-hover:bg'),
      tokenClass('--component-button-outline-primary-hover-fg', 'group-hover:text'),
    ],
    pressed: [
      tokenClass('--component-button-outline-primary-pressed-bordercolor', 'group-active:border'),
      tokenClass('--component-button-outline-primary-pressed-bg', 'group-active:bg'),
      tokenClass('--component-button-outline-primary-pressed-fg', 'group-active:text'),
    ],
    loading: [
      tokenClass('--component-button-outline-primary-pressed-bordercolor', 'group-aria-busy:border'),
      tokenClass('--component-button-outline-primary-pressed-bg', 'group-aria-busy:bg'),
      tokenClass('--component-button-outline-primary-pressed-fg', 'group-aria-busy:text'),
    ],
    disabled: DISABLED_OPACITY_SOFT,
  }
}

function buildSoftPrimaryVariant(): ButtonVariantState {
  return {
    base: [
      '[border-width:var(--component-button-borderwidth-soft)]',
      'border-transparent',
      tokenClass('--component-button-soft-primary-default-bg', 'bg'),
      tokenClass('--component-button-basic-primary-default-fg', 'text'),
    ],
    hover: [
      tokenClass('--component-button-soft-primary-hover-bg', 'group-hover:bg'),
      tokenClass('--component-button-basic-primary-hover-fg', 'group-hover:text'),
    ],
    pressed: [
      tokenClass('--component-button-soft-primary-pressed-bg', 'group-active:bg'),
      tokenClass('--component-button-basic-primary-pressed-fg', 'group-active:text'),
    ],
    loading: [
      tokenClass('--component-button-soft-primary-pressed-bg', 'group-aria-busy:bg'),
      tokenClass('--component-button-basic-primary-pressed-fg', 'group-aria-busy:text'),
    ],
    disabled: DISABLED_OPACITY_SOFT,
  }
}

function buildSoftNeutralVariant(): ButtonVariantState {
  return {
    base: [
      '[border-width:var(--component-button-borderwidth-soft)]',
      'border-transparent',
      tokenClass('--component-button-soft-neutral-default-bg', 'bg'),
      tokenClass('--component-button-basic-neutral-default-fg', 'text'),
    ],
    hover: [
      tokenClass('--component-button-soft-neutral-hover-bg', 'group-hover:bg'),
      tokenClass('--component-button-basic-neutral-hover-fg', 'group-hover:text'),
    ],
    pressed: [
      tokenClass('--component-button-soft-neutral-pressed-bg', 'group-active:bg'),
      tokenClass('--component-button-basic-neutral-pressed-fg', 'group-active:text'),
    ],
    loading: [
      tokenClass('--component-button-soft-neutral-pressed-bg', 'group-aria-busy:bg'),
      tokenClass('--component-button-basic-neutral-pressed-fg', 'group-aria-busy:text'),
    ],
    disabled: DISABLED_OPACITY_SOFT,
  }
}

function buildGhostNeutralVariant(): ButtonVariantState {
  return {
    base: [
      '[border-width:var(--component-button-borderwidth-filled)]',
      'border-transparent',
      tokenClass('--component-button-ghost-neutral-default-bg', 'bg'),
      tokenClass('--component-button-basic-neutral-default-fg', 'text'),
    ],
    hover: [
      tokenClass('--component-button-ghost-neutral-hover-bg', 'group-hover:bg'),
      tokenClass('--component-button-basic-neutral-hover-fg', 'group-hover:text'),
    ],
    pressed: [
      tokenClass('--component-button-ghost-neutral-pressed-bg', 'group-active:bg'),
      tokenClass('--component-button-basic-neutral-pressed-fg', 'group-active:text'),
    ],
    loading: [
      tokenClass('--component-button-ghost-neutral-pressed-bg', 'group-aria-busy:bg'),
      tokenClass('--component-button-basic-neutral-pressed-fg', 'group-aria-busy:text'),
    ],
    disabled: DISABLED_OPACITY_SOFT,
  }
}

const button = {
  base: BUTTON_BASE,
  type: {
    standard: {
      base: ['flex-row', 'items-center', 'justify-center'],
      sizes: {
        sm: {
          container: [
            tokenClass('--component-button-minwidth-standard-sm', 'min-w'),
            tokenClass('--component-button-height-standard-sm', 'h'),
            tokenClass('--component-button-gap-standard-sm', 'gap'),
            tokenClass('--component-button-radius-standard-sm', 'rounded'),
            tokenClass('--component-button-padding-x-standard-sm', 'px'),
            tokenClass('--component-button-padding-y-standard-sm', 'py'),
          ],
          icon: STANDARD_ICON_BY_SIZE.sm,
          label: [BUTTON_LABEL_TEXT_BY_SIZE.sm, ...LABEL_BASE],
        },
        md: {
          container: [
            tokenClass('--component-button-minwidth-standard-md', 'min-w'),
            tokenClass('--component-button-height-standard-md', 'h'),
            tokenClass('--component-button-gap-standard-md', 'gap'),
            tokenClass('--component-button-radius-standard-md', 'rounded'),
            tokenClass('--component-button-padding-x-standard-md', 'px'),
            tokenClass('--component-button-padding-y-standard-md', 'py'),
          ],
          icon: STANDARD_ICON_BY_SIZE.md,
          label: [BUTTON_LABEL_TEXT_BY_SIZE.md, ...LABEL_BASE],
        },
        lg: {
          container: [
            tokenClass('--component-button-minwidth-standard-lg', 'min-w'),
            tokenClass('--component-button-height-standard-lg', 'h'),
            tokenClass('--component-button-gap-standard-lg', 'gap'),
            tokenClass('--component-button-radius-standard-lg', 'rounded'),
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
          container: [
            tokenClass('--component-button-height-standard-sm', 'h'),
            tokenClass('--component-button-radius-icon-sm', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.sm,
        },
        md: {
          container: [
            tokenClass('--component-button-height-standard-md', 'h'),
            tokenClass('--component-button-radius-icon-md', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.md,
        },
        lg: {
          container: [
            tokenClass('--component-button-height-standard-lg', 'h'),
            tokenClass('--component-button-radius-icon-lg', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.lg,
        },
      } satisfies ButtonTypeSizeMap,
    },
    caption: {
      base: ['flex-col', 'text-center', 'justify-center', 'items-center'],
      sizes: {
        sm: {
          container: [
            tokenClass('--component-button-height-caption-sm', 'h'),
            tokenClass('--component-button-gap-caption-sm', 'gap'),
            tokenClass('--component-button-radius-caption-sm', 'rounded'),
            tokenClass('--component-button-padding-x-caption-sm', 'px'),
            tokenClass('--component-button-padding-y-caption-sm', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.sm, ...LABEL_BASE],
          caption: ['text-button-caption', ...LABEL_BASE],
        },
        md: {
          container: [
            tokenClass('--component-button-height-caption-md', 'h'),
            tokenClass('--component-button-gap-caption-md', 'gap'),
            tokenClass('--component-button-radius-caption-md', 'rounded'),
            tokenClass('--component-button-padding-x-caption-md', 'px'),
            tokenClass('--component-button-padding-y-caption-md', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.md, ...LABEL_BASE],
          caption: ['text-button-caption', ...LABEL_BASE],
        },
        lg: {
          container: [
            tokenClass('--component-button-height-caption-lg', 'h'),
            tokenClass('--component-button-gap-caption-lg', 'gap'),
            tokenClass('--component-button-radius-caption-lg', 'rounded'),
            tokenClass('--component-button-padding-x-caption-lg', 'px'),
            tokenClass('--component-button-padding-y-caption-lg', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.lg, ...LABEL_BASE],
          caption: ['text-button-caption', ...LABEL_BASE],
        },
      } satisfies ButtonTypeSizeMap,
    },
    slab: {
      base: ['flex-col', 'items-center', 'justify-center'],
      sizes: {
        sm: {
          container: [
            tokenClass('--component-button-minwidth-slab-sm', 'min-w'),
            tokenClass('--component-button-maxwidth-slab-sm', 'max-w'),
            tokenClass('--component-button-height-slab-sm', 'h'),
            tokenClass('--component-button-gap-slab-sm', 'gap'),
            tokenClass('--component-button-radius-slab-sm', 'rounded'),
            tokenClass('--component-button-padding-x-slab-sm', 'px'),
            tokenClass('--component-button-padding-y-slab-sm', 'py'),
          ],
          icon: ['w-6'],
          label: ['text-button-caption', ...LABEL_BASE],
        },
      } satisfies ButtonTypeSizeMap,
    },
    action: {
      base: [
        'flex-col',
        'items-center',
        'justify-center',
        'text-center',
        tokenClass('--component-button-action-label-fg', 'text'),
        tokenClass('--component-button-gap-action-sm', 'gap'),
      ],
      sizes: {
        sm: {
          container: [
            'flex justify-center items-center',
            tokenClass('--component-button-width-action-sm', 'w'),
            tokenClass('--component-button-height-action-sm', 'h'),
            tokenClass('--component-button-radius-action-sm', 'rounded'),
          ],
          icon: ['w-6'],
          label: ['text-button-caption', ...LABEL_BASE],
        },
      } satisfies ButtonTypeSizeMap,
    },
  },
  variant: {
    filled: buildFilledVariant('primary', DISABLED_OPACITY_STRONG),
    outline: buildOutlinePrimaryVariant(),
    'soft-primary': buildSoftPrimaryVariant(),
    'soft-neutral': buildSoftNeutralVariant(),
    ghost: buildGhostNeutralVariant(),
    destructive: buildFilledVariant('destructive', DISABLED_OPACITY_STRONG),
  },
  states: {
    fullWidth: ['w-full'],
  },
  slots: {
    leadingIcon: SLOT_ICON_BASE,
    trailingIcon: SLOT_ICON_BASE,
    label: LABEL_BASE,
  },
} as const

export type ButtonUiOptimized = typeof button

export default button
