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

FrameBoard has the intended package split and two working examples. The repository is still shaped like a private extraction rather than a public GitHub library.

## Package Status

- `@frameboard/core` contains framework-agnostic device definitions, registry helpers, state types, and export filename helpers.
- `@frameboard/react` contains the DOM React board renderer, CSS, and browser PNG export support.
- `@frameboard/react-native` contains the React Native / Expo board renderer, responsive dimension override hook/provider, native device frame, and optional browser PNG export support.

Current gaps:

- package entrypoints point at `src/` instead of production `dist/`
- packages are private and use incomplete metadata
- no package build output exists yet
- package scripts do not include `build`, `clean`, or meaningful `test`
- source files are consumed directly by examples and FileoFix
- package publishing fields such as `files`, `repository`, `homepage`, and `bugs` are missing or incomplete

## Example App Status

- `examples/react-app` runs with Vite and demonstrates multiple screens and states.
- `examples/react-native-app` runs with Expo web and demonstrates responsive dimensions and app-shell rendering.

Current gaps:

- examples do not have README files
- root scripts do not expose convenient `dev:react` or `dev:native` commands
- examples are intentionally small, but docs should explain what each demonstrates

## Public API Status

The current public shape is simple and appropriate:

```tsx
<FrameBoard screens={screens} />
```

Supported host controls include devices, theme mode, app shell rendering, URL params, review notes, and colors.

Current risks:

- there is no runtime validation for empty screens, missing states, or malformed registrations
- package exports are not yet stable enough for npm because they point to source files
- React and React Native renderers use similar APIs but have separate renderer-specific screen types

## Build/Test/Lint Status

Current commands:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`

Current gaps:

- `pnpm test` is only a typecheck alias
- no build command exists
- no clean command exists
- no package artifacts are generated
- no core helper tests exist
- no React renderer smoke test exists

## Open-Source Hygiene Gaps

Missing or incomplete:

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

Missing:

- `.github/workflows/ci.yml`
- pull request and main-branch validation
- install/typecheck/lint/test/build automation
- example build validation
- package artifact validation

Publishing is intentionally not configured yet.

## Documentation Gaps

Existing docs cover architecture, responsive dimensions, screenshot export, theming, app shells, contributing notes, and migration history.

Needed docs:

- getting started
- React integration
- React Native integration
- Expo integration
- fixtures
- device presets
- visual regression roadmap
- AI audit roadmap
- releasing

README needs to be updated for a public audience and should explain how FrameBoard differs from Storybook.

## Publishing Gaps

Before publishing:

- produce `dist/` output for each package
- point package exports to `dist/`
- emit declaration files
- add package metadata
- decide versioning strategy
- add Changesets or document a release workflow
- run package tarball checks
- keep packages private until release is intentional

## Recommended Changes

1. Add project hygiene files and GitHub templates.
2. Harden package metadata and add build/clean scripts.
3. Add a small build pipeline with TypeScript declaration output and bundled JavaScript.
4. Add focused tests for core registry helpers and runtime validation.
5. Add CI that runs install, typecheck, lint, test, and build.
6. Expand docs and example READMEs so a developer can run FrameBoard quickly.
7. Re-run FileoFix compatibility after changing package exports.

## Risks

- Changing exports from `src/` to `dist/` can break local consumers unless the package is built first.
- Bundling React Native code must keep React, React Native, Expo, and icon dependencies external.
- Adding too much release tooling now could make the package harder to maintain before the API stabilizes.
- FileoFix uses a local linked package, so its validation must run after FrameBoard build output exists.
