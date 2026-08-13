import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { App } from 'vue';
import { AppConfigSymbol } from '../../src/composables/useAppConfig';
import { EventBusSymbol } from '../../src/composables/useEventBus';
import UnityUI from '../../src/plugins/vue-plugin';

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
  });

  it('installs the provided theme config', () => {
    const themeConfig = { icons: { close: '<svg />' } };

    UnityUI.install(app, { themeConfig });

    expect(provide).toHaveBeenCalledWith(AppConfigSymbol, themeConfig);
    expect(app.config.globalProperties.$appConfig).toBe(themeConfig);
  });

  it('installs the provided event bus', () => {
    const themeConfig = { icons: { close: '<svg />' } };
    const bus = { $emit: vi.fn() };

    UnityUI.install(app, { themeConfig, bus });

    expect(provide).toHaveBeenCalledWith(AppConfigSymbol, themeConfig);
    expect(provide).toHaveBeenCalledWith(EventBusSymbol, bus);
    expect(app.config.globalProperties.$appConfig).toBe(themeConfig);
    expect(app.config.globalProperties.$bus).toBe(bus);
  });
});
