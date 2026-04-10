import type {BaseNotificationVariants} from "../baseNotification/types.ts";
import type {UiThemeIconName} from "../../../themes/registry.ts";

export interface UiInlineNotificationProps {
  variant: BaseNotificationVariants,
  iconName?: UiThemeIconName,
  message: string,
}
