import type { UiThemeIconName } from '../../themes/registry';

export const BUTTON_TYPES = ['standard', 'icon', 'caption', 'slab', 'action'] as const;
export const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

export type ButtonType = (typeof BUTTON_TYPES)[number];
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface UiButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  caption?: string;
  iconName?: UiThemeIconName;
  leadingIconName?: UiThemeIconName;
  trailingIconName?: UiThemeIconName;
}

export interface UiButtonEmits {
  (event: 'click', value: MouseEvent): void
}

export interface UiButtonSlots {
  default?: () => unknown
  leading?: () => unknown
  trailing?: () => unknown
}
