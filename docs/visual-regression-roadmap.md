# Visual Regression Roadmap

Visual regression is not implemented yet.

## Prerequisites

- stable package API
- deterministic fixture data
- screenshot export for selected artboard and screen-state sets
- consistent browser rendering environment
- CI artifact storage

## Proposed Flow

1. Generate screenshots for selected screen/state/device/theme combinations.
2. Store baseline artifacts.
3. Re-run screenshots in CI.
4. Compare against baselines with tolerance settings.
5. Report changed artboards in pull requests.

## Open Questions

- Which browser renderer should be canonical?
- Should baselines live in git or external artifact storage?
- What fixture matrix is useful without creating too much noise?
