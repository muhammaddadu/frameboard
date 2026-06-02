# Getting Started

FrameBoard renders registered screen components against fixture states on a review canvas.

For an existing app, start by making important screens fixture-friendly. The screen should receive the data that changes its visual state through props, while data loading, mutations, navigation, analytics, and storage stay outside the fixture-rendered component.

Agent prompt:

```text
Install FrameBoard from npm in this project. For React DOM use @frameboard/react and @frameboard/core. For Expo or React Native use @frameboard/react-native and @frameboard/core.
Audit the codebase and identify the highest-value product screens to review.
Refactor those screens so their visual state comes from top-level props instead of hidden fetches, storage reads, navigation side effects, or global mutations.
Create deterministic fixtures for loading, empty, error, permission, success, processing, long content, responsive, and dark-mode states.
Expose a private FrameBoard route that renders the selected screens inside the real app shell where useful.
Document how future screens and fixture states should be added.
```

## Install

React DOM:

```bash
pnpm add @frameboard/react @frameboard/core
```

React Native / Expo:

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
