# FrameBoard

See every screen and state of your app in one place.

FrameBoard is a screen review board for React, React Native, and Expo apps. It renders registered screens against fixture states in a Figma-style canvas so product, design, and engineering teams can review UI states without opening real app flows.

FrameBoard is currently private and unpublished.

## Packages

- `@frameboard/core`: framework-agnostic devices, registry helpers, URL param normalization, and export naming utilities.
- `@frameboard/react`: DOM React board renderer with canvas UI and PNG export.
- `@frameboard/react-native`: React Native / Expo renderer with responsive dimension overrides and native-style device frames.

## Install

This repository uses pnpm workspaces:

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test
```

The packages are private during extraction. Use workspace or local `link:` dependencies until publishing is planned.

## React Example

```tsx
import { FrameBoard } from "@frameboard/react";
import "@frameboard/react/styles.css";

function HomeScreen(props: { title: string }) {
  return <main>{props.title}</main>;
}

export function Gallery() {
  return (
    <FrameBoard
      screens={[
        {
          id: "home",
          name: "Home",
          component: HomeScreen,
          states: [
            { id: "loading", props: { title: "Loading" } },
            { id: "empty", props: { title: "Nothing here yet" } },
          ],
        },
      ]}
    />
  );
}
```

Run the Vite example:

```bash
pnpm --filter @frameboard/react-app dev
```

## React Native / Expo Example

```tsx
import {
  FrameBoard,
  useResponsiveDimensions,
} from "@frameboard/react-native";
import { Text } from "react-native";

function HomeScreen() {
  const { width } = useResponsiveDimensions();
  return <Text>{width < 390 ? "Compact" : "Regular"}</Text>;
}

export function Gallery() {
  return (
    <FrameBoard
      screens={[
        {
          id: "home",
          name: "Home",
          component: HomeScreen,
          states: [{ id: "ready" }],
        },
      ]}
    />
  );
}
```

Run the Expo example:

```bash
pnpm --filter @frameboard/react-native-app start
```

## Concepts

- **Screens** are host app components.
- **States** are fixture-driven prop sets for those screens.
- **Device presets** define the simulated artboard width and height.
- **App shells** are optional host-provided wrappers for tabs, headers, or navigation chrome.
- **Responsive dimensions** let React Native screen Views receive the selected device width in the board instead of the browser viewport.
- **Screenshot export** captures rendered artboards with predictable filenames like `home-loading-iphone-15-light.png`.

## API

The smallest useful API is:

```tsx
<FrameBoard screens={screens} />
```

Useful optional props:

- `devices`
- `defaultDeviceId`
- `themeMode`
- `isDark`
- `renderAppShell`
- `params`
- `onParamsChange`
- `onThemeModeChange`
- `notes`
- `colors`

## Repository Layout

```txt
packages/
  core/
  react/
  react-native/
examples/
  react-app/
  react-native-app/
docs/
```

## Status

FrameBoard has been extracted from FileoFix into a standalone private repository. The next hardening step is replacing FileoFix's internal package dependency with this repository and validating its gallery routes.
