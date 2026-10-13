# Деплой Symfony + React на BeGet (shared)

Код лежит в `app/`, docroot — симлинк на `backend/public`.
Фронт **собирается локально** и заливается готовым — Node на сервере не нужен.

Плейсхолдеры:
- `<DOMAIN>` — каталог сайта на BeGet (`psm-carbon.ru`);
- `<DB>` — имя БД (на BeGet имя пользователя БД **совпадает** с именем базы).

Локально в `Makefile` должны быть заданы `DEPLOY_HOST` (Host из `~/.ssh/config`)
и `DEPLOY_DIR` (`~/<DOMAIN>/app`).

---

## Особенности BeGet

- **PHP вызывается как `php8.5`** (голый `php` — древний 5.6).
- **Composer:** `php8.5 ~/.local/bin/composer`.
- **Веб-корень жёстко `~/<DOMAIN>/public_html`** — обходим симлинком.

## Топология на сервере

```
~/<DOMAIN>/
├── app/                       ← git-репозиторий (github.com/DeemMoor/psm)
│   ├── backend/   (Symfony: src, config, vendor, public/ …)
│   └── frontend/  (исходники React; на сервере не собираются)
├── public_html      →  app/backend/public      (СИМЛИНК — docroot)
└── public_html_old  ←  дефолтная папка (бэкап)
```

---

# Первичная установка

## 1. Клонировать и смапить docroot
```bash
cd ~/<DOMAIN>
mv public_html public_html_old
git clone https://github.com/DeemMoor/psm.git app   # репозиторий публичный — ключ не нужен
ln -s app/backend/public public_html
```
> 403 после симлинка → `Options +FollowSymLinks` в `app/backend/public/.htaccess`.

## 2. База
Панель BeGet → **MySQL** → создать базу и пользователя. Хост — `localhost`.

## 3. `app/backend/.env.local` (только на сервере, в git не идёт)
```bash
cd ~/<DOMAIN>/app/backend
php8.5 -r "echo bin2hex(random_bytes(16)), \"\n\";"   # APP_SECRET
nano .env.local
```
```dotenv
APP_ENV=prod
APP_SECRET=<строка_из_команды_выше>
DATABASE_URL="mysql://<DB>:<ПАРОЛЬ>@localhost:3306/<DB>?serverVersion=8.4&charset=utf8mb4"
```
- `serverVersion` — под реальную СУБД сервера (`php8.5 bin/console dbal:run-sql "SELECT VERSION()"` — `mysql --version` показывает версию клиента, а не сервера; MariaDB → напр. `10.11.2-MariaDB`).
- Спецсимволы в пароле url-кодировать (`@`→`%40`, `#`→`%23`, `%`→`%25`).
- `APP_ENV=prod` обязателен **до** `composer install` (иначе `cache:clear` пойдёт в dev и упадёт на MakerBundle).

## 4. Бэкенд
```bash
cd ~/<DOMAIN>/app
bash scripts/deploy-remote.sh      # composer --no-dev, миграции, cache:clear
```

## 5. Фронт — с локальной машины
Прописать `DEPLOY_DIR` в `Makefile`, затем из `master`:
```bash
make deploy
```

## 6. Проверить
`https://<DOMAIN>/` — открывается лендинг; `app/backend/var/` доступен на запись.

---

# Последующие обновления

Только локально: `make deploy`. Что он делает:
1. проверяет, что дерево чистое и ветка `master`;
2. собирает фронт в контейнере `node` (`npm ci && npm run build` → `backend/public`);
3. `git push origin master`;
4. на сервере: `git pull --ff-only` + `scripts/deploy-remote.sh`;
5. `rsync`: новые `assets/` → пререндеренный HTML в `backend/spa/` → удаление старых `assets/`.

# Чего тут нет

- `npm` на сервере — фронт всегда собирается локально;
- правок файлов прямо на сервере — только через git.

# Чек-лист безопасности

- [ ] `APP_ENV=prod`, `APP_SECRET` свой, не из git.
- [ ] Боевые DB-креды только в `.env.local`.
- [ ] Код выше docroot (симлинк) — `.env.local`/`src` из веба недоступны.
- [ ] HTTPS включён.
