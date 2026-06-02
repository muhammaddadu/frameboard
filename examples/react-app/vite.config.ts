import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.FRAMEBOARD_BASE_PATH ?? '/',
  plugins: [react()],
});
