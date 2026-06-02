# Fixtures

Fixtures are props that render a specific product state.

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
