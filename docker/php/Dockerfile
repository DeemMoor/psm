FROM php:8.5-fpm

COPY --from=mlocati/php-extension-installer:latest /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_mysql intl mbstring opcache @composer

ARG UID=1000
ARG GID=1000
RUN groupadd -g ${GID} dev \
 && useradd -u ${UID} -g ${GID} -m dev \
 && sed -i 's/^user = www-data/user = dev/; s/^group = www-data/group = dev/' /usr/local/etc/php-fpm.d/www.conf

WORKDIR /app/backend
