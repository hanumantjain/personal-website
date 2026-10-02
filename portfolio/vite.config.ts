import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // three.js is lazy-loaded in its own ~540KB chunk; that's expected.
  build: { chunkSizeWarningLimit: 600 },
})
