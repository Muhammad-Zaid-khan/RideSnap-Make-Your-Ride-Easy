import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
export default defineConfig({
  server: {
    proxy: {
      '/RideSnap': 'http://localhost/8080',
    },
  },
  plugins: [
    tailwindcss(),
    react(),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});




