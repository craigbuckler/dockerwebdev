---
title: Do you need Docker?
description: The first chapter of the "Docker for Web Developers" book introduces Docker concepts and benefits.
keywords: excerpt, sample, chapter, introduction, summary
shareimage: do-you-need-docker.png
date: 2020-10-28
tags:
  - excerpt
  - concepts
  - benefits
---

<aside>

This is the first chapter of the *"Docker for Web Developers"* book. It explains the benefits of using Docker for web development. The full course can be purchased from [DockerWebDev.com](https://dockerwebdev.com/).

</aside>

> Does our web development stack really need another technology?

Modern web development involves a deluge of files, systems, and components:

* HTML content and templates
* CSS stylesheets and preprocessors such as Sass
* client-side JavaScript including frameworks such as React, Vue.js, and Svelte
* build tools such as bundlers, minifiers, etc.
* web servers such as NGINX or Apache
* server-side runtimes and frameworks including Node.js, PHP, Python, Ruby, .NET etc.
* databases such as MySQL, MariaDB, SQL Server, or MongoDB
* other services for caching, message queues, email, process monitoring, etc.
* Git and Github for source control

Managing this stack can be a *challenge*.

> How many hours do you spend installing, configuring, updating, and managing software dependencies on your development PC?


## *"It works on my machine, buddy"*

Imagine your latest application has become successful. You've had to hire another developer to give you more time to rake in money. They turn up at work on day one, clone your repository, launch the code, and -- ***BANG*** -- it fails with an obscure error message.

Debugging may help, but your environments are not the same&hellip;

* you use a Mac, they use Windows
* you developed the app using Node.js v10, they have v14 installed
* you used MongoDB v3.6, they're on v4.2

The differences mount up.

You may be able to solve these issues within a few hours, but&hellip;

* Can you keep every dependency synchronized?
* Is that practical as the team and number of devices grow?
* Are those dependencies available on all development OSes and the production servers?

Some companies would implement a locked-down device policy, where you're prevented from using the latest or most appropriate tools. *(Please don't be that boss!)*


## Virtual machining

Rather than restricting devices and software, the application could be run within a Virtual Machine (VM). A VM allows an operating system to be installed in an emulated hardware environment; in essence, it's a PC running on your PC.

Cross-platform VM options include [VMware](https://www.vmware.com/) and [VirtualBox](https://www.virtualbox.org/). You could create a Linux (or other) VM with your application and all its dependencies. The VM is just data: it can be copied and run on any *real* Windows, macOS, or Linux device. Every developer -- and the live server -- could run the same environment.

Unfortunately, VMs quickly become impractical:

* VM disk images are large and difficult to clone
* an individual VM could be updated automatically or by a single developer so it's out of sync with others
* a VM requires considerable computing resources: *it's a full OS running on emulated hardware within another OS*.


## Docker delivers

[Docker](https://www.docker.com/) solves all these problems and more. Rather than installing dependencies on your PC, you run them in lightweight isolated VM-like environments known as *containers*.

In a single command, you can download, configure, and run whatever combination of services or platforms you require. Yes, a single command. *(Admittedly, it can be quite a complicated command, but that's where this book comes in!)*

Development benefits include:

* all developers can use the same Docker containers on macOS, Linux, and Windows
* installation, configuration, maintenance, and testing of applications becomes easier
* applications run in virtual environment isolated from your development PC
* multiple versions of the same application or runtime can be used on the same PC at the same time, e.g. PHP 5.6, 7.0, 7.4 etc.
* developers retain all the benefits of local development and can experiment without risk.

Similar Docker environments can also be deployed in production:

* continuous integration and delivery processes can be simplified for rapid deployment with zero downtime
* performance can be improved with horizontal scaling. It's possible to add more application containers to cope with increased traffic.
* services are more robust. If a container fails, it can be automatically restarted with zero downtime.
* applications can be secured. Containers can be configured to communicate only with each other and not the outside world. A MySQL database could be made available to a WordPress container without exposing itself to the host OS and beyond.


## Nah, I'm still not convinced

*Neither was I.*

When I first encountered Docker, it seemed like an unnecessary and somewhat daunting hurdle. I had plenty of experience running VMs and configuring software dependencies -- *surely I didn't need it?*

Docker documentation is comprehensive but it has a steep learning curve. Tutorials are often poor and:

1. presume the reader fully understands all the jargon,

1. fail to explain or over-explain esoteric points, and

1. rarely address how Docker can be used during development.

   When I started, I presumed Docker couldn't handle dynamic application restarts or debugging. Tutorials often claimed every code change required a slow and cumbersome application rebuild.

*I gave up.*

I was eventually shown the light by another developer *(thanks Glynne!)* That led to several months deep-diving into Docker and I realised what I'd been missing.

**Example:** I've created many WordPress-based websites.

I'd usually develop these directly on Windows or an Ubuntu VM, where it's necessary to install/update Apache, SSL, PHP, MySQL, and WordPress itself. All before commencing the real development work.

The equivalent Docker process takes minutes to initialize and can be cloned for every new project (see [WordPress development with Docker]({{ '/course/contents/' | url }})). Each installation exists in its own isolated environment which can be source-controlled and distributed to other developers.

That said, I've never deployed WordPress to a production server using Docker. WordPress hosting is ubiquitous and inexpensive; I'm happy to let someone else manage those dependencies. However, potential problems are minimized because I replicated the production server environment on my development PC.

It is considerably easier to build applications with Docker. Without wanting to sound like a salesperson, *Docker will revolutionize your development!*


## Isn't {insert-technology-here} where it's at?

Docker helps regardless of which web development approach and stack you're using. It provides a consistent environment at build time and/or closely matches the dependencies on your production server(s).

Your Docker environment:

1. works without an active/fast internet connection (useful when travelling, during demonstrations, etc.)
1. permits experimentation without risk. No one will mind if you accidentally wipe your local MySQL database.
1. is free from cost and usage restrictions.


### Monolithic web applications

Monolithic applications contain a mix of front-end and back-end code. Typically, the application uses a web server, server language runtime, data stores, and client-side HTML, CSS, JavaScript and frameworks to render pages and provide APIs. WordPress is a typical example.

Docker can be used to replicate that environment so all dependencies are available on your development PC.


### Serverless web applications

Serverless applications implement most functionality in the browser typically with a JavaScript framework to create a Single Page Application (SPA). The core site/application is downloaded once.

Additional data and services are provided by small APIs perhaps running as serverless functions. Despite the name, servers are still used -- but you don't need to worry about managing them. You create a function which is launched on demand from a JavaScript Ajax request, e.g. code that emails form data to a sales team.

Docker can be used in development environments to:

1. run build processes such as JavaScript module bundling and Sass preprocessing
1. serve the web application, and
1. emulate infrastructures for serverless function testing.


### Static sites

A static site is constructed using a build process which places content (markdown files, JSON data, database fields, etc.) into templates to create folders of static HTML, CSS, JavaScript, and media files. Those pre-rendered files can be deployed anywhere: no server-side runtime or database is required.

Static sites are often referred to as the *JAMstack* (JavaScript, APIs, and Markdown). All content is pre-rendered where possible, but dynamic services such as a site search can adopt server-based APIs.

Docker can be used to provide a reproducible build environment on any development PC.


## Key points

What you've learned in this chapter:

1. Docker can launch all your application's dependencies in individual containers.

   This includes servers, databases, language runtimes, etc. In most cases, these will require little or no configuration.

1. Docker is cross-platform.

   It runs on Windows, macOS, and Linux. Your application will work on any PC.

1. Docker can -- *and should* -- be used in your development environment.

   You can also use it in production systems if it's practical to do so.

The [next chapter]({{ '/tutorials/what-is-docker/' | url }}) describes Docker concepts in more detail.
