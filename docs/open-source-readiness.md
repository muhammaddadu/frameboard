# Open-Source Readiness

## Current Repo Structure

```text
frameboard/
  packages/
    core/
    react/
    react-native/
  examples/
    react-app/
    react-native-app/
  docs/
  website/
```

FrameBoard has the intended package split, two working examples, open-source project files, CI, tests, and package build output. It is close to public GitHub readiness but still needs final release decisions before npm publishing.

## Package Status

- `@frameboard/core` contains framework-agnostic device definitions, registry helpers, state types, and export filename helpers.
- `@frameboard/react` contains the DOM React board renderer, CSS, and browser PNG export support.
- `@frameboard/react-native` contains the React Native / Expo board renderer, responsive dimension override hook/provider, native device frame, and optional browser PNG export support.

Completed:

- package entrypoints point at production `dist/`
- packages include MIT license metadata, keywords, repository, homepage, bugs, files, and public publish config
- `pnpm build` emits JavaScript, source maps, declarations, and React CSS
- scripts now include `build`, `clean`, `typecheck`, `lint`, and `test`
- package tests cover core helpers, validation, responsive dimensions, and React render smoke behavior

## Example App Status

- `examples/react-app` runs with Vite and demonstrates multiple screens and states.
- `examples/react-native-app` runs with Expo web and demonstrates responsive dimensions and app-shell rendering.

Completed:

- each example has a README
- root scripts expose `pnpm dev:react` and `pnpm dev:native`
- examples remain intentionally small and demonstrate the major integration points

## Public API Status

The current public shape is simple and appropriate:

```tsx
<FrameBoard screens={screens} />
```

Supported host controls include devices, theme mode, app shell rendering, URL params, review notes, and colors.

Current risks:

- React and React Native renderers use similar APIs but have separate renderer-specific screen types
- public API naming should receive one more review before npm publishing

## Build/Test/Lint Status

Current commands:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`

Completed:

- `pnpm test` runs Vitest
- `pnpm build` generates package artifacts and builds the React example
- `pnpm clean` removes generated outputs
- core helper tests and React render smoke tests exist

## Open-Source Hygiene Gaps

Completed:

- `LICENSE`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- `CHANGELOG.md`
- `.editorconfig`
- `.prettierrc`
- ESLint configuration
- GitHub issue templates
- pull request template
- Node and pnpm version guidance

## CI/CD Gaps

Completed:

- `.github/workflows/ci.yml`
- pull request and main-branch validation
- install/typecheck/lint/test/build automation
- example build validation
- package artifact validation

Publishing is intentionally not configured yet.

## Documentation Gaps

Completed docs now cover architecture, getting started, React, React Native, Expo, fixtures, device presets, responsive dimensions, screenshot export, theming, app shells, visual regression roadmap, AI audit roadmap, releasing, contributing, and migration history.

## Publishing Gaps

Before publishing:

- run final package tarball checks
- decide versioning strategy
- add Changesets or document a release workflow
- decide whether to add Changesets before first npm prerelease

## Recommended Changes

1. Add project hygiene files and GitHub templates.
2. Harden package metadata and add build/clean scripts.
3. Add a small build pipeline with TypeScript declaration output and bundled JavaScript.
4. Add focused tests for core registry helpers and runtime validation.
5. Add CI that runs install, typecheck, lint, test, and build.
6. Expand docs and example READMEs so a developer can run FrameBoard quickly.
7. Re-run a linked-host compatibility check after changing package exports.

## Risks

- Changing exports from `src/` to `dist/` can break local consumers unless the package is built first.
- Bundling React Native code must keep React, React Native, Expo, and icon dependencies external.
- Adding too much release tooling now could make the package harder to maintain before the API stabilizes.
- Local linked host apps need package build output, so compatibility validation must run after `pnpm build`.
