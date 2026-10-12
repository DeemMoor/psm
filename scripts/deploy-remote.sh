#!/usr/bin/env bash
#
# Запускается НА СЕРВЕРЕ (BeGet) после git pull. Обновляет прод:
# зависимости, миграции, кэш. Локально не запускать.
# Фронт здесь НЕ собирается — он собран локально и заливается rsync'ом (make deploy).
#
set -euo pipefail

# Перейти в backend/, где бы скрипт ни вызвали.
cd "$(dirname "$0")/../backend"

echo ">> composer install (--no-dev)"
php8.5 ~/.local/bin/composer install --no-dev --optimize-autoloader

echo ">> миграции БД"
php8.5 bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration

echo ">> чистка кэша"
php8.5 bin/console cache:clear

echo ">> бэкенд обновлён"
