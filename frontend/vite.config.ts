import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Собираем прямо в backend/public — там же живёт index.php Symfony.
    // emptyOutDir: false — НЕ стирать public (там index.php).
    outDir: '../backend/public',
    emptyOutDir: false,
  },
  server: {
    // host: true — слушать на 0.0.0.0, чтобы дев-сервер был доступен с хоста (из Docker).
    host: true,
    port: 5175,
    // Запросы фронта на /api проксируем на бэкенд (контейнер nginx) — без CORS.
    proxy: {
      '/api': { target: 'http://nginx', changeOrigin: true },
    },
  },
})
