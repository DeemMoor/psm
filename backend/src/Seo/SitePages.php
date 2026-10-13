<?php

declare(strict_types=1);

namespace App\Seo;

/**
 * Реестр страниц сайта — единый источник правды для бэкенда:
 * SpaController отдаёт по нему пререндеренный HTML (остальное — 404),
 * SeoController строит из него sitemap.xml.
 *
 * Добавляешь страницу во фронт (App.tsx + frontend/src/seo.ts) — добавь её и сюда.
 */
final class SitePages
{
    /**
     * path => [файл в backend/spa/, индексировать ли, changefreq, priority].
     *
     * @var array<string, array{file: string, indexable: bool, changefreq: string, priority: string}>
     */
    private const array PAGES = [
        '/' => ['file' => 'index.html', 'indexable' => true, 'changefreq' => 'monthly', 'priority' => '1.0'],
        // «Секретная» страница: открыта по прямой ссылке, но закрыта noindex и в sitemap не попадает.
        '/stack' => ['file' => 'stack.html', 'indexable' => false, 'changefreq' => 'monthly', 'priority' => '0.1'],
    ];

    public const string NOT_FOUND_FILE = '404.html';

    /**
     * @return array{file: string, indexable: bool, changefreq: string, priority: string}|null
     */
    public function find(string $path): ?array
    {
        return self::PAGES[$path] ?? null;
    }

    /**
     * @return array<string, array{file: string, indexable: bool, changefreq: string, priority: string}>
     */
    public function indexable(): array
    {
        return array_filter(self::PAGES, static fn (array $page): bool => $page['indexable']);
    }
}
