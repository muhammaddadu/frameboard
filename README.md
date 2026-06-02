# FrameBoard

See every screen and state of your app in one place.

FrameBoard is a reusable screen review board for React, React Native, and Expo apps. Register your screens and fixture states, then inspect them across devices, themes, app shell modes, and responsive breakpoints from a single canvas.

## Packages

- `@frameboard/core` - framework-agnostic registry, devices, params, and utility types.
- `@frameboard/react` - DOM React board for browser apps and Vite examples.
- `@frameboard/react-native` - React Native and Expo board with responsive dimension overrides.

## Install

Publishing is not enabled yet. During local development, consume packages through this pnpm workspace or a local file/workspace link.

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test
```

## React

```tsx
import { FrameBoard } from '@frameboard/react';

<FrameBoard
  screens={[
    {
      id: 'home',
      name: 'Home',
      component: HomeScreen,
      states: [
        { id: 'loading', name: 'Loading', props: { status: 'loading' } },
        { id: 'empty', name: 'Empty', props: { status: 'empty' } },
      ],
    },
  ]}
/>
```

## React Native / Expo

```tsx
import {
  FrameBoard,
  useResponsiveDimensions,
} from '@frameboard/react-native';

function HomeScreen() {
  const { width } = useResponsiveDimensions();
  return <HomeLayout compact={width < 380} />;
}

<FrameBoard screens={screens} />
```

## Concepts

- **Screens** are product surfaces such as Home, Inbox, Settings, or Checkout.
- **States** are durable visual states such as loading, empty, populated, error, long content, or tablet split.
- **Devices** define the simulated artboard dimensions.
- **Product Board** renders all screens and states.
- **Focus View** renders one selected screen and its states.
- **App shell** lets a host render static navigation chrome around a screen.
- **Responsive dimensions** let React Native Views believe they are rendering at the selected device size.

## Documentation

- [Architecture](docs/architecture.md)
- [Responsive Dimensions](docs/responsive-dimensions.md)
- [Screenshot Export](docs/screenshot-export.md)
- [Theming](docs/theming.md)
- [App Shells](docs/app-shells.md)
- [Contributing](docs/contributing.md)
- [Migration Plan](docs/migration-plan.md)
