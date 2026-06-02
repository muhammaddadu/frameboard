# Contributing

FrameBoard is private during extraction.

## Commands

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test
```

Run examples:

```bash
pnpm --filter @frameboard/react-app dev
pnpm --filter @frameboard/react-native-app start
```

## Rules

- Keep `@frameboard/core` free of React, React Native, Expo, and host app imports.
- Keep host app screens and fixtures outside packages.
- Do not add publishing tooling until package boundaries are stable.
- Update docs when setup, commands, architecture, or public API changes.
- Prefer small API changes with clear examples.

## Future Publishing Checklist

- add package build output
- add proper unit/component tests
- add changelog/versioning strategy
- add license
- add package publishing workflow
- add screenshot regression workflow
