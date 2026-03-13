import type { AppConfig } from '../components/types';
import alpaConfig from './alpa/app-config';
import kingConfig from './king/app-config';
import type { UiIconName as AlpaIconName } from './alpa/icons/config';
import type { IconName as KingIconName } from './king/icons/config.ts';

export const UI_THEME_NAMES = ['alpa', 'king'] as const;

type CanonicalUiThemeName = (typeof UI_THEME_NAMES)[number];
export type UiThemeName = CanonicalUiThemeName;
export type UiThemeIconName = AlpaIconName | KingIconName;

const THEME_CONFIGS: Record<UiThemeName, AppConfig> = {
  alpa: alpaConfig,
  king: kingConfig,
};

export function getThemeConfig(themeName: UiThemeName = 'alpa'): AppConfig {
  return THEME_CONFIGS[themeName];
}
