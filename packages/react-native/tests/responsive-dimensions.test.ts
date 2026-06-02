import { describe, expect, it } from 'vitest';
import { toScaledSize } from '../src/dimensions';

describe('responsive dimensions helpers', () => {
  it('normalizes FrameBoard dimensions to a React Native ScaledSize shape', () => {
    expect(toScaledSize({ height: 852, width: 393 })).toEqual({
      fontScale: 1,
      height: 852,
      scale: 2,
      width: 393,
    });
  });

  it('preserves host-provided scale values', () => {
    expect(toScaledSize({
      fontScale: 1.2,
      height: 667,
      scale: 3,
      width: 375,
    })).toEqual({
      fontScale: 1.2,
      height: 667,
      scale: 3,
      width: 375,
    });
  });
});
