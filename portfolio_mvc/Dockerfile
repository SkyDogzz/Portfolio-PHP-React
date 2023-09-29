# Utilisez une image PHP officielle comme base
FROM php:8.0-apache

# Installez Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copie composer.json
COPY composer.json /var/www/html
RUN composer install

# Enable rewrite mody
RUN a2enmod rewrite
RUN service apache2 restart

# Démarrez Apache au sein du conteneur
CMD ["apache2-foreground"]