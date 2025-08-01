---
layout: post
title: Improving your macOS to behave like a Linux Desktop (2025)
image: /assets/media/2025-08-01-linux-like-config-for-osx/penguin_tux_eating_an_apple_by_thekrzysiekart_d5v1yhx-1400x800.webp
---

In 2024, I wrote a blog post of [How to turn your macOS into a Linux-like Desktop] in [The Miners Blog].

A little more than one year later, my OSX interface and usability remains the same -- using a Tiling Window Manager and PC-like keyboard config -- but with some tools replacement or improvements.

In this article, I'm present what have changed, using the original blog post as a reference.

## TLDR -- What changed?

Here is a short list if what changed, in case you prefer a short version and check the tools documentation by yourself.

| Previously used                                | Replaced by                       |
| ---------------------------------------------- | --------------------------------- |
| Swapping modifier keys                         | [Karabiner Elements]              |
| `~/Library/KeyBindings/DefaultKeyBinding.dict` | [Karabiner Elements]              |
| SKHD keybindings                               | [Aerospace], [Karabiner Elements] |
| macOS Spaces                                   | [Aerospace]                       |
| Yabai                                          | [Aerospace]                       |
| Dropdown terminal                              | [WIP][AeroSpace DDTerm]           |

On the other hand, the following tools and configurations remain the same:

- Docker with [Colima]
- [Alacritty] middle click paste
- [Homebrew]
- [Scroll Reverser]

[Aerospace DDTerm]: https://github.com/nikitabobko/AeroSpace/discussions/1556
[Aerospace]: https://github.com/nikitabobko/AeroSpace
[Alacritty]: https://alacritty.org/
[Colima]: https://github.com/abiosoft/colima
[Homebrew]: https://brew.sh/
[How to turn your macOS into a Linux-like Desktop]: https://blog.codeminer42.com/how-to-turn-your-macos-into-a-linux-like-desktop/
[Karabiner Elements]: https://karabiner-elements.pqrs.org/
[Scroll Reverser]: https://pilotmoon.com/scrollreverser/
[The Miners Blog]: https://blog.codeminer42.com
