import type { AppConfig } from '../../components/types';
import badgeTheme from './components/badge/theme.generated';
import buttonTheme from './components/button/theme.generated';
import linkTheme from './components/link/theme.generated';
import { allIcons, icons, type UiIconName } from './icons/config';

const appConfig: AppConfig<UiIconName> = {
  icons: icons,
  allIcons: allIcons,
  components: {
    badge: badgeTheme,
    button: buttonTheme,
    link: linkTheme,
  },
  store: {
    env: {
      isMockerMode: false,
    },
  },
};

export default appConfig;
