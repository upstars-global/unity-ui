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
  sm: ['!w-4', '!h-4'],
  md: [],
  lg: [],
}

const ICON_ONLY_ICON_BY_SIZE: Record<ButtonSize, ButtonClassList> = {
  sm: ['!w-4', '!h-4'],
  md: ['w-6'],
  lg: ['w-6'],
}

const BUTTON_BASE: ButtonClassList = ['flex']
const LABEL_BASE: ButtonClassList = ['truncate']
const CAPTION_BASE: ButtonClassList = ['text-button-caption', ...LABEL_BASE, 'opacity-85']
const SLOT_ICON_BASE: ButtonClassList = ['shrink-0']
const DISABLED_OPACITY_SOFT: ButtonClassList = ['[&:disabled:not([aria-busy=true])]:opacity-45']
const DISABLED_OPACITY_STRONG: ButtonClassList = ['[&:disabled:not([aria-busy=true])]:opacity-25']

function buildPrimaryOrDestructiveVariant(tokenGroup: 'primary' | 'destructive', disabled: ButtonClassList): ButtonVariantState {
  return {
    base: [
      tokenClass(`--component-button-${tokenGroup}-default-bg`, 'bg'),
      tokenClass(`--component-button-${tokenGroup}-default-fg`, 'text'),
      'group-aria-busy:opacity-0'

    ],
    hover: [
      tokenClass(`--component-button-${tokenGroup}-hover-bg`, 'group-hover:bg'),
      tokenClass(`--component-button-${tokenGroup}-hover-fg`, 'group-hover:text'),
    ],
    pressed: [
      tokenClass(`--component-button-${tokenGroup}-pressed-bg`, 'group-active:bg'),
      tokenClass(`--component-button-${tokenGroup}-pressed-fg`, 'group-active:text'),
    ],
    loading: [
      tokenClass(`--component-button-${tokenGroup}-pressed-bg`, 'group-aria-busy:bg'),
      tokenClass(`--component-button-${tokenGroup}-pressed-fg`, 'group-aria-busy:text'),
    ],
    disabled,
  }
}

function buildSecondaryVariant(): ButtonVariantState {
  return {
    base: [
      'border-2',
      tokenClass('--component-button-secondary-default-bordercolor', 'border'),
      tokenClass('--component-button-secondary-default-bg', 'bg'),
      tokenClass('--component-button-secondary-default-fg', 'text'),
      'group-aria-busy:opacity-0'
    ],
    hover: [
      tokenClass('--component-button-secondary-hover-bordercolor', 'group-hover:border'),
      tokenClass('--component-button-secondary-hover-bg', 'group-hover:bg'),
      tokenClass('--component-button-secondary-hover-fg', 'group-hover:text'),
    ],
    pressed: [
      tokenClass('--component-button-secondary-pressed-bordercolor', 'group-active:border'),
      tokenClass('--component-button-secondary-pressed-bg', 'group-active:bg'),
      tokenClass('--component-button-secondary-pressed-fg', 'group-active:text'),
    ],
    loading: [
      'border-2',
      tokenClass('--component-button-secondary-pressed-bordercolor', 'group-aria-busy:border'),
      tokenClass('--component-button-secondary-pressed-bg', 'group-aria-busy:bg'),
      tokenClass('--component-button-secondary-default-fg', 'group-aria-busy:text'),
    ],
    disabled: DISABLED_OPACITY_SOFT,
  }
}

function buildTertiaryVariant(): ButtonVariantState {
  return {
    base: [
      'border-transparent',
      tokenClass('--component-button-tertiary-default-bg', 'bg'),
      tokenClass('--component-button-tertiary-default-fg', 'text'),
      'group-aria-busy:opacity-0'
    ],
    hover: [
      tokenClass('--component-button-tertiary-hover-bg', 'group-hover:bg'),
      tokenClass('--component-button-tertiary-hover-fg', 'group-hover:text'),
    ],
    pressed: [
      tokenClass('--component-button-tertiary-pressed-bg', 'group-active:bg'),
      tokenClass('--component-button-tertiary-pressed-fg', 'group-active:text'),
    ],
    loading: [
      tokenClass('--component-button-tertiary-pressed-bg', 'group-aria-busy:bg'),
      tokenClass('--component-button-tertiary-pressed-fg', 'group-aria-busy:text'),
    ],
    disabled: DISABLED_OPACITY_SOFT,
  }
}

function buildGhostVariant(): ButtonVariantState {
  return {
    base: [
      tokenClass('--component-button-ghost-default-bg', 'bg'),
      tokenClass('--component-button-ghost-default-fg', 'text'),
      'group-aria-busy:opacity-0'
    ],
    hover: [
      tokenClass('--component-button-ghost-hover-bg', 'group-hover:bg'),
      tokenClass('--component-button-ghost-hover-fg', 'group-hover:text'),
    ],
    pressed: [
      tokenClass('--component-button-ghost-pressed-bg', 'group-active:bg'),
      tokenClass('--component-button-ghost-pressed-fg', 'group-active:text'),
    ],
    loading: [
      tokenClass('--component-button-ghost-pressed-bg', 'group-aria-busy:bg'),
      tokenClass('--component-button-ghost-pressed-fg', 'group-aria-busy:text'),
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
            tokenClass('--radius-button-sm', 'rounded'),
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
            tokenClass('--radius-button-md', 'rounded'),
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
            tokenClass('--radius-button-lg', 'rounded'),
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
            tokenClass('--radius-button-sm', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.sm,
        },
        md: {
          container: [
            tokenClass('--component-button-height-standard-md', 'h'),
            tokenClass('--radius-button-md', 'rounded'),
          ],
          icon: ICON_ONLY_ICON_BY_SIZE.md,
        },
        lg: {
          container: [
            tokenClass('--component-button-height-standard-lg', 'h'),
            tokenClass('--radius-button-lg', 'rounded'),
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
            tokenClass('--radius-button-sm', 'rounded'),
            tokenClass('--component-button-padding-x-caption-sm', 'px'),
            tokenClass('--component-button-padding-y-caption-sm', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.sm, ...LABEL_BASE],
          caption: CAPTION_BASE,
        },
        md: {
          container: [
            tokenClass('--component-button-height-caption-md', 'h'),
            tokenClass('--component-button-gap-caption-md', 'gap'),
            tokenClass('--radius-button-md', 'rounded'),
            tokenClass('--component-button-padding-x-caption-md', 'px'),
            tokenClass('--component-button-padding-y-caption-md', 'py'),
          ],
          label: [BUTTON_LABEL_TEXT_BY_SIZE.md, ...LABEL_BASE],
          caption: CAPTION_BASE,
        },
        lg: {
          container: [
            tokenClass('--component-button-height-caption-lg', 'h'),
            tokenClass('--component-button-gap-caption-lg', 'gap'),
            tokenClass('--radius-button-lg', 'rounded'),
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
          container: [
            tokenClass('--component-button-minwidth-slab-sm', 'min-w'),
            tokenClass('--component-button-maxwidth-slab-sm', 'max-w'),
            tokenClass('--component-button-height-slab-sm', 'h'),
            tokenClass('--component-button-gap-slab-sm', 'gap'),
            tokenClass('--radius-button-md', 'rounded'),
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
        tokenClass('--component-button-gap-action-sm', 'gap'),
      ],
      sizes: {
        sm: {
          container: [
            'flex justify-center items-center',
            tokenClass('--component-button-width-action-sm', 'w'),
            tokenClass('--component-button-height-action-sm', 'h'),
            tokenClass('--radius-button-md', 'rounded'),
          ],
          icon: ['w-6'],
          label: ['text-button-caption', ...LABEL_BASE],
        },
      } satisfies ButtonTypeSizeMap,
    },
  },
  variant: {
    primary: buildPrimaryOrDestructiveVariant('primary', DISABLED_OPACITY_STRONG),
    secondary: buildSecondaryVariant(),
    tertiary: buildTertiaryVariant(),
    ghost: buildGhostVariant(),
    destructive: buildPrimaryOrDestructiveVariant('destructive', DISABLED_OPACITY_STRONG),
  },
  states: {
    fullWidth: ['w-full'],
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
