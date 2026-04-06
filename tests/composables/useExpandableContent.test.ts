import { beforeEach, describe, expect, it, vi } from 'vitest';

const lifecycleMocks = vi.hoisted(() => ({
  mountedCallbacks: [] as Array<() => void | Promise<void>>,
  beforeUnmountCallbacks: [] as Array<() => void>,
  nextTickMock: vi.fn(() => Promise.resolve()),
}));

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue');

  return {
    ...actual,
    nextTick: lifecycleMocks.nextTickMock,
    onMounted: (callback: () => void | Promise<void>) => {
      lifecycleMocks.mountedCallbacks.push(callback);
    },
    onBeforeUnmount: (callback: () => void) => {
      lifecycleMocks.beforeUnmountCallbacks.push(callback);
    },
  };
});

import { useExpandableContent } from '../../src/composables/useExpandableContent';

describe('useExpandableContent', () => {
  beforeEach(() => {
    lifecycleMocks.mountedCallbacks.length = 0;
    lifecycleMocks.beforeUnmountCallbacks.length = 0;
    lifecycleMocks.nextTickMock.mockClear();
    vi.unstubAllGlobals();
  });

  it('uses the collapsed height until the content is opened', () => {
    const expandableContent = useExpandableContent({ collapsedHeight: 48 });

    expandableContent.content.value = { scrollHeight: 160 } as HTMLElement;
    expandableContent.updateContentHeight();

    expect(expandableContent.isOpen.value).toBe(false);
    expect(expandableContent.contentHeight.value).toBe(160);
    expect(expandableContent.contentStyle.value).toEqual({ maxHeight: '48px' });
  });

  it('uses the full content height when initialOpen is enabled', () => {
    const expandableContent = useExpandableContent({ initialOpen: true });

    expandableContent.content.value = { scrollHeight: 220 } as HTMLElement;
    expandableContent.updateContentHeight();

    expect(expandableContent.isOpen.value).toBe(true);
    expect(expandableContent.contentStyle.value).toEqual({ maxHeight: '220px' });
  });

  it('supports a custom style property', () => {
    const expandableContent = useExpandableContent({
      initialOpen: true,
      styleProperty: 'height',
    });

    expandableContent.content.value = { scrollHeight: 96 } as HTMLElement;
    expandableContent.updateContentHeight();

    expect(expandableContent.contentStyle.value).toEqual({ height: '96px' });
  });

  it('toggles open state and refreshes the content height on the next tick', async () => {
    const expandableContent = useExpandableContent({ collapsedHeight: 24 });

    expandableContent.content.value = { scrollHeight: 180 } as HTMLElement;

    expandableContent.toggleContent();
    await Promise.resolve();

    expect(expandableContent.isOpen.value).toBe(true);
    expect(lifecycleMocks.nextTickMock).toHaveBeenCalledTimes(1);
    expect(expandableContent.contentHeight.value).toBe(180);
    expect(expandableContent.contentStyle.value).toEqual({ maxHeight: '180px' });
  });

  it('sets open state explicitly and refreshes the content height on the next tick', async () => {
    const expandableContent = useExpandableContent();

    expandableContent.content.value = { scrollHeight: 140 } as HTMLElement;

    expandableContent.setOpen(true);
    await Promise.resolve();

    expect(expandableContent.isOpen.value).toBe(true);
    expect(lifecycleMocks.nextTickMock).toHaveBeenCalledTimes(1);
    expect(expandableContent.contentHeight.value).toBe(140);
  });

  it('updates and observes content size when mounted on the client', async () => {
    const observe = vi.fn();
    const disconnect = vi.fn();
    let resizeObserverInstance: ResizeObserverMock | null = null;

    class ResizeObserverMock {
      constructor(public callback: ResizeObserverCallback) {
        resizeObserverInstance = this;
      }

      observe = observe;
      disconnect = disconnect;
    }

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    const expandableContent = useExpandableContent();
    const contentElement = { scrollHeight: 210 } as HTMLElement;
    expandableContent.content.value = contentElement;

    expect(lifecycleMocks.mountedCallbacks).toHaveLength(1);

    await lifecycleMocks.mountedCallbacks[0]();

    expect(lifecycleMocks.nextTickMock).toHaveBeenCalledTimes(1);
    expect(expandableContent.contentHeight.value).toBe(210);
    expect(observe).toHaveBeenCalledWith(contentElement);

    (contentElement as { scrollHeight: number }).scrollHeight = 260;
    resizeObserverInstance?.callback([], {} as ResizeObserver);

    expect(expandableContent.contentHeight.value).toBe(260);

    expect(lifecycleMocks.beforeUnmountCallbacks).toHaveLength(1);

    lifecycleMocks.beforeUnmountCallbacks[0]();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('skips mounting work in server mode', async () => {
    const expandableContent = useExpandableContent({ isServer: true });
    expandableContent.content.value = { scrollHeight: 150 } as HTMLElement;

    expect(lifecycleMocks.mountedCallbacks).toHaveLength(1);

    await lifecycleMocks.mountedCallbacks[0]();

    expect(lifecycleMocks.nextTickMock).not.toHaveBeenCalled();
    expect(expandableContent.contentHeight.value).toBe(0);
  });
});
