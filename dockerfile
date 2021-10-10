FROM php:8.1.0RC1-apache

copy . /var/www/html/webdb/
copy apache2.conf /etc/apache2/

RUN /usr/local/bin/docker-php-ext-install mysqli

#  docker build -t webxiaxia/webdb:0.0.60 --platform=linux/amd64 -f Dockerfile .
#  docker push webxiaxia/webdb:0.0.60
#  docker run -d --restart=always -p 8984:80   webxiaxia/webdb:0.0.60