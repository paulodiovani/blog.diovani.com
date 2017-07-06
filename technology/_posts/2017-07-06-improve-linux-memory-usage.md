---
layout: post
title: Improve your Linux memory usage
image: /media/2017/atemyram.jpg
image_credits: linuxatemyram.com/
---

This article reunites some practices I've been using for a while to improve performance on [Arch Linux](http://archlinux.org), but will work for other distros too. Most of them related to (better) memory usage and caching.

## Swap or not Swap?

In early 2000 Swap was necessary, since memory was expensive and most computers rarely reach 1G. But we still hadn't much data, mostly text and some image, so it was _ok_ to send some of it to disk. Moreover, peoples didn't care too much about performance in that times.

Nowadays, most linux installation instructions or _wizards_ still asks for a Swap Partition. But here is a thing: Swap is, probably, what makes your computer slower.

So the solution is to `swapoff` everything? Well, you can do that, but there are better options...

### Decrease Swappiness

A simple improvement is to just ask the kernel to use less swap. This can be done by setting `vm.swappiness` to a lower value. Default is `60` (which is a lot). Any value between `10 ~ 40` will give you a better response, but if you have plenty of ram, just set it to `1`.

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

### Set Swap Priority

If you have more than one swap device or file, you can define different priorities using the `pri` parameter on `/etc/fastab` or via the `-p|--priority` option of `swapon`.

For example, to set a higher priority on a SSD device:

```bash
# /etc/fstab
/dev/sda1 none swap defaults,pri=100 0 0
/dev/sdb2 none swap defaults,pri=10  0 0
```

### Compress Memory with zram or zswap

[zram](https://www.kernel.org/doc/Documentation/blockdev/zram.txt) (formely `compcache`) and [zswap](https://www.kernel.org/doc/Documentation/vm/zswap.txt) are both kernel modules used to compress memory prior to disk swap. They both uses more CPU in exchange to store more information on the RAM.

While `zram` creates a block device in memory, that can be used as a swap device, `zswap` compress memory pages when they are to be swapped out and store them in a memory pool inside system RAM.

You surely don't have to use both. I started to use `zswap` recently and it really reduce Swap usage allowing applications to have a faster access to available memory.

Instead of configuring it manually, you can just install the [systemd-swap](https://github.com/Nefelim4ag/systemd-swap) and configure it in `/etc/systemd/swap.conf`.

Install and enable the package.

```bash
pacman -Sy systemd-swap
sudo systemctl enable systemd-swap
```

Set `zswap_enabled=1` or `zram_enabled=0` in `/etc/systemd/swap.conf` (don't use both).

If you already have one or more swap devices, set `swapd_auto_swapon=1` too. Otherwise you may want to enable _Swap File Universal_ or _Swap File Chunked_ too, on the file.

Other configurations are _good enough_ with default values, bug feel free to tune up if you want.

References:

- https://wiki.archlinux.org/index.php/Swap#Swappiness
- https://wiki.archlinux.org/index.php/Improving_performance
- https://wiki.archlinux.org/index.php/Zswap
- http://www.akitaonrails.com/2017/01/17/optimizing-linux-for-slow-computers
