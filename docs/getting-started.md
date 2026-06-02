# Getting Started

FrameBoard renders registered screen components against fixture states on a review canvas.

## Install

FrameBoard is pre-release and not published yet. After publishing:

```bash
pnpm add @frameboard/react @frameboard/core
```

For React Native / Expo:

```bash
pnpm add @frameboard/react-native @frameboard/core
```

## Register A Screen

```tsx
const screens = [
  {
    id: 'home',
    name: 'Home',
    component: HomeScreen,
    states: [
      { id: 'loading', props: { isLoading: true } },
      { id: 'empty', props: { items: [] } },
      { id: 'populated', props: { items: sampleItems } },
    ],
  },
];
```

## Render The Board

React:

```tsx
import { FrameBoard } from '@frameboard/react';
import '@frameboard/react/styles.css';

export function Gallery() {
  return <FrameBoard screens={screens} />;
}
```

React Native / Expo:

```tsx
import { FrameBoard } from '@frameboard/react-native';

export function Gallery() {
  return <FrameBoard screens={screens} />;
}
```

## Next Steps

- Add durable fixture states for loading, empty, error, long content, and responsive layouts.
- Add an app shell if headers or tabs affect the screen.
- Use `useResponsiveDimensions()` in React Native screens that branch on viewport size.
