import { type FrameBoardDimensions } from '@frameboard/core';

export type FrameBoardScaledSize = {
  fontScale: number;
  height: number;
  scale: number;
  width: number;
};

export function toScaledSize(dimensions: FrameBoardDimensions): FrameBoardScaledSize {
  return {
    fontScale: dimensions.fontScale ?? 1,
    height: dimensions.height,
    scale: dimensions.scale ?? 2,
    width: dimensions.width,
  };
}
