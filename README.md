# Графитовые лопатки — psm-carbon.ru

Одностраничный сайт «Продажа графитовых лопаток».
Стек: **Symfony 7.4 (PHP 8.5) + React 19 / Vite 8 / TypeScript**, MySQL 8.4.

```
backend/    Symfony (docroot backend/public, код в backend/src)
frontend/   React + Vite (собирается в backend/public)
docker/     Dockerfile php-fpm и конфиг nginx для локальной разработки
scripts/    deploy-remote.sh — серверная часть деплоя
docs/       deploy-beget.md — первичная установка на BeGet
```

## Локально (только Docker)

```sh
make init      # первый раз: образы, composer install, сборка фронта, подъём контейнеров
make up        # потом — просто поднять
```

- Сайт (nginx + Symfony): http://localhost:8083
- Vite с горячей перезагрузкой: http://localhost:5175
- MySQL с хоста: `localhost:3308` (psm / psm)

Полезное: `make sh`, `make console c="about"`, `make composer c="require ..."`, `make lint`, `make front-build`.

## Деплой

```sh
make deploy    # из master: сборка фронта локально → git push → сервер (git pull, composer, миграции) → rsync фронта
```

Node на сервере не нужен — заливаются готовые файлы. Первичная установка: `docs/deploy-beget.md`.

