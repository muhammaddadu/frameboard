import { describe, expect, it } from 'vitest';
import { defaultFrameBoardDevices } from '../src';

describe('default device presets', () => {
  it('contains the audit devices expected by FrameBoard examples', () => {
    expect(defaultFrameBoardDevices.map((device) => device.id)).toEqual([
      'iphone-se',
      'iphone-15',
      'large-android',
      'tablet',
    ]);
  });

  it('uses positive dimensions for every preset', () => {
    for (const device of defaultFrameBoardDevices) {
      expect(device.width).toBeGreaterThan(0);
      expect(device.height).toBeGreaterThan(0);
    }
  });
});
