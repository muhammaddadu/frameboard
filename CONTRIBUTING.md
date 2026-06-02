# Contributing

Thanks for working on FrameBoard.

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

## Examples

```bash
pnpm dev:react
pnpm dev:native
```

## Coding Standards

- Keep `@frameboard/core` framework-agnostic.
- Keep React-only code in `@frameboard/react`.
- Keep React Native / Expo support in `@frameboard/react-native`.
- Keep examples out of package source.
- Keep host app side effects out of fixture-rendered screens.
- Update docs when public APIs, setup, commands, or workflows change.

## Pull Request Expectations

- Explain the problem and the change.
- Add or update tests for changed behavior.
- Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build`.
- Keep changes focused. Avoid unrelated refactors.

## Adding A Fixture State

Add a durable state id and props:

```tsx
{
  id: 'permissionDenied',
  props: { title: 'Camera permission is needed' },
}
```

Prefer state names like `loading`, `empty`, `error`, `processing`, `saved`, `filteredResults`, `longContent`, and `tabletSplit`.

## Adding A Device Preset

Add a device object:

```ts
{
  id: 'foldable',
  name: 'Foldable',
  detail: '673 x 841',
  width: 673,
  height: 841,
}
```

Device presets should represent useful audit targets, not every possible device.

## Adding A Package Export

1. Add the source export in the package `src/index.ts`.
2. Add the export path in the package `package.json`.
3. Confirm `pnpm build` emits the expected `dist/` file and declaration.
4. Document the export if it is public API.
