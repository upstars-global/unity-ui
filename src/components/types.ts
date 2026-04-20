import type { ButtonUiOptimized } from './button/theme';
import type { BadgeUiOptimized } from './badge/theme';
import type { LinkUiOptimized } from "./link/theme.ts";
import type { TabsUiOptimized } from './tabs/theme';
import type { TimerUiOptimized } from './timer/theme';
import type { TooltipUiOptimized } from './tooltip/theme';
import type { AccordionUiOptimized } from './accordion/theme';
import type {FaqUiOptimized} from "./faq/theme.ts";
import type { ReadMoreUiOptimized } from './readMore/theme';
import type { RadialProgressUiOptimized } from './progress/radial/theme';

export type UiIcons<TIconName extends string = string> = Partial<Record<TIconName, string>>;
export type UiIconsGroups<TIconName extends string = string> = Record<string, UiIcons<TIconName>>;

export interface AppConfig<TIconName extends string = string> {
  icons?: UiIcons<TIconName>
  allIcons?: UiIconsGroups<TIconName>
  components?: {
    accordion?: AccordionUiOptimized
    badge?: BadgeUiOptimized
    button?: ButtonUiOptimized
    link?: LinkUiOptimized
    tabs?: TabsUiOptimized
    timer?: TimerUiOptimized
    tooltip?: TooltipUiOptimized
    faq?: FaqUiOptimized
    readMore?: ReadMoreUiOptimized
    radialProgress?: RadialProgressUiOptimized
  }
  store?: {
    env?: {
      isMockerMode?: boolean
      isMobile: boolean
      isServer?: boolean
    }
  }
}
