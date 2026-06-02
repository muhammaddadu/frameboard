import {
  createContext,
  useContext,
  type PropsWithChildren,
} from 'react';
import {
  useWindowDimensions,
  type ScaledSize,
} from 'react-native';
import { type FrameBoardDimensions } from '@frameboard/core';

const ResponsiveDimensionsContext = createContext<ScaledSize | null>(null);

export function toScaledSize(dimensions: FrameBoardDimensions): ScaledSize {
  return {
    fontScale: dimensions.fontScale ?? 1,
    height: dimensions.height,
    scale: dimensions.scale ?? 2,
    width: dimensions.width,
  };
}

export function ResponsiveDimensionsProvider({
  children,
  value,
}: PropsWithChildren<{ value: FrameBoardDimensions | ScaledSize }>) {
  return (
    <ResponsiveDimensionsContext.Provider value={toScaledSize(value)}>
      {children}
    </ResponsiveDimensionsContext.Provider>
  );
}

export function useResponsiveDimensions(): ScaledSize {
  const windowDimensions = useWindowDimensions();
  return useContext(ResponsiveDimensionsContext) ?? windowDimensions;
}
