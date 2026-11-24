---
title: How to setup Docker locally for Beginners
date: 2026-11-18
description: Docker setup, written for Beginners
tags: [docker, container, containerization, DevOps]
highlight: World
medium: https://medium.com/@oxzak/how-to-setup-docker-locally-for-beginners-eff583f530f2
devto: 
---

![[docker-logo.jpg]]

Before starting on the setup guide, lets start with why we need docker in the first place? Ok, lets say we have building an amazing application and everything is working perfectly until you start deploying on production server or pushed the code to other fellow developers to check, test or add changes to the code and everything starts falling and you hear the well known sentence "It works on my machine, but it doesn't work in production." and here comes the docker power point to shine!.

Lets start by explaining what is container, a container is similar to virtual machine where it has its operating system and all, but what makes it similar but not the same as virtual machines is that containers don't simulate the entire computer rather than that it creates a sandbox environment that mimics/pretends to be a virtual machine, also usually runs smallest possible version of the software, the operating system is a stripped down version that can do one job only.

Docker as the company describes it "Docker is an open platform for developing, testing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.", in a simple way its a way to build and run those containers, save them into templates and many more. In the same time docker is a lightweight and fast which helps running more workloads on the same hardware that makes it cost-effective.

![[docker-architecture.webp]]

## Installation and Setup

Setting up docker by installing docker desktop application makes it a straightforward process for Windows, Mac and Linux. Lets assume that we have windows device and we want to install docker in it, we gonna follow those steps:
- Go to https://www.docker.com/products/docker-desktop/ and download docker desktop for windows (AMD64 or ARM64).
![[docker-application-downloader.png]]
- Also, most of the docker containers are built for Linux and windows does not natively include Linux kernal, which we need either WSL or Hyper-V. Docker has better compatibility and performance using WSL so lets install it using command-line method:
	- Right-click the **Start** button and select **Terminal (Admin)**, **PowerShell (Admin)**, or **Command Prompt (Admin)**.
	- Run the installation command: **wsl --install**.
	- **Restart your computer** to finish the installation.
	- After restarting, a console window will open automatically, prompting you to **create a Linux username and password**.
	- **Note:** Using the command automatically turns on the required optional features, downloads the latest WSL kernel, and installs Ubuntu as the default Linux distribution.

- Or more simple way enabling **WSL** is to go for windows gui style method:
	- Press the **Windows Key**, type `Turn Windows features on or off`, and press **Enter**.
	- In the list, check the boxes for:
		- **Windows Subsystem for Linux**.
		- **Virtual Machine Platform**.
	- Click **OK** and restart your computer when prompted.
	- After restarting your machine open the Microsoft Store and install your preferred Linux distribution (such as Ubuntu, Debian, or Kali Linux), and finish the configuration setup its simple and straightforward.
	![[mss-ubuntu.png]]

- Now, launch docker desktop application and follow the initial configuration instructions its also a simple and straightforward process.
	![[docker-installer.png]]

## Lets check our installation

After finishing your installation setup, open your command-line then run this command **docker version** and make sure it returns an output resembling the following screen (having deferent version or release depends on the time you reading this article):

![[docker-version.png]]

Now, click and open your docker desktop application, after making sure the setup went well you should get the following similar screen opening the application (also again, having deferent version or release may show deferent screen style depending on the time you reading this article):

![[docker-desktop-initial-ui.png]]

Docker is now installed and works on your machine successfully. It’s now the time to learn more on how to use it and learning best docker practices. Finally, thanks for your time to read my article, stay tune for the upcoming articles.
