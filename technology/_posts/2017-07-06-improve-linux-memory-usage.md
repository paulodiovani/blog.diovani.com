---
layout: post
title: How to Improve Linux performance and memory usage?
image: /assets/media/2017/atemyram.jpg
image_credits: linuxatemyram.com
---

This article reunites some practices I've been using for a while to improve performance on [Arch Linux](https://archlinux.org) but will work for other distros too. Most of them related to (better) memory usage and caching.

So, here we go.

## HDD vs SSD

It's known that SSDs are much faster than HDDs. But they're also much more expensive, so the best option is to have a hybrid disk and mount specific partitions on each one.

### Mounting to SSD

My suggestion is to mount the core system to SSD while keeping `/home` and `/var`, which usually stores a large amount of data (media, databases, etc) on the HDD to use the larger available space.

This is my current `/etc/fstab` (UUIDs omitted):

```fstab
# /dev/sda2 (SSD)
UUID=00000000-0000-0000-0000-000000000000  /      ext4  rw,relatime,data=ordered  0 1

# /dev/sda1 (SSD)
UUID=0000-0000                             /boot  vfat  rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro  0 2

# /dev/sdb1 (HDD)
UUID=00000000-0000-0000-0000-000000000000  none   swap  defaults                  0 0

# /dev/sdb2 (HDD)
UUID=00000000-0000-0000-0000-000000000000  /var   ext4  rw,relatime,data=ordered  0 2

# /dev/sdb3 (HDD)
UUID=00000000-0000-0000-0000-000000000000  /home  ext4  rw,relatime,data=ordered  0 2
```

This simple setup will improve system startup a lot, as well as any application initialization while keeping large files on HDD. It will not, however, improve login time and _some applications_ inits due to configuration files (`~/.conf`, mostly) being on the slow drive.

### Caching to SSD

If you have a big SSD device (at least `64G`) you may use it as a cache device for a slower disk.

There are two common options for that [Bcache](https://bcache.evilpiepirate.org/) and [Flashcache](https://github.com/facebookarchive/flashcache). You should decide of which one to use as they are not compatible and will both significantly increase disk IO. But there are caveats.

**Bcache** is quite easy to setup, but both disks (the backing device -- HDD, and the caching device -- SSD) must be erased before use. So it's probably an option for new installations, only.

**Flashcache**, on the other hand, can work with already used disks, but has a much more complex installation and should only be tried by experienced users.

Personally, I didn't test any (yet), since memory management has been good enough. See bellow.

### Swapping to SSD

Swapping to SSD was pointed as a bad practice due to limited lifespan of SSDs in exchange of huge data writes necessary to swap. Modern SSDs, however, have random data writes that improves lifespan, so that may not be a problem anymore.

On the other hand, there are better options for Swap...

## Swap or not Swap?

In early 2000 Swap was necessary, since memory was expensive and most computers rarely reach 1G. But we still hadn't much data, mostly text and some images only, so it was _ok_ to send some of it to disk. Moreover, peoples didn't care too much about performance in that times.

Nowadays, most Linux installation instructions or _wizards_ still asks for a Swap Partition. But here is a thing: Swap is probably what makes your computer slower.

So the solution is to `swapoff` everything? Well, you can do that, but there are even better options...

### Decrease Swappiness

A simple improvement is to just ask the kernel to use less swap. This can be done by setting `vm.swappiness` to a lower value. The default is `60` (which is a lot). Any value between `10 ~ 40` will give you a better response, but if you have plenty of RAM, just set it to `1`.

To check the current swappiness value:

```bash
cat /proc/sys/vm/swappiness
```

To temporarily set the swappiness value:

```bash
sudo sysctl vm.swappiness=1
```

To set the swappiness value permanently, edit a sysctl configuration file:

```bash
# /etc/sysctl.d/99-sysctl.conf
vm.swappiness=1
```

### Set Swap Devices Priority

If you have more than one swap device or file, you can define different priorities using the `pri` parameter on `/etc/fastab` or via the `-p|--priority` option of `swapon`.

For example, to set a higher priority on a SSD device:

```bash
# /etc/fstab
/dev/sda1 none swap defaults,pri=100 0 0
/dev/sdb2 none swap defaults,pri=10  0 0
```

### Compress Memory with zram or zswap

[zram](https://www.kernel.org/doc/Documentation/blockdev/zram.txt) (formerly `compcache`) and [zswap](https://www.kernel.org/doc/Documentation/vm/zswap.txt) are both kernel modules used to compress memory prior to disk swap. They both use more CPU in exchange to store more information on the RAM.

While `zram` creates a block device in memory that can be used as a swap device, `zswap` compress memory pages when they are to be swapped out and store them in a memory pool inside system RAM itself.

You surely don't have to use both. I started to use `zswap` recently and it really reduces Swap usage allowing applications to have a faster access to available memory.

Instead of configuring it manually, you can just install the [systemd-swap](https://github.com/Nefelim4ag/systemd-swap) and configure it in `/etc/systemd/swap.conf`.

Install and enable the package.

```bash
pacman -Sy systemd-swap
sudo systemctl enable systemd-swap
sudo systemctl start systemd-swap
```

Set `zswap_enabled=1` or `zram_enabled=0` in `/etc/systemd/swap.conf` (don't use both).

If you already have one or more swap devices, set `swapd_auto_swapon=1` too. Otherwise, you may want to enable _Swap File Universal_ or _Swap File Chunked_ too, on the file.

Other configurations are _good enough_ with default values, but feel free to tune up if you want.

## Sync files to tmpfs

A good option to improve responsiveness is to sync most used directories to tmpfs. There are two daemons to automatically do that.

[Profile Sync Daemon](https://github.com/graysky2/profile-sync-daemon) and [Anything Sync Daemon](https://github.com/graysky2/anything-sync-daemon) both sync directories to a tmpfs using `rsync`.

The first sync browser profiles while the last can sync any directory you want.

### Profile Sync Daemon

```bash
pacaur -Sy profile-sync-daemon
psd   # run the first time to create ~/.config/psd/psd.conf
systemctl --user enable psd
systemctl --user start psd
```

You can edit `~/.config/psd/psd.conf` to enable sync only to a specific browser, or just use default settings to sync all installed ones.

### Anything Sync Daemon

Install the `anything-sync-daemon` package from AUR:

```bash
pacaur -Sy anything-sync-daemon
```

Then, configure `/etc/asd.conf` to define the directories you want to sync (Note: They must be directories, not files).

You may want to add `USE_OVERLAYFS="yes"` to reduce memory costs of sync operations.

```bash
sudo systemctl enable asd
sudo systemctl start asd
```

## Process priority

Prioritize some applications IO and CPU scheduling is a good way to have better performance on what really matters. This can be done per command with `nice` and `ionice` commands, but hopefully, there is a daemon to make this task easier.

[Ananicy](https://github.com/Nefelim4ag/Ananicy) defines a set of rules for several applications prioritization over nice levels. It even comes bundled with many community rules for common apps.

```bash
pacaur -Sy ananicy
sudo systemctl enable ananicy
sudo systemctl start ananicy
```

You may want to edit app rules under `/etc/ananicy.d/`, or just keep the defaults.

## Conclusion

Most these settings comes from [Arch Linux Wiki](https://wiki.archlinux.org) and it's strongly recommended to read the entire pages over _performance_ (see _references_ bellow) before trying anything.

From my experience, the best improvements comes from having plenty of memory and use it the best way possible (tmpfs, swappiness, zswap, etc.).

Please, tell us of what improvements you've made on the comments section bellow.

References:

- [Improving Performance on Arch Linux Wiki](https://wiki.archlinux.org/index.php/Improving_performance)
- [Bcache on Arch Linux Wiki](https://wiki.archlinux.org/index.php/Bcache)
- [Flashcache on Arch Linux Wiki](https://wiki.archlinux.org/index.php/flashcache)
- [Why No Swap Partitions on SSD Drives? question on Stack Overflow](https://askubuntu.com/questions/652337/why-no-swap-partitions-on-ssd-drives)
- [Optimizing Linux For Slow Computers on Akita On Rails Blog](https://www.akitaonrails.com/2017/01/17/optimizing-linux-for-slow-computers)
