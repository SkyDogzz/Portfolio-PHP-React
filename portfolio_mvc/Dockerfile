# Utilisez une image PHP officielle comme base
FROM php:8.3-rc-apache
# Installez Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Activez les modules Apache nécessaires (vous pouvez personnaliser cela en fonction de vos besoins)
RUN a2enmod rewrite
RUN service apache2 restart

# Définissez le répertoire de travail dans le conteneur
WORKDIR /var/www/html

# Copiez le reste de votre application backend dans le répertoire de travail
COPY . .

# Exposez le port 80 pour Apache
EXPOSE 80

# Commande de démarrage Apache
CMD ["apache2-foreground"]
