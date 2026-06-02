# React Native

Use `@frameboard/react-native` for React Native and React Native Web hosts.

## Setup

```tsx
import {
  FrameBoard,
  useResponsiveDimensions,
} from '@frameboard/react-native';
```

## Responsive Layouts

React Native `useWindowDimensions()` reads the real window. Inside a browser review board, that can be the desktop browser instead of the selected device frame.

Use `useResponsiveDimensions()` for screen layout decisions that should follow FrameBoard device presets:

```tsx
function InboxScreen() {
  const { width } = useResponsiveDimensions();
  const isCompact = width < 390;

  return <InboxLayout compact={isCompact} />;
}
```

In normal app runtime, the hook falls back to React Native `useWindowDimensions()`.

## App Shells

React Native hosts can pass a passive shell:

```tsx
<FrameBoard
  renderAppShell={({ children }) => (
    <View style={{ flex: 1 }}>
      {children}
      <BottomTabs />
    </View>
  )}
  screens={screens}
/>
```

Do not trigger navigation, analytics, storage writes, or native pickers in the shell.
