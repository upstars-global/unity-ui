import type { ButtonUiOptimized } from './button/theme';
import type { BadgeUiOptimized } from './badge/theme';
import type { LinkUiOptimized } from "./link/theme.ts";
import type { TabsUiOptimized } from './tabs/theme';
import type { TimerUiOptimized } from './timer/theme';

export type UiIcons<TIconName extends string = string> = Partial<Record<TIconName, string>>;
export type UiIconsGroups<TIconName extends string = string> = Record<string, UiIcons<TIconName>>;

export interface AppConfig<TIconName extends string = string> {
  icons?: UiIcons<TIconName>
  allIcons?: UiIconsGroups<TIconName>
  components?: {
    badge?: BadgeUiOptimized
    button?: ButtonUiOptimized
    link?: LinkUiOptimized
    tabs?: TabsUiOptimized
    timer?: TimerUiOptimized
  }
  store?: {
    env?: {
      isMockerMode?: boolean
      isMobile: boolean
    }
  }
}
