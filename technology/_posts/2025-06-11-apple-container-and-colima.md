---
layout: post
title: About new Apple container and alternatives
image: ../../assets/media/2025-06-11-apple-container-and-colima/2025-06-11-14-52-20.png
image_credits: https://itoldya420.getarchive.net/amp/media/farm-apples-orchard-nature-landscapes-a34f35
---

This morning I saw several posts in social media talking about [Apple Container], released 2 days ago, a new tool from Apple to run Linux containers (e.g. Docker) in lightweight VMs, working as an alternative or replacement for Docker Desktop.

This new tool is really welcome and a great addition to development workflows, but what got my attention was some people claiming that they could _finally opt out of Docker Desktop_, while I have used containers on macOS for several years without ever needing it. 🤔

So, was Docker Desktop really necessary until now?

Well, the short answer is "no".

## Meet Colima -- Container runtimes on macOS

In 2024, I have written about [Colima] as part of my [How to turn your macOS into a Linux-like Desktop] blog post.

In summary, Colima supports many container engines, including Docker, with a simple CLI interface that allows to run containers in VMs seamlessly, from command line, without need for Docker Desktop, and with full support to Docker or Docker compose clients.

```bash
# install colima (with homebrew)
brew install colima

# install docker client and docker-compose
brew install docker
brew install docker-compose

# start the service
colima start

# use docker client or docker-compose as normal
docker run --rm hello-world
```

Colima has existed for years, is stable, easy to use, supports the docker CLI and Docker Compose, and even works with other engines (besides docker), if you need them.

If there is some reason people are stuck with Docker Desktop on macOS, it is simply because they don't know about it.

## What Apple Container brings to the party?

Having Colima as an alternative does not take away the merit of [Apple Container], so let's see what this new tool brings and where the differences lie.

### Isolation and lightweight VMs

Apple Container uses the [Containerization] Swift package for the [`Virtualization.framework`] which, among other things, provides lightweight virtual machines running with an optimized kernel for faster boot times. It also runs containers isolated, each in its own virtual machine, which increases both performance and security.

As comparison, Docker Desktop and Colima both also uses the `Virtualization.framework`, but on a single VM with holds the containers. -- This is more similar to standard Docker behavior on Linux, but might render issues on macOS due to the VM limitation, like exceeding available disk space or memory allocated and impacting every running container.

With these small differences, Apple Container promises to be faster and more stable than the alternatives.

### Swift API

Since [Containerization] is a Swift package, it makes it easier for applications to interact with Linux Containers or their underlying VMs in macOS.

This allows developers to take advantage of using containers without having to use the Docker HTTP API.

### Apple container usage

Thankfully, its usage is very familiar.

```bash
# start service
container system start

# run a (docker) image
container run --rm hello-world
```

## Conclusion: Which option to choose

As always, whatever suits your needs better, preferable with minimal setup efforts.

There are still some differences that may affect your choice, though.

- Colima allows [customizing the VM], which may be needed in some cases, and it is not yet supported (or documented) by Apple container.
- Colima supports Docker Compose by default by exporting the docker service ports, it also uses the standard Docker CLI, which will work with existing workflows or scripts without changes.
- Apple container is likely faster and provide better container isolation, which may be a good bet for larger or resource-expensive projects.
- Apple container or the Containerization package will likely [be supported by Colima][colima support] itself soon.

## References

- [Colima - container runtimes on macOS (and Linux) with minimal setup][Colima]
- [How to turn your macOS into a Linux-like Desktop]
- [Virtualization - Create virtual machines and run macOS and Linux-based operating systems][`Virtualization.framework`]
- [apple/container][Apple container]
- [apple/containerization][Containerization]

[Apple Container]: https://github.com/apple/container
[Colima]: https://github.com/abiosoft/colima
[How to turn your macOS into a Linux-like Desktop]: https://blog.codeminer42.com/how-to-turn-your-macos-into-a-linux-like-desktop/
[Containerization]: https://github.com/apple/containerization
[`Virtualization.framework`]: https://developer.apple.com/documentation/virtualization
[customizing the VM]: https://github.com/abiosoft/colima?tab=readme-ov-file#customizing-the-vm
[colima support]: https://github.com/abiosoft/colima/issues/1335
