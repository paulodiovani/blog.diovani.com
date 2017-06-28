---
layout: post
title: Moving Docker container data around
---

There are several methods to deal with data in [Docker](http://docker.com/) containers, since it's flexible enough to backup, move or share volumes. So, here's is a tip on how to move data around in a fast and secure way based on an experience I had.

I've recently restored a 15G MySQL backup to a container without noticing that my docker installation (`/var/lib/docker`) was on a small disk that ended filled it up to more than 80% of it's capacity. Since the database will probably increase even more in a few months, I had to move the data elsewhere.

The steps to achieve this are very basic:

1. Copy the container data directory (`/var/lib/mysql`, in this case) to the new path (lets say `./db/data`).
2. Remove the previous container and its volumes.
3. Create a new container mounting local data volume (`-v $(pwd)/db/data:/var/lib/mysql`).

## Using rsync to copy container data

This could be achieved using `cp` from inside a container or even `docker cp`, but I decided by [`rsync`](https://linux.die.net/man/1/rsync) for some reasons:

- It is incredibly fast
- It's more reliable to copy large files or directories and it allows _stop and resume_ if needed.
- It provides proper progress information (with `--info=progress2`)

First I will need an `rsync` container. There are some options on [Docker Hub](http://hub.docker.com) but I prefer to create my own, so here are the steps:

```bash
# Create an Alpine Linux based container
docker run -it --name rsync alpine sh

# Now, in the container, install rsync
apk add --no-cache rsync
exit

# At last, make it an image
docker commit rsync rsync:alpine
```

## Backing up MySQL

Now we can backup our mysql container data using the new `rsync` image.

```bash
docker run --volumes-from=some_mysql \
       -v $(pwd)/db/data:/backup \
       rsync:alpine \
       rsync -a --info=progress2 /var/lib/mysql/ /backup
```

After that, all the original data from `some_mysql` will have been copied to `./db/data`, being available to use as other containers volume.

To test the data, you can start a new container using this volume:

```bash
docker run --name other_mysql \
           -v $(pwd)/db/data:/var/lib/mysql \
           -p 3306:3306 \
           mysql
```

You can also safely remove the original container.

## Explaining the command

- `--volumes-from=some_mysql` -- This option mounts volumes from another container at the same path. _"some_mysql"_ is supposed to be the original data container.
- `-v $(pwd)/db/data:/backup` -- Mount the (new) local data directory as a `/backup` volume.
-  `rsync:alpine` -- The rsync image we've created before.
- `rsync -a --info=progress2 /var/lib/mysql/ /backup` -- Copy the data contents. The `-a` option means _archive mode_ which, in short, copies everything preserving ownership and permissions.

## Conclusions

But why all this trouble instead of just restoring a database dump?

Restoring MySQL dumps can take a long time. This is because it does really rebuild the entire tables and indices. Plus the socket/tcp IO, depending on the available CPU and memory.

Rsync, on the other hand, basically just does Disk IO, which is much faster than any database writes.

In my case, this 15G dump took more than 20 hours to restore and less than 10 minutes to copy with `rsync`.

Also, the official MySQL Docker image is built to allow (re)use of a previously settled data directory without expected problems (like wrong permissions), so it's safe enough to just move data from one container to other.

Here is a final advice, if your entire team uses Docker containers for databases, you can just share data directories (for example, using a tarball to backup, instead of rsync) among them.

References:

- [Manage data in containers in Docker documentation](https://docs.docker.com/engine/tutorials/dockervolumes/)
- [Answer to _Showing total progress in rsync: is it possible?_ in Server Fault](https://serverfault.com/a/441724/145527)
- [Answer to _How long should a 20GB restore take in MySQL?_) in Stack Overflow](https://stackoverflow.com/questions/4404590/how-long-should-a-20gb-restore-take-in-mysql-a-k-a-is-something-broken)
