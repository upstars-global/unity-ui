import { describe, expect, it } from 'vitest';
import * as uiKit from './index';

describe('ui-kit public API', () => {
  it('keeps root entry empty for on-demand imports', () => {
    expect(Object.keys(uiKit)).toHaveLength(0);
  });
});
