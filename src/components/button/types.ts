import type { UiThemeIconName } from '../../themes/registry';

export const BUTTON_LAYOUTS = ['standard', 'icon', 'caption', 'slab', 'action'] as const;
export const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export const BUTTON_HTML_TYPES = ['button', 'submit', 'reset'] as const;

export type ButtonLayout = (typeof BUTTON_LAYOUTS)[number];
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type ButtonHtmlType = (typeof BUTTON_HTML_TYPES)[number];

export interface UiButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  layout?: ButtonLayout;
  type?: ButtonHtmlType;
  disabled?: boolean;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  loading?: boolean;
  caption?: string;
  iconName?: UiThemeIconName;
  leadingIconName?: UiThemeIconName;
  leadingIconClass?: string;
  trailingIconName?: UiThemeIconName;
  trailingIconClass?: string;
}

export interface UiButtonEmits {
  (event: 'click', value: MouseEvent): void
}

export interface UiButtonSlots {
  default?: () => unknown
  leading?: () => unknown
  trailing?: () => unknown
}
