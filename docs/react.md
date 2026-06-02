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

## Notes

- Import the CSS once in the host route or app entry.
- Browser PNG export captures the artboard element, not the whole page.
- Keep fixture components free of network calls and storage writes.
