import { rm } from 'node:fs/promises';

const paths = [
  'packages/core/dist',
  'packages/react/dist',
  'packages/react-native/dist',
  'examples/react-app/dist',
  'examples/react-native-app/.expo',
  'pages-dist',
  'coverage',
];

await Promise.all(
  paths.map((path) => rm(path, { force: true, recursive: true })),
);
