#!/bin/bash
set -e

echo "🚀 Starting DragIT deployment..."

# Create .env from environment variables if not exists
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Set required production env values
cat > .env << EOF
APP_NAME="${APP_NAME:-DragIT}"
APP_ENV=production
APP_KEY=${APP_KEY}
APP_DEBUG=false
APP_URL=${APP_URL:-http://localhost:8080}

APP_LOCALE=en
APP_FALLBACK_LOCALE=en

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

VITE_APP_NAME="${APP_NAME:-DragIT}"
EOF

echo "✅ .env configured"

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
    echo "✅ App key generated"
fi

# Clear & cache config
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo "✅ Config cached"

# Run migrations
echo "🔄 Running migrations..."
php artisan migrate --force
echo "✅ Migrations done"

# Start php-fpm in background
php-fpm -D
echo "✅ PHP-FPM started"

# Start nginx in foreground
echo "🌐 Starting Nginx on port 8080..."
nginx -g "daemon off;"
