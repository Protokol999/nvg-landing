import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      overlay: false // Отключить overlay для уменьшения мерцаний
    }
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['gsap', 'framer-motion', 'lenis'],
          'three-vendor': ['three', 'postprocessing']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'framer-motion', 'lenis', 'three', 'postprocessing']
  }
});
