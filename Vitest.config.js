import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    alias: {
      // Stub all image assets
    },
  },
  resolve: {
    alias: [],
  },
  plugins: [
    react(),
    {
      // Stub .png/.jpg imports to empty string
      name: 'stub-assets',
      resolveId(id) {
        if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(id)) {
          return id;
        }
      },
      load(id) {
        if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(id)) {
          return 'export default ""';
        }
      },
    },
  ],
});
