---
title: The benefits of Docker for web development
description: How you can use Docker to revolutionize your web application development projects.
keywords: benefits
shareimage: docker-benefits.png
date: 2020-10-31
tags:
  - concepts
  - docker compose
  - database
---

<aside>

This Docker tutorial has also been published on [Medium.com](https://medium.com/@craigbuckler/an-introduction-to-docker-for-web-developers-ca10f5b73775). It provides a quick overview of Docker concepts with an example which launches a MySQL database and Adminer client.

</aside>

Docker runs applications. *That's it*. But by *"application"*, I'm referring to big web dependency stuff&hellip;

* **web servers** such as Apache and NGINX
* **language runtimes** such as Node.js, PHP, Python, Ruby, Rust etc.
* **databases** such as MySQL, PostgreSQL, Oracle, MongoDB, redis, etc.
* **web applications** such as WordPress, Magento, forums, etc.
* and **anything else**: Elastic Search, message queues, emailers, etc.

It doesn't matter which Operating System you're using. If your web project has a dependency, it can be downloaded, configured, and launched on Windows, macOS, or Linux in minutes.

The following sections provide an overview of Docker features which directly benefit web developers.


## Isolation

Docker runs apps in an isolated environment known as a container. In essence, you can think of it as a lightweight virtual machine containing an OS and the installed/running application.

![multiple Docker containers]({{ '/images/figures/docker-multiple.webp' | url }})

Your host OS is not modified or configured in any way. It's easy to add, remove, or update a container as necessary.

This also allows you can run different versions of the same dependency -- *even at the same time*. For example, perhaps you require PHP5 for a legacy application but PHP7 for a new project.

## Access

A containerized application is still accessed from `localhost`. It normally exposes one or more TCP ports, such as `80` or `443` for a web server or `3306` for MySQL. A MySQL client can attach to `localhost:3306` in the same way as it would for a local installation.

Folders on your host PC can be mounted inside a container. You can edit code locally using your existing editor and tools, but have it update and run inside the container.

Finally, it's possible to connect to the container's shell using SSH to run administrative commands.


## Risk-free

Once you have a good set-up, developing with Docker is easier and safer than developing locally. It encourages risk-free experimentation:

* you can run older software without being forced to upgrade. PHP3, Python 2, MongoDB 1 -- *it doesn't matter*.
* trying a new application or upgrading to the latest version is no longer an issue -- *you can roll back if there are problems*.
* creating dangerous code, such as a deletion utility, won't accidentally wipe your critical OS files!


## Portability

Your Docker development environment is portable. It can be stored and reproduced elsewhere, e.g. uploaded to a Git repository and cloned by others on your team.

It doesn't matter what OS they use or whether a dependency is available on their platform. Your web app will work identically.

> Docker finally ends those "but it works on my PC" conversations!


## Robustness

During development, you will typically run your own web app code in a single container. Optionally, you can run any number of the same app containers on a live server *(Kubernetes and Docker Swarm are designed to do just that)*.

Your application will become faster and more robust. Any instance can fail and be restarted while others keep running. You could also update the application with no downtime.


## Docker quick start

If Docker is so practical, why do few developers use it?

The main reason: *it looks complex*. There are many features, numerous options, and it's not always clear how to get started.

Here's a quick-start summary to launch the latest version of [MySQL](https://www.mysql.com/) and [Adminer](https://www.adminer.org/), a PHP database client.

First, [install the latest stable edition of Docker]({{ '/tutorials/install-docker/' | url }}) on your OS.

Docker's command-line interface allows you to start individual containers. Docker Compose is an additional tool which can launch multiple containers in one step using a configuration file normally named `docker-compose.yml`.

Create a folder with a file named `docker-compose.yml` and add the following content (or [download it directly from Gitub](https://github.com/craigbuckler/docker-web/blob/master/mysql/docker-compose.yml)):

```yml
version: '3'

services:

  mysql:
    image: mysql
    container_name: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=mysecret
    volumes:
      - mysqldata:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - mysqlnet
    restart: on-failure

  adminer:
    image: adminer
    container_name: adminer
    depends_on:
      - mysql
    ports:
      - "8080:8080"
    networks:
      - mysqlnet
    restart: on-failure

volumes:
  mysqldata:

networks:
  mysqlnet:
```

<aside>

Spacing is important in YML files so be careful when copying!

</aside>


Open a terminal, `cd` to that folder, and enter:

```bash
docker-compose up
```

It will take several minutes to download the container images and initialize the database the first time you run this command. MySQL is ready when you see:

```bash
mysql | ... [Server] X Plugin ready for connections.
```

Open <localhost:8080> in your browser to launch Adminer. Enter the login credentials:

* Server: `mysql`
* Username: `root`
* Password: `mysecret`

You can then browse, create, edit, or drop databases, tables, indexes, users, and other items.

You could even create a web application which stores data in the MySQL database at <localhost:3306>.

To stop the containers, press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> in the terminal or enter:

```bash
docker-compose down
```

in another terminal window. Starting MySQL and Adminer again with `docker-compose up` is almost instantaneous.

It's incredible that you've installed, configured, and launched MySQL, PHP, and Adminer with a few minutes effort.


## Next steps

The [*"Docker for Web Developers"* book and video course]({{ '/' | url }}) will revolutionize your web development workflow.

> Docker is one of the most useful web development tools you're not using!

The course has one objective:
*to quickly demonstrate how you can use Docker in your web development projects.*

It starts with a concise explanation of Docker terminology and concepts before demonstrating typical projects such as local WordPress, Node.js, and Single-Page App (SPA) environments.

You can update source files, execute it instantly, and debug client and server code in Chrome DevTools and VS Code. The examples can be adapted to any technology stack, new projects, or existing apps.
