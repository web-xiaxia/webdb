FROM php:8.1.0RC1-apache

RUN /usr/local/bin/docker-php-ext-install mysqli

copy apache2.conf /etc/apache2/
copy . /var/www/html/webdb/
#  docker build -t webxiaxia/webdb:0.0.75 --platform=linux/amd64 -f Dockerfile .
#  docker push webxiaxia/webdb:0.0.75
#  docker run -d --restart=always -p 8984:80   webxiaxia/webdb:0.0.75