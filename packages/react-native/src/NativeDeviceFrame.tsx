import { type ReactNode } from 'react';
import {
  View,
  type ScaledSize,
} from 'react-native';
import {
  type FrameBoardColors,
  type FrameBoardDevice,
} from '@frameboard/core';
import { ResponsiveDimensionsProvider } from './ResponsiveDimensionsProvider.js';

export function NativeDeviceFrame({
  children,
  colors,
  device,
  dimensions,
}: {
  children: ReactNode;
  colors: FrameBoardColors;
  device: FrameBoardDevice;
  dimensions: ScaledSize;
}) {
  return (
    <View
      style={{
        backgroundColor: colors.paper,
        borderColor: colors.border,
        borderRadius: device.id === 'tablet' ? 22 : 28,
        borderWidth: 1,
        boxShadow: '0 8px 24px rgba(31, 29, 43, 0.14)',
        height: device.height,
        overflow: 'hidden',
        padding: device.id === 'tablet' ? 12 : 10,
        width: device.width,
      }}
    >
      <View
        style={{
          backgroundColor: colors.card,
          borderColor: colors.selectedSoft,
          borderRadius: device.id === 'tablet' ? 14 : 20,
          borderWidth: 1,
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <ResponsiveDimensionsProvider value={dimensions}>
          <View style={{ flex: 1, minHeight: 0 }}>
            {children}
          </View>
        </ResponsiveDimensionsProvider>
      </View>
    </View>
  );
}
