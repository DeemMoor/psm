<?php

declare(strict_types=1);

namespace App\Controller;

use App\Seo\SitePages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * robots.txt и sitemap.xml генерируются на лету из реестра страниц (SitePages),
 * поэтому всегда совпадают с реальным сайтом — ничего не надо пересобирать руками.
 */
final class SeoController extends AbstractController
{
    public function __construct(
        private readonly SitePages $pages,
        #[Autowire(env: 'SITE_URL')]
        private readonly string $siteUrl,
        #[Autowire(param: 'kernel.environment')]
        private readonly string $environment,
    ) {
    }

    #[Route('/robots.txt', name: 'seo_robots', methods: ['GET', 'HEAD'])]
    public function robots(): Response
    {
        // Вне прода (локалка, будущий тестовый стенд) индексацию запрещаем целиком.
        $rules = $this->environment === 'prod'
            ? "User-agent: *\nDisallow: /api/\n\nSitemap: {$this->base()}/sitemap.xml\n"
            : "User-agent: *\nDisallow: /\n";

        return new Response($rules, Response::HTTP_OK, ['Content-Type' => 'text/plain; charset=utf-8']);
    }

    #[Route('/sitemap.xml', name: 'seo_sitemap', methods: ['GET', 'HEAD'])]
    public function sitemap(): Response
    {
        $xml = new \XMLWriter();
        $xml->openMemory();
        $xml->setIndent(true);
        $xml->startDocument('1.0', 'UTF-8');
        $xml->startElement('urlset');
        $xml->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

        foreach ($this->pages->indexable() as $path => $page) {
            $xml->startElement('url');
            $xml->writeElement('loc', $this->base().$path);
            $lastmod = $this->lastModified($page['file']);
            if ($lastmod !== null) {
                $xml->writeElement('lastmod', $lastmod);
            }
            $xml->writeElement('changefreq', $page['changefreq']);
            $xml->writeElement('priority', $page['priority']);
            $xml->endElement();
        }

        $xml->endElement();
        $xml->endDocument();

        return new Response($xml->outputMemory(), Response::HTTP_OK, ['Content-Type' => 'application/xml; charset=utf-8']);
    }

    private function base(): string
    {
        return rtrim($this->siteUrl, '/');
    }

    /**
     * Дата изменения страницы = время последнего деплоя её пререндеренного HTML.
     */
    private function lastModified(string $file): ?string
    {
        $path = $this->getParameter('kernel.project_dir').'/spa/'.$file;
        $mtime = is_file($path) ? filemtime($path) : false;

        return $mtime !== false ? date('Y-m-d', $mtime) : null;
    }
}
