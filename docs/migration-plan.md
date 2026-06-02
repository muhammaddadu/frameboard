# FrameBoard Migration Plan

## Goal

Extract FrameBoard from the FileoFix monorepo into a standalone, reusable library for React, React Native, and Expo applications.

FrameBoard product tagline:

> See every screen and state of your app in one place.

The standalone repository will live at:

```text
/Users/muhammaddadu/Developer/Personal/repos/frameboard
```

## Current Architecture

FrameBoard currently exists as a private internal package in the FileoFix monorepo:

```text
filofix-ai-app/
  packages/screen-board/
    src/
      core/
      react/
      react-native/
  apps/mobile/src/screen-gallery/
    ScreenGallery.tsx
    fileofixAppShell.tsx
    fileofixGalleryConfig.tsx
    screenGalleryRoute.tsx
```

The current package is useful but not yet a clean standalone library:

- `packages/screen-board/src/core/types.ts` imports `ReactNode`, `ScaledSize`, and `ViewStyle`, so core is not framework-agnostic.
- `packages/screen-board/src/react/ScreenBoard.tsx` renders with React Native primitives and `lucide-react-native`, so it is not a DOM React implementation.
- `packages/screen-board/src/react-native/*` is correctly React Native-specific.
- FileoFix adapters are already separated under `apps/mobile/src/screen-gallery/`.

## Generic Modules

These modules are generic enough to extract, with adjustments:

| Current module | Target package | Notes |
| --- | --- | --- |
| `core/devices.ts` | `@frameboard/core` | Keep default device presets. |
| `core/export.ts` | `@frameboard/core` | Keep filename and DOM id helpers, rename from `ScreenBoard*` to `FrameBoard*`. |
| `core/registry.ts` | `@frameboard/core` | Keep param normalization, state name humanization, device lookup, and zoom helpers. |
| `core/types.ts` | `@frameboard/core` | Split framework-neutral types from React/RN render types. |
| `react/exportPng.ts` | `@frameboard/react` | Browser-only DOM export helper. |
| `react/ScreenBoard.tsx` | `@frameboard/react-native` first, then DOM React rewrite | Current renderer is React Native-based despite folder name. |
| `react-native/ResponsiveDimensionsProvider.tsx` | `@frameboard/react-native` | Keep RN fallback to `useWindowDimensions()`. |
| `react-native/NativeDeviceFrame.tsx` | `@frameboard/react-native` | Keep RN device frame, consider renaming to `DeviceFrame`. |

## FileoFix-Specific Modules

These must not move into the library:

| Module | Reason |
| --- | --- |
| `apps/mobile/src/screen-gallery/fileofixGalleryConfig.tsx` | Imports FileoFix screens, fixtures, responsive content helper, tab inset, and placeholder split-view content. |
| `apps/mobile/src/screen-gallery/fileofixAppShell.tsx` | Uses FileoFix theme hooks and tab labels. |
| `apps/mobile/src/screen-gallery/screenGalleryRoute.tsx` | Uses Expo Router and FileoFix theme mode hook. |
| `apps/mobile/src/screen-gallery/ScreenGallery.tsx` | Compatibility wrapper for FileoFix routes. |
| `apps/mobile/src/app/index.tsx` and `/screen-gallery` route files | FileoFix routing concerns. |
| FileoFix screen Views and fixture files | Host app examples only, not library code. |

The standalone repo may include simplified demo screens that resemble generic product surfaces, but no FileoFix copy, fixtures, visual assets, routes, repositories, AI helpers, scanner APIs, storage, analytics, or app theme hooks.

## Dependencies

Current internal package dependencies:

- `react`
- `react-native`
- `react-native-web`
- `react-native-svg`
- `lucide-react-native`
- `typescript`

Target dependency split:

### `@frameboard/core`

Dependencies:

- none at runtime

Must not depend on React, React Native, Expo, DOM APIs, or FileoFix.

### `@frameboard/react`

Dependencies:

- `react`
- `@frameboard/core`
- icon package for DOM React, likely `lucide-react`

Must not depend on React Native, Expo, or FileoFix.

### `@frameboard/react-native`

Dependencies:

- `react`
- `react-native`
- `@frameboard/core`
- icon package for React Native, likely `lucide-react-native`
- `react-native-svg` as a peer dependency for icons

Must not depend on Expo Router or FileoFix.

### Examples

`examples/react-app`:

- Vite
- React
- `@frameboard/react`

`examples/react-native-app`:

- Expo
- React Native
- `@frameboard/react-native`

## API Direction

Current internal API:

```tsx
<ScreenBoard
  colors={colors}
  config={config}
  isDark={isDark}
  isDev={__DEV__}
  onParamsChange={setParams}
  onThemeModeChange={setThemeMode}
  params={params}
  themeMode={themeMode}
/>
```

Target public API:

```tsx
import { FrameBoard } from '@frameboard/react';

<FrameBoard
  screens={[
    {
      id: 'home',
      name: 'Home',
      component: HomeScreen,
      states: homeStates,
    },
  ]}
/>
```

React Native:

```tsx
import {
  FrameBoard,
  ResponsiveDimensionsProvider,
  useResponsiveDimensions,
} from '@frameboard/react-native';
```

Target changes:

- Rename visible and public API types from `ScreenBoard*` to `FrameBoard*`.
- Prefer `name` over `label` in public screen definitions.
- Accept `screens` directly as a primary prop.
- Keep advanced `config` support internally or as an optional escape hatch.
- Keep URL param control available, but do not require every host to wire it manually for a first render.
- Keep app shell rendering host-supplied.
- Keep theme tokens host-supplied with sensible defaults.

## Target Repository Structure

```text
frameboard/
  packages/
    core/
      src/
    react/
      src/
    react-native/
      src/
  examples/
    react-app/
    react-native-app/
  docs/
  website/
  README.md
```

## Risks

1. **Renderer split risk**
   The current `react` folder is actually a React Native renderer. A real `@frameboard/react` package needs DOM primitives, DOM styles, and `lucide-react` icons.

2. **Core purity risk**
   Current core types import React and React Native types. Moving them unchanged would violate the target package responsibilities.

3. **Screenshot export risk**
   The current DOM export helper uses SVG `foreignObject` and canvas. It is dependency-free but may not capture all CSS/image cases. It is acceptable for manual screenshots but not visual regression.

4. **FileoFix integration risk**
   FileoFix currently imports `@fileofix/screen-board` from an internal workspace package. Replacing it with the extracted package must preserve Product Board, Focus View, device presets, responsive simulation, screenshot export, and app shell mode.

5. **Expo example risk**
   A fully working Expo example adds setup weight. Keep it minimal and use standard Expo scripts.

6. **Package publishing risk**
   Publishing is out of scope. Package names can be scoped as `@frameboard/*`, but versions should stay `0.0.0` and private until API and examples stabilize.

7. **Validation risk**
   React and React Native examples may need separate dev server checks. The extraction is incomplete until package typechecks and examples start.

## Extraction Strategy

1. Create standalone repo shell and migration plan.
2. Create pnpm workspace with packages and examples.
3. Build `@frameboard/core` first:
   - device presets
   - state/screen config types without React types
   - param normalization
   - slug/filename helpers
4. Build `@frameboard/react-native` from the existing RN renderer:
   - move current `ScreenBoard.tsx` and rename public component to `FrameBoard`
   - keep RN primitives and responsive provider
   - replace internal `ScreenBoard*` names where reasonable
   - expose compatibility aliases only if needed for FileoFix migration
5. Build `@frameboard/react` as a DOM implementation:
   - reimplement board shell with DOM elements and CSS
   - reuse core config, devices, state helpers, and export helpers
   - keep screenshot export in React package
6. Add `examples/react-app` using Vite and DOM React package.
7. Add `examples/react-native-app` using Expo and React Native package.
8. Add documentation:
   - architecture
   - responsive dimensions
   - screenshot export
   - theming
   - app shells
   - contributing
9. Update FileoFix:
   - remove or stop using `packages/screen-board`
   - add dependency on the local standalone package via workspace/file link during development
   - update imports to `@frameboard/react-native`
   - preserve existing FileoFix adapter files
10. Validate all packages and FileoFix integration.

## Validation Strategy

Standalone FrameBoard repo:

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm --filter @frameboard/react-app dev
pnpm --filter @frameboard/react-native-app start
```

FileoFix repo:

```bash
corepack pnpm install
corepack pnpm --filter @lifefolio/mobile exec tsc --noEmit
corepack pnpm --filter @lifefolio/mobile lint
corepack pnpm --filter @lifefolio/mobile test:unit
corepack pnpm --filter @lifefolio/mobile screen-gallery
```

Manual verification:

- `/` loads FrameBoard in FileoFix.
- `/screen-gallery` loads FrameBoard alias.
- Product Board renders all registered FileoFix screens and states.
- Focus View renders selected screen/state.
- Device presets change responsive layout calculations.
- Theme changes render light/dark/system modes.
- App shell/content-only mode works.
- Screenshot export controls are present and target artboard DOM nodes.

## Initial Technical Debt To Carry Forward

- DOM React renderer must be implemented rather than copied from the RN renderer.
- The public API should be simplified before publishing.
- Full product board PNG export is not implemented yet.
- Visual regression and CI screenshot automation are out of scope for this extraction.
- Comment/collaboration models are not implemented.
- Documentation website can be scaffolded but does not need full marketing content in the first extraction.
