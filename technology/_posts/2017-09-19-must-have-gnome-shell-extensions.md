---
layout: post
title: 7 Must Have Gnome Shell Extensions
---

Gnome 3 allow the user to install _Extensions_ for several thing, from adding some
widgets for easy access to desktop features to completely change ui and behavior. Here
are some suggestions that I've using for a while, some of them I think indispensable.

## Must have Extensions

- [Alternate Tab](https://extensions.gnome.org/extension/15/alternatetab/)
switches the default `Alt + Tab` by a window (with screenshot) based switcher that
can group windows by workspace.
- [Audio Switcher](https://extensions.gnome.org/extension/1092/audio-switcher/)
is useful if you constantly need to change audio input/output devices.
- [Clipboard Indicator](https://extensions.gnome.org/extension/779/clipboard-indicator/)
manages the last _n_ clipboard entries.
- [Dropdown Terminal](https://extensions.gnome.org/extension/442/drop-down-terminal/)
for fast access to terminal emulator.

### UX improvements Extensions

- [Pixel Saver](https://extensions.gnome.org/extension/723/pixel-saver/)
hides app titlebar when maximized, saving vertical space.
- [Disable Workspace Switcher Popup](https://extensions.gnome.org/extension/959/disable-workspace-switcher-popup/)
as the name says, removes the annoying popup when switching workspaces.
- [Dynamic Top Bar](https://extensions.gnome.org/extension/885/dynamic-top-bar/)
makes topbar transparent when no window is maximized.

## Install and configuration

To be able to use Gnome Shell Extensions you must first install [Gnome Tweak Tool][tweak].
For Arch Linux or Ubuntu, you just have to install the `gnome-tweak-tool` package.

Once installed, you can enable/disable or configure extensions in the _Extensions_ tab.

![Gnome Tweak Tool][tweak-screenshot]

New extensions can be obtained/installed from several ways:

- From [Gnome Extensions (extensions.gnome.org)][extensions] website.

    For this to work you must install the browser extension and desktop
    integration package as [explained on the wiki][extensions-wiki]

- From system packages

    Some extensions are packaged for your distro, officialy or not. For Arch Linux
    there are [many Gnome Shell Extensions available on AUR][extensions-aur]

- From source repository

    GitHub or whatever, each extensions has it's own install instructions. In most
    cases it's just to clone the repository under `~/.local/share/gnome-shell/extensions`

There are a lot more extensions available at [Gnome Extensions website][extensions]
for many needs. For example, there is a [Bitcoin Markets](https://extensions.gnome.org/extension/648/bitcoin-markets/)
extensions that I've been using to keep track of currently BTC Price.

I still haven't find, however, a good _latest news_ and _Medium_ extension so I'm
considering to create one myself. Tell me if you have any recommendations.

[tweak]: https://wiki.gnome.org/action/show/Apps/GnomeTweakTool
[tweak-screenshot]: /media/2017/gnome-tweak-tool.jpg
[extensions]: https://extensions.gnome.org
[extensions-wiki]: https://wiki.gnome.org/Projects/GnomeShellIntegrationForChrome/Installation
[extensions-aur]: https://aur.archlinux.org/packages/?O=0&K=gnome-shell-extension
