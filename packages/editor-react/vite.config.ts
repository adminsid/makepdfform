import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // Bundle React inline so the Svelte shell doesn't need to provide it
      external: [],
      output: {
        inlineDynamicImports: true,
      },
    },
    // Ensure CSS is injected into JS so consumer doesn't need a separate CSS import
    cssCodeSplit: false,
  },
});
