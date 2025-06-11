---
layout: post
title: Should I migrate to Yarn?
image: /assets/media/2017/yarn-logo.png
image_credits: yarnpkg.com
---

[Yarn](https://yarnpkg.com/en/) is an alternative package manager for Node.js and Javascript. Acclaimed for being much faster, reliable and secure compared to [Npm](https://www.npmjs.com/). But does it really justify a change?

In my [current project at IsApp](https://isapp.com/) we've been considering a migration due to <del>a lot of frustrating</del> some problems dealing with `npm-shrinkwrap` to lock package versions.

Well, let's talk about that for start...

## WTF is npm-shrinkwrap?

[npm-shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) is a feature of NPM to lock down package versions. It's a command that generates a file named `npm-shrinkwrap.json` (_wth it's not just `npm.lock`_) with quite the same concept behind `Gemfile.lock` (for Ruby Bundler) or `composer.lock` (for PHP Composer). It writes down the current version of every installed package in the working tree.

Once generated, any attempt to `npm install` will respect this file in two ways:

- For a project installation, it installs the exact same versions of the packages listed on `npm-shrinkwrap.json`. So we can guarantee that the same environment runs on development, test and production.
- For new package installations, it updates `npm-shrinkwrap.json` with the new installed versions.

The problem is that it's not so reliable as it should. It changes thousands of lines to `npm-shrinkwrap.json` after any simple install and insists in adding development dependencies to it without being requested, so we had to manually update the file from time to time. In short, it _sux_.

## Yarn to the rescue

I've been using Yarn for some weeks only, but despite my initial reluctance in using anything beyond the _node default tools_, I'm quite satisfied.

Yarn **always** uses a `yarn.lock` (_now this name makes sense_) file. Which means that either you don't have to worry about generating/updating it nor you can ignore it.

The `yarn.lock` is a simple text file instead of a json one and, in my tests, it remains very consistent between new package installs. But it has even more benefits.

## Cache and faster install

Npm seems to completely ignore local cache, as it always take a lot of time to install packages, even if you have already installed them before in other projects. Yarn, on the other hand, can be very fast once it has a cache.

I've collected some benchmarks comparing Npm and Yarn using the GNU `time` command and the [express.js repository](https://github.com/expressjs/express) as example.

The results are bellow ([full comparisons on gist](https://gist.github.com/paulodiovani/881189791d8a4f90faf249a26973cba7)):

&nbsp;                                          | npm install | yarn install
--                                              | --:         | --:
**clean install (no cache)**                    | 19.70s      | 6.93s
**cached**                                      | 17.05s      | 4.89s
**cached and _lockfile_ present**               | 13.90s      | 2.10s
**cached and node_modules present**             | 1.49s       | 4.18s
**cached, _lockfile_ and node_modules present** | 1.63s       | 0.67s

Just to summarize...

In a clean install Yarn can be _3 times_ faster than Npm. Reducing to almost _5 times_ faster when the packages are cached. With the lockfile present it took _less than one second_ on the example project.

It's _f\*\*\*\*\*\* fast!_

## Yarn for the win

I **would not** suggest migrating to Yarn on small or new projects. In other words, if Npm can handle your project well, just keep with it.

But if you work on a  huge project with lots of dependencies that takes a lot of time to install or if having a _lockfile_ is mandatory, Yarn can help a lot, so consider using it.

Nevertheless, Yarn still uses `package.json` and so it's fully compatible with Npm (despite the _lockfile_). So you can still install and run any Yarn project using Npm.
