<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'home', methods: ['GET'])]
    public function index(): Response
    {
        $index = $this->getParameter('kernel.project_dir').'/public/index.html';

        if (!is_file($index)) {
            return new Response('Соберите frontend командой npm run build.', Response::HTTP_SERVICE_UNAVAILABLE);
        }

        return new Response((string) file_get_contents($index), headers: ['Content-Type' => 'text/html; charset=utf-8']);
    }
}
