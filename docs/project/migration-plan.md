# Migration Plan

FrameBoard started as an internal screen-review board and has been extracted into a standalone package workspace.

This document tracks the migration state for maintainers. Public integration guidance lives in the other docs.

## Completed

- Created standalone pnpm workspace.
- Split package responsibilities into `@frameboard/core`, `@frameboard/react`, and `@frameboard/react-native`.
- Added React and Expo examples.
- Added package build output through `tsup`.
- Added focused tests and GitHub CI.
- Added open-source project files and contribution docs.

## Current Package Responsibilities

| Package | Responsibility |
| --- | --- |
| `@frameboard/core` | Framework-agnostic types, devices, registry, validation, and export helpers. |
| `@frameboard/react` | DOM React canvas, sidebar, toolbar, artboards, and browser PNG export. |
| `@frameboard/react-native` | React Native / Expo board UI, responsive dimensions provider, device frame, and optional web export. |

## Remaining Migration Work

- Publish package prereleases only after API review.
- Add package tarball checks.
- Add website implementation.
- Add visual regression once screenshot generation is stable.
- Add broader renderer tests for toolbar interactions and export behavior.

## Validation

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```
