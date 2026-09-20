import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'],
    globals: true,
    testTimeout: 30_000,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
