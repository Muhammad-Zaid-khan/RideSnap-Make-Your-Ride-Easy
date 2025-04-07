import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    proxy: {
      '/RideSnap': 'http://localhost/8080',
    },
  },
  plugins: [
    tailwindcss(),
  ],
});




