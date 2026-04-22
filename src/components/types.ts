import type { ButtonUiOptimized } from './button/theme';
import type { BadgeUiOptimized } from './badge/theme';
import type { InlineActionNotificationUiOptimized } from './notifications/inlineActionNotification/theme';
import type { LinkUiOptimized } from "./link/theme";
import type { TabsUiOptimized } from './tabs/theme';
import type { TimerUiOptimized } from './timer/theme';
import type { TooltipUiOptimized } from './tooltip/theme';
import type { AccordionUiOptimized } from './accordion/theme';
import type {FaqUiOptimized} from "./faq/theme.ts";
import type { ReadMoreUiOptimized } from './readMore/theme';
import type {BaseNotificationUiOptimized} from "./notifications/baseNotification/theme.ts";
import type {InlineNotificationUiOptimized} from "./notifications/inlineNotification/theme.ts";
import type { ToastUiOptimized } from './notifications/toast/theme.ts';
import type { RadialProgressUiOptimized } from './progress/radial/theme';
import type { LinearProgressUiOptimized } from './progress/linear/theme';

export type UiIcons<TIconName extends string = string> = Partial<Record<TIconName, string>>;
export type UiIconsGroups<TIconName extends string = string> = Record<string, UiIcons<TIconName>>;

export interface AppConfig<TIconName extends string = string> {
  icons?: UiIcons<TIconName>
  allIcons?: UiIconsGroups<TIconName>
  components?: {
    accordion?: AccordionUiOptimized
    badge?: BadgeUiOptimized
    button?: ButtonUiOptimized
    inlineActionNotification?: InlineActionNotificationUiOptimized
    baseNotification?: BaseNotificationUiOptimized
    inlineNotification?: InlineNotificationUiOptimized
    link?: LinkUiOptimized
    tabs?: TabsUiOptimized
    timer?: TimerUiOptimized
    tooltip?: TooltipUiOptimized
    faq?: FaqUiOptimized
    readMore?: ReadMoreUiOptimized
    radialProgress?: RadialProgressUiOptimized
    toast?: ToastUiOptimized
    linearProgress?: LinearProgressUiOptimized
  }
  store?: {
    env?: {
      isMockerMode?: boolean
      isMobile: boolean
      isServer?: boolean
    }
  }
}
