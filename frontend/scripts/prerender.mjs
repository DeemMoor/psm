// Пререндер: после `vite build` (клиент) и `vite build --ssr` (сервер) отрисовывает
// каждую страницу в готовый HTML. Поисковик получает текст сразу, без выполнения JS,
// а в браузере React «оживляет» эту разметку (hydrateRoot в main.tsx).
//
// Результат — backend/spa/*.html (их отдаёт SpaController). Список страниц
// должен совпадать с src/seo.ts и backend/src/Seo/SitePages.php.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, '../backend/public')
const spaDir = resolve(root, '../backend/spa')

const PAGES = [
  { url: '/', file: 'index.html' },
  { url: '/stack', file: 'stack.html' },
  // Любой несуществующий путь — React отрисует NotFoundPage.
  { url: '/__not-found__', file: '404.html', head: '/404' },
]

const { render, headHtml } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const template = readFileSync(resolve(publicDir, 'index.html'), 'utf-8')

rmSync(spaDir, { recursive: true, force: true })
mkdirSync(spaDir, { recursive: true })

for (const page of PAGES) {
  const html = template
    .replace('<!--app-head-->', headHtml(page.head ?? page.url))
    .replace('<!--app-html-->', render(page.url))
  writeFileSync(resolve(spaDir, page.file), html)
  console.log(`prerendered ${page.url} → backend/spa/${page.file}`)
}

// Шаблон из public/ больше не нужен: HTML отдаёт только Symfony (иначе /index.html — дубль главной).
rmSync(resolve(publicDir, 'index.html'))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
