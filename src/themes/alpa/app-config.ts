import type { AppConfig } from '../../components/types';
import { allIcons, icons, type UiIconName } from './icons/config';

const appConfig: AppConfig<UiIconName> = {
  icons: icons,
  allIcons: allIcons,
  store: {
    env: {
      isMockerMode: false,
    },
  },
};

export default appConfig;
