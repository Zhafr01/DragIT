FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev

RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . /app

RUN composer install --no-dev --optimize-autoloader

CMD echo "DB_URL=${DB_URL:-${DATABASE_URL}}" >> .env && echo "DATABASE_URL=${DATABASE_URL:-${DB_URL}}" >> .env && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
