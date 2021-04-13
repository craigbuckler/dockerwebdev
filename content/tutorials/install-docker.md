---
title: How to install Docker on Windows, mac OS, and Linux
description: The third chapter of the "Docker for Web Developers" book provides Docker installation instructions for Windows, mac OS, and Linux.
keywords: excerpt, sample, chapter, install, load
shareimage: install-docker.png
date: 2020-10-30
tags:
  - excerpt
  - install
---

<aside>

This is the third chapter of the *"Docker for Web Developers"* book. It explains how to install Docker on all popular operating systems. The full course can be purchased from [DockerWebDev.com](https://dockerwebdev.com/).

</aside>

Docker can be installed on [Linux](#install-docker-on-linux), [mac OS](#install-docker-on-macos), or [Windows 10](#install-docker-on-windows).

Requirements and installation instructions can be found on the [Docker Docs](https://docs.docker.com/engine/install/) help pages.

![Docker Docs installation]({{ '/images/figures/dockerdocs-install.webp' | url }})


## Install Docker on Linux

Docker is often available in official Linux repositories, although these usually offer older editions. The latest edition is supported on recent 64-bit editions of popular Linux distros:

* [Ubuntu (and derivatives such as Mint)](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
* [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
* [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)

[Static binaries](https://docs.docker.com/install/linux/docker-ce/binaries/) are available for other distros, although Googling *"install Docker on [your OS]"* may provide easier instructions, e.g. *"install Docker on a Raspberry Pi"*.

Follow the Docker documentation for your distro. For example, [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/) is installed with the following commands:

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io
```

<aside>

[Convenience scripts are also available](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script) to run these commands for you, but the Docker documentation warns they are a security risk and should not be used in production environments:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

</aside>

To run Docker commands as a non-root user (without `sudo`), create and add yourself to a `docker` group:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Then reboot to apply all changes.


### Install Docker Compose on Linux

Docker Compose is [installed separately](https://docs.docker.com/compose/install/) using the command:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/<VERSION>/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

where `<VERSION>` is the [latest release number](https://github.com/docker/compose/releases), e.g. `1.27.4`.


## Install Docker on macOS

[Docker Desktop for macOS Sierra 10.13 and above](https://docs.docker.com/docker-for-mac/install/) can be downloaded from Docker Hub. The package includes the Docker server, CLI, Docker Compose, Docker Swarm, and Kubernetes.

![Docker Desktop for macOS]({{ '/images/figures/dockerdocs-macos.webp' | url }})

Two editions are available: **stable** and **edge** with experimental features. The **stable** version is best for most developers.

Double-click `Docker.dmg` to open the installer, then drag the Docker icon to the **Applications** folder. Double-click **Docker.app** in that folder to launch Docker.

After completion, the whale icon in the status bar indicates Docker is running and commands can be entered in the terminal.

![Docker icon on macOS status bar]({{ '/images/figures/docker-macos.webp' | url }})


## Install Docker on Windows

Docker Desktop for Windows requires either [WSL2](#windows-subsystem-for-linux-(wsl)-2) or [Hyper-V](#hyper-v).


### Windows Subsystem for Linux (WSL) 2

WSL allows you to run full Linux environments directly on Windows 10.

> IMPORTANT!
> You can **not** install the Linux edition of Docker within a WSL-powered Linux distro. You must [install Docker Desktop for Windows](#install-docker-desktop-for-windows) which allows Docker commands to be run in all Windows and Linux terminals.

[WSL2](https://docs.microsoft.com/windows/wsl/wsl2-index) is the [recommended default option](https://docs.docker.com/docker-for-windows/wsl/) for Docker on Windows. It is faster than [Hyper-V](#hyper-v) and available in all editions of Windows from the May 2020 update (version 2004, OS build 19041).

<aside>

Windows 10 S is not supported but you can normally upgrade to Home in the Settings.

You may be able to trigger the 2004 update: click **Check for updates** in the **Update & Security** panel of **Settings**. If your PC reports that 2004 is not yet available, you must either wait until Microsoft releases a fix for your device or use [Hyper-V](#hyper-v) and switch to WSL2 later.

</aside>

To install WSL2:

1. Enable hardware virtualization support in your BIOS.

   This will be active on most devices, but check by rebooting and accessing your PC's BIOS panels -- typically by hitting <kbd>DEL</kbd>, <kbd>F2</kbd>, or <kbd>F10</kbd> as your system starts. Look for **Virtualization Technology**, **VTx** or similar options. Ensure they are enabled, save, and reboot.

   **WARNING! Be careful when changing BIOS settings -- one wrong move could trash your PC.**

1. Enable the **Virtual Machine Platform** and **Windows Subsystem for Linux** options in the **Turn Windows features on or off** panel:

   ![Enable WSL in Windows]({{ '/images/figures/windows-wsl.webp' | url }})

   This can be accessed by hitting the Start button and typing the panel name or from **Programs and Features** in the classic Control Panel.

1. Reboot, then enter the following command in a Windows Powershell or `cmd` prompt to set WSL2 as the default:

   ```bash
   wsl --set-default-version 2
   ```

1. Download and install your preferred distro by searching for "Linux" in the **Microsoft Store** app. **Ubuntu** is a good choice.

   ![Windows Store]({{ '/images/figures/windows-store.webp' | url }})

1. To complete the installation, launch your distro by clicking its Store's **Launch** button or choosing its icon from the Start menu.

   You *may* be prompted to install a kernel update -- follow the instructions and launch the distro again.

1. Enter a Linux username and password. These are separate from your Windows credentials although choosing the same ones can be practical.

1. Ensure your distro is up-to-date. For example, on an Ubuntu bash prompt enter:

   ```bash
   sudo apt update && sudo apt upgrade
   ```

You can now [install Docker Desktop (see below)](#install-docker-desktop-for-windows). For the best performance and stability, store development files in your Linux file system and run Docker from your Linux terminal.

More information about installing and using WSL2:

* [Windows Subsystem for Linux 2: The Complete Guide](https://www.sitepoint.com/wsl2/), and
* optionally, [Windows Terminal: The Complete Guide](https://www.sitepoint.com/windows-terminal/).


### Hyper-V

The Microsoft [Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/) hypervisor is provided free with Windows 10 Professional and Enterprise. *(Windows Home users must use [WSL2](#windows-subsystem-for-linux-(wsl)-2).)*

To install Hyper-V:

1. Enable hardware virtualization support in your BIOS.

   This will be active on most devices, but check by rebooting and accessing your PC's BIOS panels -- typically by hitting <kbd>DEL</kbd>, <kbd>F2</kbd>, or <kbd>F10</kbd> as your system starts. Look for **Virtualization Technology**, **VTx** or similar options. Ensure they are enabled, save, and reboot.

   **WARNING! Be careful when changing BIOS settings -- one wrong move could trash your PC.**

1. Enable the **Hyper-V** option in the **Turn Windows features on or off** panel then reboot.

   ![Enable Hyper-V in Windows]({{ '/images/figures/windows-hyperv.webp' | url }})

   This can be accessed by hitting the Start button and typing the panel name or from **Programs and Features** in the classic Control Panel.

You can now install Docker Desktop.


### Install Docker Desktop for Windows

[Docker Desktop for Windows 10](https://docs.docker.com/docker-for-windows/install/) can be downloaded from Docker Hub. The installer includes the Docker server, CLI, Docker Compose, Docker Swarm, and Kubernetes.

Two editions are available: **stable** and **edge** with experimental features. The **stable** version is best for most developers.

Double-click `Docker Desktop Installer.exe` to start the installation process. After completion and launch, the whale icon in the notification area of the task bar indicates Docker is running and ready to accept commands in the Windows Powershell/`cmd` terminal (and Linux if using [WSL2](#windows-subsystem-for-linux-(wsl)-2)).

![Docker icon on Windows task bar]({{ '/images/figures/docker-windows.webp' | url }})


### Docker Engine Settings

Docker uses WSL2 as the default engine when available. You will be prompted to confirm this choice during installation and after WSL2 is installed.

Alternatively, WSL2 can be enabled by checking **Use the WSL 2 based engine** in the **General** tab of **Settings** accessed from the Docker task bar icon. Unchecking the option reverts to Hyper-V.

![Docker Windows engine]({{ '/images/figures/docker-windows-engine.webp' | url }})

**When using WSL2**, at least one Linux distro must be enabled -- the default is chosen. You can also permit Docker commands in other distros by accessing the **WSL integration** panel in the **Resources** section of the Docker **Settings**:

![Docker Windows WSL2 selection]({{ '/images/figures/docker-windows-wsl.webp' | url }})

**When using Hyper-V**, Docker must be granted access to the Windows file system. Select the drives it is permitted to use by accessing the **File Sharing** panel in the **Resources** section of the Docker **Settings**:

![Docker file sharing in Windows]({{ '/images/figures/docker-windows-files.webp' | url }})

*(This option was named **Shared Drives** in previous editions of Docker Desktop.)*


## Test your Docker installation

Check Docker has successfully installed by entering the following command in your terminal:


```bash
docker version
```

A response similar to the following is displayed:

```bash
Client: Docker Engine - Community
 Version:           19.03.12
 API version:       1.40
 Go version:        go1.13.10
 Git commit:        abcdef0
 Built:             Mon Jun 22 15:45:36 2020
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.12
  API version:      1.40 (minimum version 1.12)
  ...etc...
```

Ensure Docker Compose is working by entering:

```bash
docker-compose version
```

To receive something like:

```bash
docker-compose version 1.27.2, build 8d51620a
docker-py version: 4.3.1
CPython version: 3.7.7
OpenSSL version: OpenSSL 1.1.1c  10 Sep 2019
```

Optionally, try entering:

```bash
docker run hello-world
```

to verify Docker can pull an image from Docker Hub and start containers as expected...

```bash
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete
Digest: sha256:f9dfddf63636d84ef479d645ab5885156ae030f611a56f3a7ac
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows your installation appears to be working correctly.
```


## Key points

What you've learned in this chapter:

1. How to install and configure Docker on your Linux, macOS, or Windows system.
1. How to install Docker Compose.
1. How to test the Docker installation.

The following chapters demonstrate how to use Docker during development&hellip;

*&hellip;but to continue reading, you need to [buy the book]({{ '/' | url }}).*
