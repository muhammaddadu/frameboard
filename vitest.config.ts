import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@frameboard/core': `${root}packages/core/src/index.ts`,
      '@frameboard/react': `${root}packages/react/src/index.ts`,
      '@frameboard/react-native': `${root}packages/react-native/src/index.ts`,
    },
  },
  test: {
    environment: 'node',
    globals: false,
  },
});
