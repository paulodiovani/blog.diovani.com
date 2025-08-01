---
layout: post
title: Improving your macOS to behave like a Linux Desktop (2025)
image: /assets/media/2025-08-01-linux-like-config-for-osx/penguin_tux_eating_an_apple_by_thekrzysiekart_d5v1yhx-1400x800.webp
---

In 2024, I wrote a blog post of [How to turn your macOS into a Linux-like Desktop] in [The Miners Blog].

A little more than one year later, my OSX interface and usability remains the same -- using a Tiling Window Manager and PC-like key bindings -- but with some tools replacement or improvements.

In this article, I'm present what have changed, using the original blog post as a reference.

## TLDR -- What changed?

Here is a short list if what changed, in case you prefer a short version and check the tools' documentation by yourself.

| Previously used                                | Replaced by                       |
| ---------------------------------------------- | --------------------------------- |
| Swapping modifier keys                         | [Karabiner Elements]              |
| `~/Library/KeyBindings/DefaultKeyBinding.dict` | [Karabiner Elements]              |
| SKHD key bindings                              | [Aerospace], [Karabiner Elements] |
| macOS Spaces                                   | [Aerospace]                       |
| Yabai                                          | [Aerospace]                       |
| Dropdown terminal                              | [WIP][AeroSpace DDTerm]           |

On the other hand, the following tools and configurations remain the same:

- Docker with [Colima]
- [Alacritty] middle click paste
- [Homebrew]
- [Scroll Reverser]

## New tools and configurations

Now, let's explore a little more the features of these tools.

### Karabiner Elements

[Karabiner Elements] is a powerful keyboard customizer for macOS. And although it has GUI, its settings are stored in a JSON file and can be saved to your `dotfiles`.

Karabiner monitors low-level input events and can make [lots of customizations][Karabiner Elements features], from replacing a key with another, or with a combination of keys, or even mouse events.

Another great addition, is that there are [predefined rules by the community][Karabiner community rules] that can be imported and used.

I use a [PC-Style Shortcuts][Karabiner PC-Style Shortcuts] configuration to be able to use `Ctrl+` key bindings for common tasks like saving, opening new tabs, etc. This is why I don't need to edit `~/Library/KeyBindings/DefaultKeyBinding.dict` anymore or use `skhd`.

## Sources and References

- [How to turn your macOS into a Linux-like Desktop]
- Image Credits: `thekrzysiekart`([deviantart.com/thekrzysiekart/art/Penguin-Tux-Eating-An-Apple-354490341])

[Aerospace DDTerm]: https://github.com/nikitabobko/AeroSpace/discussions/1556
[Aerospace]: https://github.com/nikitabobko/AeroSpace
[Alacritty]: https://alacritty.org/
[Colima]: https://github.com/abiosoft/colima
[Homebrew]: https://brew.sh/
[How to turn your macOS into a Linux-like Desktop]: https://blog.codeminer42.com/how-to-turn-your-macos-into-a-linux-like-desktop/
[Karabiner Elements]: https://karabiner-elements.pqrs.org/
[Scroll Reverser]: https://pilotmoon.com/scrollreverser/
[The Miners Blog]: https://blog.codeminer42.com
[deviantart.com/thekrzysiekart/art/Penguin-Tux-Eating-An-Apple-354490341]: https://www.deviantart.com/thekrzysiekart/art/Penguin-Tux-Eating-An-Apple-354490341
[Karabiner Elements features]: https://karabiner-elements.pqrs.org/docs/getting-started/features/
[Karabiner community rules]: https://ke-complex-modifications.pqrs.org/
[Karabiner PC-Style Shortcuts]: https://ke-complex-modifications.pqrs.org/?q=PC-Style%20Shortcuts
