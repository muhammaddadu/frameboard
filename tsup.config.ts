import { defineConfig } from 'tsup';

const external = [
  '@frameboard/core',
  'html-to-image',
  'lucide-react',
  'lucide-react-native',
  'react',
  'react-dom',
  'react-native',
  'react-native-svg',
];

export default defineConfig([
  {
    clean: true,
    dts: true,
    entry: ['packages/core/src/index.ts'],
    external,
    format: ['esm'],
    outDir: 'packages/core/dist',
    sourcemap: true,
  },
  {
    clean: true,
    dts: true,
    entry: ['packages/react/src/index.ts'],
    external,
    format: ['esm'],
    outDir: 'packages/react/dist',
    sourcemap: true,
  },
  {
    clean: true,
    dts: true,
    entry: ['packages/react-native/src/index.ts'],
    external,
    format: ['esm'],
    outDir: 'packages/react-native/dist',
    sourcemap: true,
  },
]);
