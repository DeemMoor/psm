<?php

use App\Kernel;
use Symfony\Component\ErrorHandler\Debug;

require dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    $kernel = new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);

    if ($context['APP_DEBUG']) {
        Debug::enable();
    }

    return $kernel;
};
