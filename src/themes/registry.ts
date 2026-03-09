import type { AppConfig } from '../components/types';
import alpaConfig from './alpa/app-config';
import kingConfig from './king/app-config';
import type { UiIconName as AlpaIconName } from './alpa/icons/config';
import type { IconName as KingIconName } from './king/icons/config.ts';

export const UI_THEME_NAMES = ['alpa', 'king'] as const;

export type UiThemeName = (typeof UI_THEME_NAMES)[number] | 'alpha';
export type UiThemeIconName = AlpaIconName | KingIconName;

const THEME_CONFIGS = {
  alpa: alpaConfig,
  king: kingConfig,
};

export function getThemeConfig(themeName: UiThemeName = 'alpa'): AppConfig {
  const normalizedTheme = normalizeThemeName(themeName);
  return THEME_CONFIGS[normalizedTheme] as AppConfig;
}

function normalizeThemeName(themeName: UiThemeName): (typeof UI_THEME_NAMES)[number] {
  const normalized = themeName.trim().toLowerCase();
  if (normalized === 'king') {
    return 'king';
  }
  return 'alpa';
}
