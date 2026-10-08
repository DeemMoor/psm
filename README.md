# Графитовые лопатки

Одностраничный сайт на React + TypeScript + Vite с Symfony 7.4, PHP 8.5 и MySQL 8.4.

## Запуск

```sh
docker compose up --build
```

Сайт: http://localhost:8080. Vite для разработки: http://localhost:5174. Контейнер Node собирает фронтенд в `backend/public` и запускает Vite; PHP-контейнер устанавливает Composer-зависимости при старте.

Номер телефона в `src/main.tsx` сейчас заглушка `+7 (000) 000-00-00`.
