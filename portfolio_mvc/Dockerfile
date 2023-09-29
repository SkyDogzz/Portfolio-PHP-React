# Utilisez une image PHP officielle comme base
FROM php:8.0-apache

# Installez Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Démarrez Apache au sein du conteneur
CMD ["apache2-foreground"]