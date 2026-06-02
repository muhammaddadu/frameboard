import { describe, expect, it } from 'vitest';
import { defaultFrameBoardDevices, defaultFrameBoardMobileDevices } from '../src';

describe('default device presets', () => {
  it('contains the audit devices expected by FrameBoard examples', () => {
    expect(defaultFrameBoardDevices.map((device) => device.id)).toEqual([
      'iphone-se',
      'iphone-15',
      'large-android',
      'tablet',
      'responsive',
      'desktop',
    ]);
  });

  it('uses positive dimensions for every preset', () => {
    for (const device of defaultFrameBoardDevices) {
      expect(device.width).toBeGreaterThan(0);
      expect(device.height).toBeGreaterThan(0);
    }
  });

  it('exposes a mobile app preset list without responsive or desktop targets', () => {
    expect(defaultFrameBoardMobileDevices.map((device) => device.id)).toEqual([
      'iphone-se',
      'iphone-15',
      'large-android',
      'tablet',
    ]);
  });
});
