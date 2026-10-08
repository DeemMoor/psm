import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',
    emptyOutDir: false,
  },
  server: {
    host: true,
    port: 5174,
    proxy: { '/api': { target: 'http://nginx', changeOrigin: true } },
  },
})
