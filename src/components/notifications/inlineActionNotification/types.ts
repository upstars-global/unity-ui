import type {UiThemeIconName} from "../../../themes/registry.ts";

export interface UiInlineNotificationProps {
  iconName?: UiThemeIconName;
  title?: string;
  message?: string;
}

export interface UiInlineNotificationSlots {
  default?: () => unknown;
  icon?: () => unknown;
  actions?: () => unknown;
}
