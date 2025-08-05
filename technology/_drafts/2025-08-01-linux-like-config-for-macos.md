---
layout: post
title: Improving your macOS to behave like a Linux Desktop (2025)
image: /assets/media/2025-08-01-linux-like-config-for-macos/penguin_tux_eating_an_apple_by_thekrzysiekart_d5v1yhx-1400x800.webp
---

In 2024, I wrote a blog post of [How to turn your macOS into a Linux-like Desktop] in [The Miners Blog].

A little more than one year later, my macOS interface and usability remains the same -- using a Tiling Window Manager and PC-like key bindings -- but with some tools replacement or improvements.

In this article, I'm present what have changed, using the original blog post as a reference.

## TLDR -- What changed?

Here is a short list if what changed, in case you prefer a short version and check the tools' documentation by yourself.

| Previously used                                | Replaced by                       |
| ---------------------------------------------- | --------------------------------- |
| Swapping modifier keys                         | [Karabiner Elements]              |
| `~/Library/KeyBindings/DefaultKeyBinding.dict` | [Karabiner Elements]              |
| SKHD key bindings                              | [Aerospace], [Karabiner Elements] |
| Yabai / macOS Spaces                           | [Aerospace]                       |
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

#### How to install Karabiner Elements

To install Karabiner Elements, download its `*.pkg` file from the website, or use Homebrew:

```bash
brew install --cask karabiner-elements
```

Then follow the remaining instructions on the [Karabiner Elements installation guide].

Its configuration file is located at `~/.config/karabiner/karabiner.json`. It is not a user-friendly file, and it is much easier to configure using the GUI, but you can backup the configuration on your dotfiles.

If you want to import community rules, just find them in the [Karabiner community rules] page and click the `Import` button.

### Aerospace

[Aerospace] is a [Tiling Window Manager] for macOS, inspired by [i3] and, although still in _beta_, it is stable enough to be used daily. Its key features are:

- Employs its own emulation of [virtual workspaces], which doesn't have the downsides or conflicts with macOS native Spaces.
- Allows fast workspace switching, without animations
- Have plain-text configuration
- Doesn't require disabling SIP (System Integrity Protection)
- Define its own key bindings, using the configuration file, avoiding the need of `shkd` or another tool

When I first tried Aerospace, it was very new and with a small user base or reviews. But over the time, it has evolved to become more stable and reliable, especially comparing with the alternatives I presented before.

There are a few minor downsides, however: Aerospace still doesn't have a good scriptable way to query and manage windows, especially floating windows, and no support for _focus follow mouse_ behavior. But those features are expected to be implemented at some time.

#### How to install Aerospace

Aerospace is installed through Homebrew.

```bash
brew install --cask nikitabobko/tap/aerospace
```

On the first run, Aerospace will require some system permissions to work property, as well as being started at login.

Its configuration file is located at `~/.config/aerospace/aerospace.toml`. For reference or samples, check the [Aerospace configuration documentation].

### Dropdown terminal (WIP)

Having a working Dropdown terminal is not fully possible with only Aerospace yet, due to the lack of commands for querying and managing floating windows.

I have a working in progress solution using a mix of Alacritty window position arguments + Aerospace config. The configuration sample is below, and you can ready more about its limitations and issues, or collaborate on the [Aerospace DDTerm] discussion on GitHub.

```toml
[mode.main.binding]

# Dropdown terminal
ctrl-esc = '''exec-and-forget pgrep -x alacritty > /dev/null && \
  alacritty msg create-window \
    --title='Dropdown terminal' \
    -o window.position.y=0 -o window.position.x=0 \
    -o window.dimensions.lines=35 -o window.dimensions.columns=240 || \
  open -na /Applications/Alacritty.app --args \
    --title='Dropdown terminal' \
    -o window.position.y=0 -o window.position.x=0 \
    -o window.dimensions.lines=35 -o window.dimensions.columns=240
'''

[[on-window-detected]]
if.window-title-regex-substring = 'Dropdown terminal'
run = ['layout floating']
```

A similar configuration can be done with other terminal emulators too.

#### How to install Alacritty

To install [Alacritty] you can download from its website or use Homebrew.

Due to the lack of [notarization], Alacritty app is held on quarantine by default, not allowing to start the application. To avoid this issue you can explicitly remove the quarantine as below.

```bash
brew install --cask alacritty --no-quarantine

# or

brew install --cask alacritty
xattr -d com.apple.quarantine /Applications/Alacritty.app
```

#### Alternatives

If you really need a fully functional Dropdown Terminal, you can use another option, like iTerm2. Just remember to add a rule to Aerospace to make its window float.

```toml
[[on-window-detected]]
if.window-title-regex-substring = 'Dropdown terminal' # replace with the window title or id
run = ['layout floating']
```

## Unchanged solutions

As I mentioned, I'm still using [Homebrew] as package manager, [Colima] to manager containers, [Scroll Reverser] to remove mouse/touchpad natural scroll, and Alacritty _middle click paste_ configuration, so you can refer to the original post _[How to turn your macOS into a Linux-like Desktop]_ for those configurations.

If any of my settings change in the future, I'll update this blog post or write a new one.

Stay tuned.

## Sources and References

- Image Credits: `thekrzysiekart`([deviantart.com/thekrzysiekart/art/Penguin-Tux-Eating-An-Apple-354490341])
- [Aerospace configuration documentation]
- [How to turn your macOS into a Linux-like Desktop]
- [Karabiner Elements installation guide]

[Aerospace DDTerm]: https://github.com/nikitabobko/AeroSpace/discussions/1556
[Aerospace configuration documentation]: https://nikitabobko.github.io/AeroSpace/guide#configuring-aerospace
[Aerospace]: https://github.com/nikitabobko/AeroSpace
[Alacritty]: https://alacritty.org/
[Colima]: https://github.com/abiosoft/colima
[Homebrew]: https://brew.sh/
[How to turn your macOS into a Linux-like Desktop]: https://blog.codeminer42.com/how-to-turn-your-macos-into-a-linux-like-desktop/
[Karabiner Elements features]: https://karabiner-elements.pqrs.org/docs/getting-started/features/
[Karabiner Elements installation guide]: https://karabiner-elements.pqrs.org/docs/getting-started/installation/
[Karabiner Elements]: https://karabiner-elements.pqrs.org/
[Karabiner PC-Style Shortcuts]: https://ke-complex-modifications.pqrs.org/?q=PC-Style%20Shortcuts
[Karabiner community rules]: https://ke-complex-modifications.pqrs.org/
[Scroll Reverser]: https://pilotmoon.com/scrollreverser/
[The Miners Blog]: https://blog.codeminer42.com
[Tiling Window Manager]: https://en.wikipedia.org/wiki/Tiling_window_manager
[deviantart.com/thekrzysiekart/art/Penguin-Tux-Eating-An-Apple-354490341]: https://www.deviantart.com/thekrzysiekart/art/Penguin-Tux-Eating-An-Apple-354490341
[i3]: https://i3wm.org/
[notarization]: https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution
[virtual workspaces]: https://nikitabobko.github.io/AeroSpace/guide#emulation-of-virtual-workspaces
