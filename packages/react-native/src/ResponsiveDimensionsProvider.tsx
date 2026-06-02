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
import { toScaledSize } from './dimensions';

const ResponsiveDimensionsContext = createContext<ScaledSize | null>(null);

export function ResponsiveDimensionsProvider({
  children,
  value,
}: PropsWithChildren<{ value: FrameBoardDimensions | ScaledSize }>) {
  return (
    <ResponsiveDimensionsContext.Provider value={toScaledSize(value) as ScaledSize}>
      {children}
    </ResponsiveDimensionsContext.Provider>
  );
}

export function useResponsiveDimensions(): ScaledSize {
  const windowDimensions = useWindowDimensions();
  return useContext(ResponsiveDimensionsContext) ?? windowDimensions;
}
