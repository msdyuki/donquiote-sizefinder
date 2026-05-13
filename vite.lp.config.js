import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // For LP, we can use relative paths so it works anywhere
  build: {
    outDir: 'dist-lp',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './lp.html'
      }
    }
  },
});
