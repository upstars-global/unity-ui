import { describe, expect, it } from 'vitest';
import { isExternalUrl } from '../../src/helpers/externalUrl';

describe('isExternalUrl', () => {
  it('returns true for absolute http and https urls', () => {
    expect(isExternalUrl('https://example.com')).toBe(true);
    expect(isExternalUrl('http://docs.example.com/path')).toBe(true);
  });

  it('returns false for relative and special protocol links', () => {
    expect(isExternalUrl('/account/profile')).toBe(false);
    expect(isExternalUrl('#billing')).toBe(false);
    expect(isExternalUrl('mailto:test@example.com')).toBe(false);
    expect(isExternalUrl('tel:+380441234567')).toBe(false);
  });

  it('returns false for invalid or incomplete urls', () => {
    expect(isExternalUrl('example.com')).toBe(false);
    expect(isExternalUrl('https://localhost:3000')).toBe(false);
    expect(isExternalUrl('not a url')).toBe(false);
  });
});
