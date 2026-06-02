# FrameBoard

See every screen and state of your app in one place.

FrameBoard is a product-state review board for React and React Native apps. It renders real screen components against fixture states on a Figma-style canvas, so teams can review screens, device presets, responsive layouts, themes, app-shell previews, and screenshot exports without manually clicking through an app.

FrameBoard is pre-release and not published to npm yet.

## Website And Demo

The GitHub Pages build publishes one React app as a static artifact. The root route is the library website; the example route renders that same website inside FrameBoard so people can see the pattern in action.

- Public site: `https://muhammaddadu.github.io/frameboard/`
- Live React demo: `https://muhammaddadu.github.io/frameboard/examples/react/`
- Focused state example: `https://muhammaddadu.github.io/frameboard/examples/react/?review=screen&galleryScreen=website&state=prompts&view=selected&zoom=75&device=responsive`
- Local demo: `pnpm dev:react`

## Why FrameBoard?

Modern apps have many states that are hard to review consistently: loading, empty, error, permission denied, processing, long content, dark mode, tablet layouts, and app-shell chrome. FrameBoard makes those states visible as artboards.

Storybook is excellent for component documentation and controls. FrameBoard is narrower: it focuses on whole screen states, device presets, app-shell previews, and product review boards. It is meant to answer, "What does every important screen state look like right now?"

## What It Supports

- Product boards with every registered screen state
- Focused single-state review
- Device presets for phone, tablet, responsive, and desktop layouts
- Configurable toolbar controls for focused demos or internal review boards
- Light, dark, and system theme review
- Optional app-shell rendering for navigation chrome
- Review notes for visual QA passes
- PNG export for individual artboards or full screen-state sets
- React and React Native / Expo renderers

## Packages

| Package | Purpose |
| --- | --- |
| `@frameboard/core` | Framework-agnostic types, device presets, registry helpers, validation, and screenshot filename helpers. |
| `@frameboard/react` | DOM React renderer with canvas UI and PNG export. |
| `@frameboard/react-native` | React Native / Expo renderer with responsive dimension overrides and native-style device frames. |

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

Preview the GitHub Pages output locally:

```bash
pnpm docs:serve
```

In the GitHub repository settings, set Pages to deploy from GitHub Actions. The Pages workflow builds the packages, builds the React example with the correct project base path, and deploys `pages-dist`.

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

FrameBoard gives the best results when screens can be rendered from fixture props. If a screen currently fetches data, reads global state directly, or performs side effects while rendering, refactor the screen boundary first: keep data loading and mutations above the screen, pass state in through props, and register deterministic fixtures in the board.

Use this prompt with a coding agent inside an existing project:

```text
Install FrameBoard in this project.
Audit the codebase and identify the highest-value product screens to review.
Refactor those screens so their visual state comes from top-level props instead of hidden fetches, storage reads, navigation side effects, or global mutations.
Create deterministic fixtures for loading, empty, error, permission, success, processing, long content, responsive, and dark-mode states.
Expose a private FrameBoard route that renders the selected screens inside the real app shell where useful.
Document how future screens and fixture states should be added.
```

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

- [Docs Index](docs/README.md)
- [Getting Started](docs/start/getting-started.md)
- [Architecture](docs/project/architecture.md)
- [React](docs/renderers/react.md)
- [React Native](docs/renderers/react-native.md)
- [Expo](docs/renderers/expo.md)
- [Fixtures](docs/guides/fixtures.md)
- [Device Presets](docs/reference/device-presets.md)
- [Responsive Dimensions](docs/reference/responsive-dimensions.md)
- [Theming](docs/guides/theming.md)
- [App Shells](docs/guides/app-shells.md)
- [Screenshot Export](docs/guides/screenshot-export.md)
- [Releasing](docs/project/releasing.md)

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
