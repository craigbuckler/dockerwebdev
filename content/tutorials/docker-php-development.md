---
title: Setup an Apache, PHP, and HTTPS development environment with Docker
description: Quickly create a robust PHP project development environment on your local machine with Apache and locally-trusted HTTPS certificates.
keywords: apache, php, ssl, https, server
shareimage: docker-apache-php-https.png
date: 2021-03-12
tags:
  - apache
  - php
  - ssl
---

<aside>

This Docker tutorial explains how to run a PHP application using Apache and *real* SSL certificates on any Windows, mac OS, or Linux development PC.

</aside>

PHP may not be the trendiest technology but it's used by many developers and projects. According to [W3Techs](https://w3techs.com/), [PHP is used on 78% of all websites](https://w3techs.com/technologies/overview/programming_language). That may be an underestimate since sites may not -- and ideally *shouldn't* -- announce their stack. A more reliable statistic is that [WordPress powers 43% of the web](https://w3techs.com/technologies/details/cm-wordpress) and the <abbr title="Content Management System">CMS</abbr> uses PHP.

I rarely embark on new PHP projects but have many legacy sites and apps with folders full of `.php` files. Installing PHP can be time-consuming and error prone. There are various versions and you'll encounter further complexities when integrating PHP with a web server such as Apache to match a real hosting solutions.

Additionally, Windows users are offered a [confusing array of options](https://windows.php.net/download/) although the situation is about to become easier -- *Microsoft is dropping PHP support in Windows*:

> "We are not going to be supporting PHP for Windows in any capacity for version 8.0 and beyond."
> <cite>[Dale Hirt, Microsoft](https://news-web.php.net/php.internals/110907)</cite>

Someone is likely to compile Windows editions and the [Windows Subsystem for Linux]({{ '/tutorials/install-docker/' | url }}) provides another option. However, the point remains that maintaining one or more PHP development environments can be difficult&hellip;

&hellip;*unless you use Docker*.


## Why use Docker?

Docker is a tool that can install, configure, and manage software. It places a wrapper around executables known as a *container*. Containers are launched from pre-configured *images* which are a snapshot of an executable and its libraries.

> My ["Docker for Web Developers"]({{ '/' | url }}) book and video course concisely explains how to adopt Docker for your new and existing projects.

Docker provides pre-built [Apache and PHP images](https://hub.docker.com/_/php) which can be downloaded and run on any OS where Docker is installed (see the [Docker installation instructions]({{ '/tutorials/install-docker/' | url }})).

The following sections describe how to prepare a Docker development environment which can execute PHP files located on your host PC.


## Create SSL certificates

Web apps use HTTPS to ensure communication between the client and the server is encrypted and cannot be intercepted. Google also penalizes content sites which remain on HTTP.

For local development, developers either:

1. **Use HTTP**
  This means the local and production versions are different. It can be more difficult to spot problems such as linking to insecure assets.

1. **Or use a (fake) self-signed certificate**
  This is closer to the production version but the browser still treats requests differently. For example, fake SSL assets are not cached.

A third lesser-known option is [mkcert](https://github.com/FiloSottile/mkcert). This creates a new locally-trusted authority and SSL certificates. As far as the browser is concerned, the HTTPS connection is fully secure despite running on a local domain.

Configuring certificates need only be done once and creating them on your local machine will also work in Docker containers or WSL2. Follow the [mkcert installation instructions](https://github.com/FiloSottile/mkcert#installation) then install a new local certificate authority in your browsers:

```bash
mkcert -install
```

Firefox requires some additional configuration:

1. Locate the generated `rootCA.pem` file by entering `mkcert -CAROOT` in your terminal.
1. Open Firefox's menu and choose **Options**, then **Privacy & Security**. Scroll to the bottom and click **View Certificates**. Select the **Authorities tab**, click **Import...**, open the `rootCA.pem` file, and restart the browser.

Now create locally-trusted development certificates for your development domain:

```bash
mkcert localhost 127.0.0.1 ::1
```

It's easier to use `localhost`, but you can create any domain name as long as it is referenced in your [`hosts` file](https://en.wikipedia.org/wiki/Hosts_(file)).

Rename the generated files:

* `cert.pem` for the SSL certificate, and
* `cert-key.pem` for the SSL certificate key file

Create a directory somewhere on your system, e.g. `dockerphp`, and copy the two `.pem` files into it.


## Apache configuration

Create a file named `000-default.conf` in the same directory with the following Apache HTTP and HTTPS configuration. This sets the web to root `/var/www/html` and references the SSL certificates you created with mkcert:

```apacheconf
<VirtualHost *:80>

  ServerAdmin admin@localhost
  DocumentRoot /var/www/html
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

<VirtualHost *:443>

  SSLEngine on
  SSLCertificateFile /etc/apache2/ssl/cert.pem
  SSLCertificateKeyFile /etc/apache2/ssl/cert-key.pem

  ServerAdmin admin@localhost
  DocumentRoot /var/www/html
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```


## Docker configuration

Create a file named `Dockerfile` in your directory and add the following content to build a PHP and Apache image. You can choose from dozens of [starting images at Docker Hub](https://github.com/docker-library/docs/blob/master/php/README.md#supported-tags-and-respective-dockerfile-links) but this example uses `php:8-apache` which has the latest version of PHP 8 on Apache 2.4:

```yml
FROM php:8-apache

RUN a2enmod ssl && a2enmod rewrite
RUN mkdir -p /etc/apache2/ssl
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

COPY ./ssl/*.pem /etc/apache2/ssl/
COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80
EXPOSE 443
```

The `Dockerfile`:

1. Enables Apache's SSL and rewrite modules. Further modules can be enabled if necessary.
1. Copies the PHP development configuration file to `php.ini` so errors and warnings are shown.
1. Creates an `/etc/apache2/ssl` directory and copies the SSL `.pem` certificate files [created above](#ssl-certificates).
1. Copies the [Apache configuration file](#apache-configuration).
1. Exposes ports 80 and 443 for HTTP and HTTPS accordingly.

If necessary, you can define a your own `php.ini` file and `COPY` it into the image at `/usr/local/etc/php/php.ini`.

<aside>

**Note**: the separate `Dockerfile` `RUN` commands can be merged on to one line and separated with `&&`. This makes the Docker build process faster and more efficient although the code is more difficult to read.

</aside>


## Build the PHP Docker image

Build a Docker image named `php8` from your `Dockerfile` by navigating to the directory in a terminal and entering:

```bash
docker image build -t php8 .
```

*(The last `.` period is important!)*

Assuming you don't have errors, a new Docker image will be built. Run `docker image ls` to see `php8` in the list of images.


## Launch a PHP container

You can now start a Docker container from the `php8` image. Navigate to any directory containing a PHP project and run the following `docker` command:

```bash
docker run \
  -it --rm \
  -p 8080:80 -p 443:443 \
  --name php8site \
  -v "$PWD":/var/www/html \
  php8
```

<aside>

Windows Powershell users must remove the line-breaks and `\` backslashes from the command. Additionally, `$PWD` references the current directory on Linux and macOS. This cannot be used on Windows so the full path must be specified in Linux notation, e.g.

```bash
-v /c/projects/mysite:/var/www/html
```

</aside>

The container will continue to run until it is stopped with <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd>.

Alternately, you may find it easier to launch the container with Docker Compose. Create a new `docker-compose.yml` file in the PHP project directory with the following content:

```yml
version: '3'
services:

  php8site:
    image: php8
    container_name: php8site
    volumes:
      - ./:/var/www/html
    ports:
      - "8080:80"
      - "443:443"
```

The Apache/PHP container can then be launched from that directory with:

```bash
docker-compose up
```

and stopped in another terminal with:

```bash
docker-compose down
```


## Run PHP code

The host directory where the Docker container is launched is bind-mounted into the container at the Apache `/var/www/html` root. The standard port `443` is available for HTTPS connections and port `8080` forwards to HTTP port `80` to avoid conflicts with applications such as Skype.

You can test PHP execution with an example `index.php` file:

```php
<?php
phpinfo();
```

Launch it in your browser at `http://localhost:8080/` or `https://localhost/`. The HTTPS version will use the [mkcert SSL](#ssl-certificates) but, unlike self-signed certificates, the browser will not throw a security alert.


## Dynamic Docker development

A little knowledge of Docker is all that's required to create a secure Apache and PHP development environment. The benefits:

* you did not need to manually download, install, or configure additional software
* your OS has not changed -- the container cannot conflict with other versions of Apache or PHP you have installed
* the container will work identically on any other OS without modification.

Finally...

> You're not limited to PHP and Apache! Docker can manage whatever server, language runtimes, databases, or other software dependencies your project needs.
