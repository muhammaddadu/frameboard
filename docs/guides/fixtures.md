# Fixtures

Fixtures are props that render a specific product state.

The most useful FrameBoard screens have a clean boundary: product state comes from top-level props, and the fixture chooses those props. Avoid hiding loading, empty, error, or permission behavior behind fetch hooks that run automatically during render. Keep those hooks in a container, then register the presentational screen in FrameBoard.

## Good State Names

Prefer durable product state names:

- `loading`
- `empty`
- `error`
- `permissionDenied`
- `processing`
- `saved`
- `filteredResults`
- `longContent`
- `dueSoon`
- `tabletSplit`

Avoid names such as `fixture1`, `variantA`, or `testState`.

## Example

```tsx
const inboxStates = [
  {
    id: 'empty',
    props: {
      items: [],
      title: 'Nothing needs review',
    },
  },
  {
    id: 'longContent',
    props: {
      items: Array.from({ length: 50 }, createInboxItem),
      title: 'Long list',
    },
  },
];
```

## Fixture Rules

- Use deterministic sample data.
- Include loading, empty, error, and long-content states for important screens.
- Include dark-mode-sensitive and tablet states when the screen has layout branches.
- Keep side effects out of fixture-rendered components.
