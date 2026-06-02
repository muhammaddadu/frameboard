# Responsive Dimensions

React Native screens often use `useWindowDimensions()` to choose compact, regular, or tablet layouts. In a browser-rendered board, that hook reads the browser viewport, not the selected device artboard.

FrameBoard's React Native package provides:

```tsx
import { useResponsiveDimensions } from "@frameboard/react-native";
```

Use it inside audited screen Views when layout decisions must match the selected device preset.

```tsx
function HomeView() {
  const { width } = useResponsiveDimensions();
  const isTablet = width >= 768;
  return isTablet ? <TabletHome /> : <PhoneHome />;
}
```

In production app runtime, `useResponsiveDimensions()` falls back to React Native `useWindowDimensions()`. Inside FrameBoard artboards, `ResponsiveDimensionsProvider` supplies the selected device dimensions.

Do not monkey-patch React Native globally. Keep the override local to FrameBoard artboards.
