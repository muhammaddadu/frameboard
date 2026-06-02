# React

Use `@frameboard/react` for DOM React apps.

## Setup

```tsx
import { FrameBoard } from '@frameboard/react';
import '@frameboard/react/styles.css';
```

## Example

```tsx
type SearchProps = {
  query: string;
  results: string[];
};

function SearchScreen({ query, results }: SearchProps) {
  return (
    <main>
      <h1>Search</h1>
      <p>{query}</p>
      {results.map((result) => <article key={result}>{result}</article>)}
    </main>
  );
}

const screens = [
  {
    id: 'search',
    name: 'Search',
    component: SearchScreen,
    states: [
      { id: 'empty', props: { query: '', results: [] } },
      { id: 'filteredResults', props: { query: 'invoice', results: ['Invoice.pdf'] } },
    ],
  },
];
```

## Controls

The React renderer shows all toolbar controls by default. Use `controls` when a project needs a focused board, a locked-down demo, or a simpler GitHub Pages example.

```tsx
<FrameBoard
  controls={{
    devices: true,
    export: false,
    notes: false,
    theme: true,
    zoom: true,
  }}
  screens={screens}
/>
```

Available controls:

| Control | Purpose |
| --- | --- |
| `chrome` | Toggle app shell versus content-only rendering. |
| `devices` | Show device, responsive, tablet, and desktop preset buttons. |
| `export` | Export the selected artboard or all states for the selected screen. |
| `notes` | Show or hide review notes. |
| `reviewMode` | Toggle focused screen review and product board review. |
| `states` | Toggle selected state and all states for one screen. |
| `theme` | Switch light, dark, and system theme modes. |
| `zoom` | Fit, zoom in, and zoom out. |

## Devices

FrameBoard includes phone, tablet, responsive, and desktop presets. Pass `devices` to limit the toolbar to the audit targets that matter for a project.

```tsx
import { defaultFrameBoardDevices } from '@frameboard/core';

const appDevices = defaultFrameBoardDevices.filter((device) => device.kind !== 'desktop');

<FrameBoard defaultDeviceId='responsive' devices={appDevices} screens={screens} />;
```

When `Responsive` is selected, the toolbar exposes width and height inputs. The same size can be deep-linked with URL params:

```text
?device=responsive&width=1280&height=720
```

FrameBoard device screens are CSS containers, so app code can use container queries when layout should react to the selected artboard size rather than the host browser viewport:

```css
@container (max-width: 720px) {
  .page-shell {
    grid-template-columns: 1fr;
  }
}
```

## Notes

- Import the CSS once in the host route or app entry.
- Browser PNG export captures the artboard element, not the whole page.
- Keep fixture components free of network calls and storage writes.
