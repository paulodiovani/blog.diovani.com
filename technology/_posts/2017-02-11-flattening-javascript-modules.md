---
layout: post
title: Flattening JS Modules
image: /media/2017/flat-belly-secrets.jpg
image_credits: timesnowindia.com
---

My colleagues says that I'm a perfectionist. That's somewhat true, as I'm always concerned about easy to read and maintainable code. In this post I'll give some tips on how to write better Javascript modules with a simple rule in mind -- _No line should be indented more than once, unless really necessary_.

We'll be using some concepts of _Functional Programming_. If you're not familiar with _FP_ yet, I suggest to read first the [FP Introduction for JS][fp-js-carol], written by my colleague Carolina Pascale. You may also want to check the [FP Jargon repository][fp-jargon] and the [Ramda][ramda] library documentation, which we will be using in the following examples.

The whole idea is to turn a _fat_ code like this:

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 00-example1.js %}

To something more _flat_, like this:

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 00-example2.js %}

## Example Case

Consider a script, that does the following:

1. Request images list from unplash.it
2. Get a random number of images
3. Download the images
4. Get labels for each image from Google Cloud Vision
5. Add author and labels in image as text

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 01-original.js %}

In short, the script download random images and add the author/photographer and google labels as annotations.

The result is something like this.

![annotated image](/media/2017/sparkler-light-darkness.jpg)

But the code is awfull. So how can we make it better?

## 1st -- Using promises

A first step is to exchange all callbacks for promises. In this example we'll use [bluebird](http://bluebirdjs.com/) to _promisify_ standard modules (which doesn't return a promise yet) and our stream, but you can use another promise library or even native ES6 promises.

The main differences are shown bellow.

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 02-promises-partial.js %}

Much better, right? But we still have some problems...

1. There is a `forEach` inside a promise. This doesn't add results to the promises and the outer one cannot know when the processing ended.
2. We still have a lot of indentation (promises inside promises), not much different from a _[callback hell](http://callbackhell.com/)_.

## 2nd -- Use Map or FlatMap instead of forEach

This is where _functional programming_ first comes in handy.

A `map` function looks great with promises because they allow us to keep chaining `.then`s. A `flatMap`, for instance, is just a map that `flat` the results.

Using `map` is always recommended in place of a `forEach` loop.

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 03-map-partial.js %}

Note the `Promise.all` lines. They're necessary because our `map` will return an array of promises that are still pending. `Promise.all` waits for every promise in the array to be fullfiled, and then returns a new array with their results.

For now on, we already get rid of any additional error or exception handling, since any rejected promise will be reported in the `catch` at the final of the chain.

## 3rd -- Extract functions

Now we should extract the functions from the chain. In other words, we define all functions first, and just call them on each `then`.

We also make sure all functions are _pure_ and _endomorphic_ or _isomorphic_. This means that they do not change anything outside it's scope and it's arguments and return value are of the same type or, at least, preserve the same structure.

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 04-extract-partial.js %}

By doing this, once we name the functions properly, we don't need any more comments to make things clear.

## 4th -- Curry all functions

At last, we should _curry_ all functions that waits more than one argument, so we can get rid of the _lambdas_ too. For that, optional arguments are not allowed and the `data` argument must be the last for every function.

In our example, only the `sample` method needs to be curried.

Note: This is where [Ramda][ramda] helps a lot. And with `map` too.

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 05-curry-partial.js %}

And _voilá_. Now the main code can easily be read as a sentence:

> Request image list (from url), then (json) parse, then sample (quantity) images, then download (each) image, then detect labels for (each) image, then apply labes for (each) image.

A code like this is easily maintainable, because each function is just a small piece kept separately (it can even be moved to another, shared, module), and because the _promise chain_ is easy to read.

The final, full script, is available below.

{% gist paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4 05-curry.js %}

Hope it helps.

[fp-js-carol]: https://blog.codeminer42.com/introduction-to-functional-programming-with-javascript-c06a2540a7c3#.pkoufdsq3 "Introduction to Functional Programming with Javascript"
[fp-jargon]: http://git.io/fp-jargons "Functional Programming Jargon"
[ramda]: http://ramdajs.com/ "Ramda"
