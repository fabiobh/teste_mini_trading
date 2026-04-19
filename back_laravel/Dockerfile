FROM php:8.3-fpm

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    libpng-dev

# Limpa cache do apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instala extensões PHP
RUN docker-php-ext-install pdo_sqlite bcmath zip gd

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www

# Copia os arquivos do projeto
COPY . .

# Ajusta permissões do script de entrypoint
RUN chmod +x docker/entrypoint.sh

# Porta do PHP-FPM
EXPOSE 9000

# Script de inicialização
ENTRYPOINT ["docker/entrypoint.sh"]
