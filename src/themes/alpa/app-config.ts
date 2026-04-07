import type { AppConfig } from '../../components/types';
import accordionTheme from './components/accordion/theme.generated';
import badgeTheme from './components/badge/theme.generated';
import buttonTheme from './components/button/theme.generated';
import linkTheme from './components/link/theme.generated';
import tabsTheme from './components/tabs/theme.generated';
import timerTheme from './components/timer/theme.generated';
import tooltipTheme from './components/tooltip/theme.generated';
import faqTheme from './components/faq/theme.generated';
import { allIcons, icons, type UiIconName } from './icons/config';

const appConfig: AppConfig<UiIconName> = {
  icons: icons,
  allIcons: allIcons,
  components: {
    accordion: accordionTheme,
    badge: badgeTheme,
    button: buttonTheme,
    link: linkTheme,
    tabs: tabsTheme,
    timer: timerTheme,
    tooltip: tooltipTheme,
    faq: faqTheme,
  },
  store: {
    env: {
      isMockerMode: false,
    },
  },
};

export default appConfig;
