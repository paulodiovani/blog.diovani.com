---
layout: post
title: Chromium native desktop notifications
<!-- image: /media/2017/npm-5.jpg -->
<!-- image_credits: npm, inc. -->
---

Chromium Browser has just introduced Native Desktop Notifications for Linux and Mac. That means that we don't have to see that ugly upper right notification box anymore, but just use our desktop default ones. :D

I've always missed Native (libnotify) Desktop Notifications on Chromium -- especially after starting to use Gnome 3, which has beautiful notifications -- and even tried to use some extensions (Gnome integration) that, unfortunately didn't work so good.

But recent Chromium versions (I'm running `60.0.3112.78` here) had introduced native notifications. However, they need to be activated under `chrome:flags`.

Here's how:

1. Open `chrome:flags` on your Browser address bar
2. Search for _**Enable native notifications.** Mac, Linux_ and select _Enable_
3. Restart the Browser

Now you can see chrome notifications just as native apps notifications.

![native-notification](/media/2017/chromium-native-notifications.jpg)

References:

- [Chrome Adds Initial Support for Native Linux Desktop Notifications on OMG! Ubuntu](http://www.omgubuntu.co.uk/2017/04/first-code-chrome-native-linux-notifications)
- [Native desktop notifications on Linux on bugs.chromium.com](https://bugs.chromium.org/p/chromium/issues/detail?id=676220)
