---
layout: post
title: Flattening JS Modules
image: /media/2017/flat-belly-secrets.jpg
image_credits: timesnowindia.com
---

My colleagues says that I'm a perfectionist. That's somewhat true, as I'm always concerned about easy to read and maintainable code. In this post I'll give some tips on how to write better Javascript modules with a simple rule in mind -- _No line should be indented more than once, unless really necessary_.

We'll be using some concepts of _Functional Programming_. If you're not familiar with _FP_ yet, I suggest to read first the [FP Introduction for JS][fp-js-carol], written by my colleague Carolina Pascale. You may also want to check the [FP Jargon repository][fp-jargon] and the [Ramda][ramda] library documentation, which we will be using in the following examples.

The whole idea is to turn a _fat_ code like this:

```javascript
request.get('https://example.com', (err, res, body) => {
    if (!error && res.statusCode == 200) {
        const content = body.replace(/(<([^>]+)>)/ig, '')

        fs.writeFile('contents.txt', content, (err) => {
            console.log('contents are saved.')
        })
    }
})
```

To something more _flat_, like this:

```javascript
request.get('https://example.com')
.then(stripTags)
.then(writeToFile)
.then(console.log)
.catch(console.error)
```

## Example Case

Consider a script, that does the following:

1. Request images list from unplash.it
2. Get a random number of images
3. Download the images
4. Get labels for each image from Google Cloud Vision
5. Add author and labels in image as text

```javascript
'use strict'

require('dotenv').config({ silent: true })

const Exec = require('child_process').exec
const Fs = require('fs')
const Request = require('request')
const Vision = require('@google-cloud/vision')

const visionClient = Vision({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILENAME
})

const imageUrl = (id) => `https://unsplash.it/${process.env.RESOLUTION}?image=${id}`

const imageFilename = (id) => `img-${id}.jpg`

const sample = (collection, quantity = 1) => {
    const samples = []
    const max = quantity - 1

    for (let i = 0; i <= max; i++) {
        const index = Math.ceil(Math.random() * collection.length -1)
        samples.push(collection[index])
    }

    return samples
}

const applyLabels = (img, cb) => {
    const labels = img.labels.slice(0, 3)
    const command = `
        convert ${imageFilename(img.id)} \
        -pointsize 30 -font 'DejaVu-Sans-Bold' -strokewidth 2 \
        -draw "gravity north stroke black fill white text 0,20 '${labels.join(' | ')}' " \
        -draw "gravity south stroke black fill white text 0,20 'by ${img.author}' " \
        ${imageFilename(img.id)}
    `

    Exec(command, cb)
}

/* request full image list from unsplash.it */
Request.get('https://unsplash.it/list', (err, res, body) => {
    if (err) {
        return console.error(err)
    }

    /* get some samples */
    const json = JSON.parse(body)
    const images = sample(json, process.env.QUANTITY)

    /* process each image... */
    images.forEach((img) => {
        /* download for local filesystem */
        Request.get(imageUrl(img.id))
        .pipe(Fs.createWriteStream(imageFilename(img.id)))
        .on('close', () => {

            /* send image to Google Cloud Vision to get image labels */
            visionClient.detectLabels(imageUrl(img.id), (err, labels, apiRes) => {
                if (err) {
                    return console.error(err)
                }
                const data = Object.assign(img, { labels })

                /* add text to images with image magic */
                applyLabels(data, (err) => {
                    if (err) {
                        return console.error(err)
                    }
                })
            })
        })
    })
})
```

In short, the script download random images and add the author/photographer and google labels as annotations.

The result is something like this.

![annotated image](/media/2017/sparkler-light-darkness.jpg)

But the code is awfull. So how can we make it better?

## 1st -- Using promises

A first step is to exchange all callbacks for promises. In this example we'll use [bluebird](https://bluebirdjs.com/) to _promisify_ standard modules (which doesn't return a promise yet) and our stream, but you can use another promise library or even native ES6 promises.

The main differences are shown bellow.

```javascript
const Promise = require('bluebird')
const Exec = Promise.promisify(require('child_process').exec)

/* ... */

const applyLabels = (data) => {
    /* ... */
    return Exec(command)
}

/* ... */

/* request full image list from unsplash.it */
Request.get('https://unsplash.it/list')
.then((body) => {
    /* get some samples */
    const json = JSON.parse(body)
    const images = sample(json, process.env.QUANTITY)

    /* process each image... */
    images.forEach((img) => {
        /* download for local filesystem */
        new Promise((resolve, reject) => {
            Request.get(imageUrl(img.id))
            .pipe(Fs.createWriteStream(imageFilename(img.id)))
            .on('close', resolve)
            .on('error', reject)
        })
        /* send image to Google Cloud Vision to get image labels */
        .then(() => visionClient.detectLabels(imageUrl(img.id)))
        .then(([labels]) => {
            const data = Object.assign(img, { labels })

            /* add text to images with image magic */
            return applyLabels(data)
        })
        .catch(console.error)
    })
})
.catch(console.error)
```

Much better, right? But we still have some problems...

1. There is a `forEach` inside a promise. This doesn't add results to the promises and the outer one cannot know when the processing ended.
2. We still have a lot of indentation (promises inside promises), not much different from a _[callback hell](https://callbackhell.com/)_.

## 2nd -- Use Map or FlatMap instead of forEach

This is where _functional programming_ first comes in handy.

A `map` function looks great with promises because they allow us to keep chaining `.then`s. A `flatMap`, for instance, is just a map that `flat` the results.

Using `map` is always recommended in place of a `forEach` loop.

```javascript
/* request full image list from unsplash.it */
Request.get('https://unsplash.it/list')
.then((body) => {
    /* get some samples */
    const json = JSON.parse(body)
    const images = sample(json, process.env.QUANTITY)

    /* process each image... */
    return images.map((img) => {
        /* download for local filesystem */
        return new Promise((resolve, reject) => {
            Request.get(imageUrl(img.id))
            .pipe(Fs.createWriteStream(imageFilename(img.id)))
            .on('close', resolve)
            .on('error', reject)
        })
        .then(() => img)
    })
})
.then((promises) => Promise.all(promises))
/* send images to Google Cloud Vision to get image labels */
.then((images) => {
    return images.map((img) => {
        return visionClient.detectLabels(imageUrl(img.id))
        .then(([labels]) => Object.assign(img, { labels }))
    })
})
.then((promises) => Promise.all(promises))
/* add text to images with image magic */
.then((images) => {
    return images.map((img) => applyLabels(img))
})
.catch(console.error)
```

Note the `Promise.all` lines. They're necessary because our `map` will return an array of promises that are still pending. `Promise.all` waits for every promise in the array to be fullfiled, and then returns a new array with their results.

For now on, we already get rid of any additional error or exception handling, since any rejected promise will be reported in the `catch` at the final of the chain.

## 3rd -- Extract functions

Now we should extract the functions from the chain. In other words, we define all functions first, and just call them on each `then`.

We also make sure all functions are _pure_ and _endomorphic_ or _isomorphic_. This means that they do not change anything outside it's scope and it's arguments and return value are of the same type or, at least, preserve the same structure.

```javascript
/* ... */

const requestImageList = (url) => Request.get(url)

/* ... */

requestImageList('https://unsplash.it/list')
.then((body) => JSON.parse(body))
.then((json) => sample(json, process.env.QUANTITY))
.then((images) => images.map(downloadImage))
.then((promises) => Promise.all(promises))
.then((images) => images.map(detectLabels))
.then((promises) => Promise.all(promises))
.then((images) => images.map(applyLabels))
.catch(console.error)
```

By doing this, once we name the functions properly, we don't need any more comments to make things clear.

## 4th -- Curry all functions

At last, we should _curry_ all functions that waits more than one argument, so we can get rid of the _lambdas_ too. For that, optional arguments are not allowed and the `data` argument must be the last for every function.

In our example, only the `sample` method needs to be curried.

Note: This is where [Ramda][ramda] helps a lot with it's `curry` method. And with `map` too.

```javascript
/* ... */

const R = require('ramda')

const sample = R.curry((quantity, collection) => {
    /* ... */
})

/* ... */

requestImageList('https://unsplash.it/list')
.then(JSON.parse)
.then(sample(process.env.QUANTITY))
.then(R.map(downloadImage))
.then(Promise.all)
.then(R.map(detectLabels))
.then(Promise.all)
.then(R.map(applyLabels))
.catch(console.error)
```

And _voilá_. Now the main code can easily be read as a sentence:

> Request image list (from url), then (json) parse, then sample (quantity) images, then download (each) image, then detect labels for (each) image, then apply labes for (each) image.

A code like this is easily maintainable, because each function is just a small piece kept separately (it can even be moved to another, shared, module), and because the _promise chain_ is easy to read.

The final, full script, is available below. All examples are also published on [this gist](https://gist.github.com/paulodiovani/9d3f644e2e7e255f7755c64cfd6b09f4).

```javascript
'use strict'

require('dotenv').config({ silent: true })

const Fs = require('fs')
const Promise = require('bluebird')
const R = require('ramda')
const Request = require('request-promise')
const Vision = require('@google-cloud/vision')
const Exec = Promise.promisify(require('child_process').exec)

const visionClient = Vision({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILENAME
})

const imageUrl = (id) => `https://unsplash.it/${process.env.RESOLUTION}?image=${id}`

const imageFilename = (id) => `img-${id}.jpg`

const sample = R.curry((quantity, collection) => {
    const samples = []
    const max = quantity - 1

    for (let i = 0; i <= max; i++) {
        const index = Math.ceil(Math.random() * collection.length -1)
        samples.push(collection[index])
    }

    return samples
})

const requestImageList = (url) => Request.get(url)

const downloadImage = (img) => {
    return new Promise((resolve, reject) => {
        Request.get(imageUrl(img.id))
        .pipe(Fs.createWriteStream(imageFilename(img.id)))
        .on('close', resolve)
        .on('error', reject)
    })
    .then(() => img)
}

const detectLabels = (img) => {
    return visionClient.detectLabels(imageUrl(img.id))
    .then(([labels]) => Object.assign(img, { labels }))
}

const applyLabels = (img) => {
    const labels = img.labels.slice(0, 3)
    const command = `
        convert ${imageFilename(img.id)} \
        -pointsize 30 -font 'DejaVu-Sans-Bold' -strokewidth 2 \
        -draw "gravity north stroke black fill white text 0,20 '${labels.join(' | ')}' " \
        -draw "gravity south stroke black fill white text 0,20 'by ${img.author}' " \
        ${imageFilename(img.id)}
    `

    return Exec(command)
}

requestImageList('https://unsplash.it/list')
.then(JSON.parse)
.then(sample(process.env.QUANTITY))
.then(R.map(downloadImage))
.then(Promise.all)
.then(R.map(detectLabels))
.then(Promise.all)
.then(R.map(applyLabels))
.catch(console.error)
```

Hope it helps.

[fp-js-carol]: https://blog.codeminer42.com/introduction-to-functional-programming-with-javascript-c06a2540a7c3#.pkoufdsq3 "Introduction to Functional Programming with Javascript"
[fp-jargon]: https://git.io/fp-jargons "Functional Programming Jargon"
[ramda]: https://ramdajs.com/ "Ramda"
