#!/bin/bash

# Instala dependências se a pasta vendor não existir
if [ ! -d "vendor" ]; then
    composer install --no-interaction --optimize-autoloader
fi

# Gera a chave se não existir
if ! grep -q "APP_KEY=base64" .env; then
    php artisan key:generate
fi

# Cria o arquivo do banco se não existir
if [ ! -f "database/database.sqlite" ]; then
    touch database/database.sqlite
fi

# Migrações
php artisan migrate --force

# Permissões
chown -R www-data:www-data storage bootstrap/cache

# Inicia o PHP-FPM
php-fpm
