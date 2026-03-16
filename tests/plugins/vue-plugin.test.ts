import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { App } from 'vue';
import { AppConfigSymbol } from '../../src/composables/useAppConfig';
import UnityUI from '../../src/plugins/vue-plugin';
import { getThemeConfig } from '../../src/themes/registry';

vi.mock('../../src/themes/registry', () => ({
  getThemeConfig: vi.fn(),
}));

describe('UnityUI plugin', () => {
  const provide = vi.fn();
  const app = {
    provide,
    config: {
      globalProperties: {},
    },
  } as unknown as App;

  beforeEach(() => {
    provide.mockReset();
    app.config.globalProperties = {};
    vi.mocked(getThemeConfig).mockReset();
  });

  it('installs theme config with the default theme name', () => {
    const themeConfig = { icons: { close: '<svg />' } };
    vi.mocked(getThemeConfig).mockReturnValue(themeConfig);

    UnityUI.install(app);

    expect(getThemeConfig).toHaveBeenCalledWith('alpa');
    expect(provide).toHaveBeenCalledWith(AppConfigSymbol, themeConfig);
    expect(app.config.globalProperties.$appConfig).toBe(themeConfig);
  });

  it('installs theme config for the provided theme name', () => {
    const themeConfig = { store: { env: { isMockerMode: true } } };
    vi.mocked(getThemeConfig).mockReturnValue(themeConfig);

    UnityUI.install(app, 'king');

    expect(getThemeConfig).toHaveBeenCalledWith('king');
    expect(provide).toHaveBeenCalledWith(AppConfigSymbol, themeConfig);
    expect(app.config.globalProperties.$appConfig).toBe(themeConfig);
  });
});
