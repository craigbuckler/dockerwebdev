---
title: Docker course contents
description: A list of subjects covered in the "Docker for Web Developers" book and video course.
keywords: content, index, subjects, topics
date: 2020-10-22
eleventyNavigation:
  key: contents
  parent: course
  order: 2200
tags:
  - course
---

The course book and video follow the Docker topics shown below. The book also provides additional appendicies with reference information.

The content is updated as Docker and other technologies evolve. *All updates are **free** forever* so [**buy it now&hellip;**]({{ '/' | url }})

<ol start="0" class="courselist">
  <li>About this book
    <ol>
      <li>Preface</li>
      <li>Prerequisites</li>
      <li>Course website</li>
      <li>Book and/or videos?</li>
      <li>Example code</li>
      <li>Chat room</li>
      <li>Code conventions</li>
      <li>Further tips</li>
      <li>About me</li>
      <li>Copyright and distribution</li>
    </ol>
  </li>
  <li>Introduction
    <ol>
      <li>"It works on my machine, buddy"</li>
      <li>Virtual machining</li>
      <li>Docker delivers</li>
      <li>Nah, I'm still not convinced</li>
      <li>Isn't {insert-technology-here} where it's at?</li>
      <li>Key points</li>
    </ol>
  </li>
  <li>What is Docker?
    <ol>
      <li>Containers</li>
      <li>Images</li>
      <li>Volumes</li>
      <li>Networks</li>
      <li>Docker Compose</li>
      <li>Orchestration</li>
      <li>Docker client-server application</li>
      <li>Docker development strategies</li>
      <li>Simpler development and production</li>
      <li>When <em>not</em> to use Docker</li>
      <li>Docker alternatives</li>
      <li>Key points</li>
    </ol>
  </li>
  <li>How to install Docker
    <ol>
      <li>Install Docker on Linux</li>
      <li>Install Docker on macOS</li>
      <li>Install Docker on Windows</li>
      <li>Test your Docker installation</li>
      <li>Key points</li>
    </ol>
  </li>
  <li>Launch a MySQL database with Docker
    <ol>
      <li>Locate a suitable MySQL image on Docker Hub</li>
      <li>Launch a MySQL container</li>
      <li>Connect to the database using a MySQL client</li>
      <li>Connect to a container shell</li>
      <li>View, stop, and restart containers</li>
      <li>Define a Docker network</li>
      <li>Cleaning up</li>
      <li>Launch multiple containers with Docker Compose</li>
      <li>Key points</li>
    </ol>
  </li>
  <li>WordPress development with Docker
    <ol>
      <li>WordPress requirements</li>
      <li>Docker configuration plan</li>
      <li>Docker Compose configuration</li>
      <li>Launch your WordPress environment</li>
      <li>Install WordPress</li>
      <li>Local WordPress Development</li>
      <li>Key points</li>
    </ol>
  </li>
  <li>Application development with Docker
    <ol>
      <li>Container-based application development</li>
      <li>What is Node.js?</li>
      <li><em>Hello World</em> application overview</li>
      <li>Docker configuration plan</li>
      <li>Dockerfiles</li>
      <li>Build an image</li>
      <li>Launch a production container from your image</li>
      <li>Launch a development environment with Docker Compose</li>
      <li>Live code editing</li>
      <li>Remote container debugging</li>
      <li>Create an image from a container</li>
      <li>Key points</li>
    </ol>
  </li>
  <li>Push your Docker image to a Repository
    <ol>
      <li>Why push an image to Docker Hub?</li>
      <li>Docker Hub alternatives</li>
      <li>Image names and tags</li>
      <li>Create a Docker Hub repository</li>
      <li>Log in locally</li>
      <li>Build an application image</li>
      <li>Tag an image</li>
      <li>Push to Docker Hub</li>
      <li>Distribute your image</li>
      <li>Key points</li>
    </ol>
  </li>
  <li>Docker orchestration on production servers
    <ol>
      <li>Dependency planning</li>
      <li>Application scaling</li>
      <li>Orchestration overview</li>
      <li>Docker Swarm</li>
      <li>Kubernetes</li>
    <li>Key points</li>
    </ol>
  </li>
  <li>Your Docker journey
    <ol>
      <li>Docker's future</li>
      <li>Further Docker help</li>
    </ol>
  </li>
  <li>Appendix A: Docker command-line reference
    <ol>
      <li>Log into Docker Hub</li>
      <li>Search Docker Hub</li>
      <li>Pull a Docker Hub image</li>
      <li>List Docker images</li>
      <li>Build an image from a Dockerfile</li>
      <li>Tag an image</li>
      <li>Push tagged images to Docker Hub</li>
      <li>Launch a container from an image</li>
      <li>List containers</li>
      <li>Run a command in a container</li>
      <li>Attach to a container shell</li>
      <li>Restart a container</li>
      <li>Pause a container</li>
      <li>Unpause (resume) a container</li>
      <li>View container metrics</li>
      <li>Increase container resources</li>
      <li>Stop a container</li>
      <li>Remove stopped containers</li>
      <li>View Docker volumes</li>
      <li>Delete a volume</li>
      <li>Bind mount a host directory</li>
      <li>Define a Docker network</li>
      <li>View networks</li>
      <li>Delete a network</li>
      <li>View system disk usage</li>
      <li>Full clean start</li>
    </ol>
  </li>
  <li>Appendix B: Dockerfile reference
    <ol>
      <li><code>#</code> comment</li>
      <li><code>ARG</code> arguments</li>
      <li><code>ENV</code> environment variables</li>
      <li><code>FROM &lt;image&gt;</code> starting image</li>
      <li><code>WORKDIR</code> working directory</li>
      <li><code>COPY</code> files from the host to image</li>
      <li><code>ADD</code> files</li>
      <li>Mount a <code>VOLUME</code></li>
      <li>Set a <code>USER</code></li>
      <li><code>RUN</code> a command</li>
      <li><code>EXPOSE</code> a port</li>
      <li><code>CMD</code> execute container</li>
      <li><code>ENTRYPOINT</code> execute container</li>
      <li><code>.dockerignore</code> file patterns</li>
    </ol>
  </li>
  <li>Appendix C: Docker Compose reference
    <ol>
      <li>Docker Compose CLI</li>
      <li><code>docker-compose.yml</code> outline</li>
      <li>Starting <code>image</code></li>
      <li><code>build</code> an image from a <code>Dockerfile</code></li>
      <li>Set the <code>container_name</code></li>
      <li>Container <code>depends_on</code> another</li>
      <li>Set <code>environment</code> variables</li>
      <li>Set environment variables from a <code>env_file</code></li>
      <li>Attach to Docker <code>networks</code></li>
      <li>Attach persistent Docker <code>volumes</code></li>
      <li>Set a custom <code>dns</code> server</li>
      <li><code>expose</code> ports</li>
      <li>Define <code>external_links</code> to other containers</li>
      <li>Override the default <code>command</code></li>
      <li>Override the default <code>entrypoint</code></li>
      <li>Specify a <code>restart</code> policy</li>
      <li>Run a <code>healthcheck</code></li>
      <li>Define a logging service</li>
    </ol>
  </li>
  <li>Appendix D: quiz project
    <ol>
      <li>Project overview</li>
      <li>Launch in development mode</li>
      <li>Launch in production mode</li>
      <li>Clean up</li>
      <li>Project file structure</li>
      <li><code>nodejs</code> Docker image</li>
      <li><code>nginx</code> Docker image</li>
      <li><code>mongodb</code> Docker image</li>
      <li>Node.js build process</li>
      <li>Node.js Express.js application</li>
      <li>Client-side files</li>
      <li>Key points</li>
    </ol>
  </li>
</ol>
