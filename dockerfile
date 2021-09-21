FROM php:8.1.0RC1-apache

copy . /var/www/html/webdb/
copy apache2.conf /etc/apache2/

RUN /usr/local/bin/docker-php-ext-install mysqli

#  docker run -d --restart=always -p 8984:80 --privileged=true  webxiaxia/webdb:0.0.51