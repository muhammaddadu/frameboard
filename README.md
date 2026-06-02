# FrameBoard

See every screen and state of your app in one place.

FrameBoard is a product-state review board for React and React Native apps. It renders your screen components against fixture states on a Figma-style canvas so teams can review screens, device presets, responsive layouts, themes, and app-shell previews without manually clicking through the app.

FrameBoard is pre-release and not published to npm yet.

## Why FrameBoard?

Modern apps have many states that are hard to review consistently: loading, empty, error, permission denied, processing, long content, dark mode, tablet layouts, and app-shell chrome. FrameBoard makes those states visible as artboards.

## How It Differs From Storybook

Storybook is excellent for component documentation and interactive component controls. FrameBoard is narrower: it focuses on whole screen states, device presets, app-shell previews, and product review boards. It is meant to answer, "What does every important screen state look like right now?"

## Packages

- `@frameboard/core`: framework-agnostic types, device presets, registry helpers, validation, and screenshot filename helpers.
- `@frameboard/react`: DOM React renderer with canvas UI and PNG export.
- `@frameboard/react-native`: React Native / Expo renderer with responsive dimension overrides and native-style device frames.

## Local Setup

Requirements:

- Node.js 20 or newer
- pnpm 11 through Corepack

```bash
corepack enable
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Run examples:

```bash
pnpm dev:react
pnpm dev:native
```

Build the GitHub Pages demo:

```bash
pnpm build:pages
```

The Pages workflow publishes the React demo from `examples/react-app/dist`. In the GitHub repository settings, set Pages to deploy from GitHub Actions.

## Installation

Packages are not published yet. Once published:

```bash
pnpm add @frameboard/react @frameboard/core
```

For React Native / Expo:

```bash
pnpm add @frameboard/react-native @frameboard/core
```

## React Quickstart

```tsx
import { FrameBoard, type FrameBoardReactScreen } from '@frameboard/react';
import '@frameboard/react/styles.css';

type HomeProps = {
  title: string;
};

function HomeScreen({ title }: HomeProps) {
  return <main>{title}</main>;
}

const screens: FrameBoardReactScreen<HomeProps>[] = [
  {
    id: 'home',
    name: 'Home',
    component: HomeScreen,
    states: [
      { id: 'loading', props: { title: 'Loading' } },
      { id: 'empty', props: { title: 'Nothing here yet' } },
      { id: 'populated', props: { title: 'Three items need review' } },
    ],
  },
];

export function ScreenReview() {
  return <FrameBoard screens={screens} />;
}
```

## React Native / Expo Quickstart

```tsx
import {
  FrameBoard,
  useResponsiveDimensions,
  type FrameBoardNativeScreen,
} from '@frameboard/react-native';
import { Text } from 'react-native';

function HomeScreen() {
  const { width } = useResponsiveDimensions();
  return <Text>{width < 390 ? 'Compact layout' : 'Regular layout'}</Text>;
}

const screens: FrameBoardNativeScreen[] = [
  {
    id: 'home',
    name: 'Home',
    component: HomeScreen,
    states: [{ id: 'ready' }],
  },
];

export function ScreenReview() {
  return <FrameBoard screens={screens} />;
}
```

## Concepts

- **Screen**: a host app screen component registered with FrameBoard.
- **State**: a named fixture variant for a screen, such as `loading`, `empty`, or `error`.
- **Fixture**: props used to render a state.
- **Artboard**: one rendered screen/state/device/theme combination on the canvas.
- **Device preset**: a simulated width and height used by the artboard and responsive hooks.
- **App shell**: optional host-provided wrapper for headers, tabs, or navigation chrome.
- **Responsive dimensions**: React Native override layer that lets audited screens use the selected device size.

## Documentation

- [Getting Started](docs/getting-started.md)
- [Architecture](docs/architecture.md)
- [React](docs/react.md)
- [React Native](docs/react-native.md)
- [Expo](docs/expo.md)
- [Fixtures](docs/fixtures.md)
- [Device Presets](docs/device-presets.md)
- [Responsive Dimensions](docs/responsive-dimensions.md)
- [Theming](docs/theming.md)
- [App Shells](docs/app-shells.md)
- [Screenshot Export](docs/screenshot-export.md)
- [Releasing](docs/releasing.md)

## Roadmap

- package publishing
- screenshot automation
- visual regression
- CI screenshot generation
- AI-assisted UX audit
- collaboration and comments
- documentation website

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
