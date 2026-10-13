import { PHONE } from './contacts'

// Канонический адрес сайта (дублирует SITE_URL из backend/.env.prod — менять в обоих местах).
export const SITE_URL = 'https://psm-carbon.ru'
export const SITE_NAME = 'Графитовые лопатки'

export type PageMeta = {
  title: string
  description: string
  // noindex — страница открыта, но поисковикам велено её не индексировать.
  noindex?: boolean
}

// Мета-данные страниц. Список путей должен совпадать с backend/src/Seo/SitePages.php.
export const PAGES: Record<string, PageMeta> = {
  '/': {
    title: 'Продажа графитовых лопаток — psm-carbon.ru',
    description: `Графитовые лопатки для промышленного оборудования. Наличие и условия поставки — по телефону ${PHONE}.`,
  },
  '/stack': {
    title: 'Tech Stack — Графитовые лопатки',
    description: 'Технологии, на которых работает сайт.',
    noindex: true,
  },
}

export const NOT_FOUND: PageMeta = {
  title: 'Страница не найдена — Графитовые лопатки',
  description: 'Такой страницы нет. Перейдите на главную.',
  noindex: true,
}

export function metaFor(path: string): PageMeta {
  return PAGES[path] ?? NOT_FOUND
}

// Микроразметка Schema.org для главной: поисковики берут из неё название и телефон.
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  telephone: PHONE.replace(/[^+\d]/g, ''),
  description: PAGES['/'].description,
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Теги <head> для пререндера: title, description, canonical, robots, Open Graph, JSON-LD.
export function headHtml(path: string): string {
  const meta = metaFor(path)
  const url = `${SITE_URL}${path}`
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    meta.noindex
      ? '<meta name="robots" content="noindex, follow" />'
      : `<link rel="canonical" href="${escape(url)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="ru_RU" />',
    `<meta property="og:site_name" content="${escape(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${escape(url)}" />`,
  ]
  if (path === '/') {
    // JSON внутри <script>: экранируем "<", чтобы строка не могла закрыть тег.
    tags.push(`<script type="application/ld+json">${JSON.stringify(ORGANIZATION).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}
