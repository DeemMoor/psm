# Короткие команды, чтобы не печатать длинные docker compose ... вручную.
# Примеры:  make up   make sh   make composer c="require symfony/validator"

# Куда деплоим. DEPLOY_HOST — Host аккаунта BeGet из локального ~/.ssh/config.
DEPLOY_HOST ?= deemmoor
DEPLOY_DIR  ?= ~/psm-carbon.ru/app

.PHONY: init up down restart sh logs composer console lint front-build deploy

init:          ## Первый запуск: собрать образы, поставить зависимости, собрать фронт
	docker compose build
	docker compose run --rm --user dev php composer install
	$(MAKE) front-build
	docker compose up -d

up:            ## Поднять все контейнеры в фоне
	docker compose up -d

down:          ## Остановить и убрать контейнеры
	docker compose down

restart:       ## Перезапустить
	docker compose restart

sh:            ## Зайти внутрь php-контейнера (bash) под пользователем dev
	docker compose exec --user dev php bash

logs:          ## Смотреть логи всех контейнеров
	docker compose logs -f

composer:      ## Запустить composer внутри php:  make composer c="require orm"
	docker compose run --rm --user dev php composer $(c)

console:       ## Symfony-консоль:  make console c="about"
	docker compose run --rm --user dev php php bin/console $(c)

lint:          ## Линт и проверка типов фронта
	docker compose run --rm --no-deps node sh -c "npm run lint && npx tsc -b"

front-build:   ## Собрать React в backend/public (локально, в контейнере node)
	rm -rf backend/public/assets  # без старых хэшированных файлов, иначе rsync потащит их на прод
	docker compose run --rm --no-deps node sh -c "npm ci && npm run build"

deploy:        ## Деплой на BeGet: сборка фронта -> git push -> сервер (git pull, composer, миграции) -> rsync фронта
	@git diff --quiet && git diff --cached --quiet || { echo "!! есть незакоммиченные изменения — сначала коммит"; exit 1; }
	@[ "$$(git branch --show-current)" = master ] || { echo "!! деплоим только из master"; exit 1; }
	@echo ">> 1/4 сборка фронта"
	$(MAKE) front-build
	@echo ">> 2/4 git push"
	git push origin master
	@echo ">> 3/4 сервер: git pull, composer, миграции, кэш"
	ssh $(DEPLOY_HOST) 'cd $(DEPLOY_DIR) && git pull --ff-only origin master && bash scripts/deploy-remote.sh'
	@echo ">> 4/4 заливка собранного фронта"
	# Сначала новые ассеты, потом index.html (он ссылается на них), в конце — чистка старых ассетов.
	rsync -az backend/public/assets/ $(DEPLOY_HOST):$(DEPLOY_DIR)/backend/public/assets/
	@if [ -d frontend/public ]; then rsync -az frontend/public/ $(DEPLOY_HOST):$(DEPLOY_DIR)/backend/public/; fi
	rsync -az backend/public/index.html $(DEPLOY_HOST):$(DEPLOY_DIR)/backend/public/index.html
	rsync -az --delete backend/public/assets/ $(DEPLOY_HOST):$(DEPLOY_DIR)/backend/public/assets/
	@echo ">> деплой завершён"
