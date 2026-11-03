# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# PsicoTest - CodeIgniter 4.7.6 sobre PHP 8.4 + Apache
# ---------------------------------------------------------------------------
ARG PHP_VERSION=8.4.27

# ---- Etapa 1: dependencias de Composer (sin dev) --------------------------
FROM composer:2 AS vendor

WORKDIR /app
COPY composer.json ./
RUN composer install \
        --no-dev \
        --no-interaction \
        --no-progress \
        --no-scripts \
        --no-autoloader \
        --prefer-dist \
        --ignore-platform-reqs

COPY app/ app/
COPY system/ system/
RUN composer dump-autoload --no-dev --optimize --classmap-authoritative --ignore-platform-reqs

# ---- Etapa 2: imagen final ------------------------------------------------
FROM php:${PHP_VERSION}-apache AS app

# Extensiones requeridas por composer.json: intl, mbstring (incluida), pgsql
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends libicu-dev libpq-dev; \
    docker-php-ext-install -j"$(nproc)" intl pgsql opcache; \
    rm -rf /var/lib/apt/lists/*

# Configuración de PHP para producción + endurecimiento
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY docker/php/zz-psicotest.ini "$PHP_INI_DIR/conf.d/zz-psicotest.ini"

# Apache: document root en public/, mod_rewrite y cabeceras de seguridad
RUN a2enmod rewrite headers
COPY docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY docker/apache/security.conf    /etc/apache2/conf-available/security.conf

WORKDIR /var/www/html

COPY --chown=www-data:www-data . .
COPY --chown=www-data:www-data --from=vendor /app/vendor ./vendor

# Solo writable/ necesita permisos de escritura
RUN set -eux; \
    chown -R root:root /var/www/html; \
    find /var/www/html -type d -exec chmod 755 {} +; \
    find /var/www/html -type f -exec chmod 644 {} +; \
    chmod 755 spark; \
    chown -R www-data:www-data writable; \
    chmod -R 775 writable

ENV CI_ENVIRONMENT=production

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD php -r 'exit(@file_get_contents("http://127.0.0.1/") === false ? 1 : 0);'
