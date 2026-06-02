# Releasing

FrameBoard is not published yet.

## Versioning Strategy

Use semantic versioning once public releases begin:

- patch: bug fixes and docs
- minor: additive APIs and new renderer features
- major: breaking package API or fixture contract changes

## Recommended Changeset Workflow

Changesets are not installed yet. Add them when publishing is ready:

```bash
pnpm add -D @changesets/cli
pnpm changeset init
```

Recommended flow:

1. Add a changeset for package-affecting PRs.
2. Merge to `main`.
3. Run a release PR that bumps versions and changelog entries.
4. Publish from CI after approval.

## Pre-Release Checklist

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Also verify:

- package metadata is correct
- `dist/` output exists
- examples start
- docs match public APIs
- no host-app-specific code appears in packages

## npm Publishing Checklist

- remove accidental `private` flags from publishable packages
- verify `publishConfig.access` is `public`
- run `pnpm pack` for each package
- inspect tarball contents
- publish a prerelease first

## GitHub Release Checklist

- tag the release
- include changelog summary
- link docs and examples
- attach relevant screenshots if available

## Rollback Strategy

- Deprecate a bad npm version rather than deleting it.
- Publish a patch with the fix.
- Document known broken versions in the changelog.
