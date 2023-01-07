FROM php:8.1.0RC1-apache

RUN /usr/local/bin/docker-php-ext-install mysqli
RUN a2enmod rewrite

copy apache2.conf /etc/apache2/
copy 000-default.conf /etc/apache2/sites-enabled/
copy . /var/www/html/webdb/
#  docker build -t webxiaxia/webdb:0.0.77 --platform=linux/amd64 -f Dockerfile .
#  docker push webxiaxia/webdb:0.0.77
#  docker run -d --restart=always -p 8984:80   webxiaxia/webdb:0.0.77