<?php

declare(strict_types=1);

namespace App\Controller;

use App\Seo\SitePages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Отдаёт пререндеренный React-фронт: для известных страниц (SitePages) — их HTML
 * с кодом 200, для всего остального — страницу 404 с кодом 404 (никаких «soft 404»).
 *
 * HTML лежит в backend/spa/ (кладёт `npm run build`), а не в public/,
 * чтобы его нельзя было открыть напрямую по /index.html и т.п.
 *
 * priority: -100 — срабатывает последним, когда ничего другое не подошло.
 * Регексп исключает api/bundles/_profiler — у них свои штатные 404.
 */
final class SpaController extends AbstractController
{
    public function __construct(private readonly SitePages $pages)
    {
    }

    #[Route('/', name: 'spa_home', methods: ['GET', 'HEAD'], priority: -100)]
    #[Route(
        '/{path}',
        name: 'spa_fallback',
        requirements: ['path' => '^(?!api/|bundles/|_(profiler|wdt)).+'],
        methods: ['GET', 'HEAD'],
        priority: -100,
    )]
    public function index(Request $request): Response
    {
        $page = $this->pages->find($request->getPathInfo());

        return $page !== null
            ? $this->renderHtml($page['file'], Response::HTTP_OK)
            : $this->renderHtml(SitePages::NOT_FOUND_FILE, Response::HTTP_NOT_FOUND);
    }

    private function renderHtml(string $file, int $status): Response
    {
        $path = $this->getParameter('kernel.project_dir').'/spa/'.$file;

        if (!is_file($path)) {
            return new Response(
                'React ещё не собран. Выполните: make front-build',
                $status,
                ['Content-Type' => 'text/plain; charset=utf-8'],
            );
        }

        return new Response(
            (string) file_get_contents($path),
            $status,
            ['Content-Type' => 'text/html; charset=utf-8'],
        );
    }
}
