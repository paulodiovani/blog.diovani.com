---
layout: post
title: Functional programming with Lodash/FP
---

We have been hearing a lot about [functional programming](https://en.wikipedia.org/wiki/Functional_programming) since the past couple of years and even how to use the paradigm in [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). For the ones are used to the [Lodash](https://lodash.com/) library, know that it exports a module to help with _functional programming_. We're about to see the main differences.

First of all, I must say that Lodash should not be your first choice when writing functional programming with Javascript. A better choice would be, probably, [Ramda](http://ramdajs.com/). But if your team likes Lodash very much, or your project already uses it, Lodash/FP may be a good option...

It provides a [FP guide](https://github.com/lodash/lodash/wiki/FP-Guide) listing the main differences of the module. As described on the official page:

> The `lodash/fp` module promotes a more functional programming (FP) friendly style by exporting an instance of `lodash` with its methods wrapped to produce immutable auto-curried iteratee-first data-last methods.

So, let's late a look at the main differences.

## Installation

For web pages, you shall load `lodash.fp.min.js` along with `lodash.min.js` from the CDN.

```html
<script src='https://cdn.jsdelivr.net/g/lodash@4(lodash.min.js+lodash.fp.min.js)'></script>
```

With Node.js you can just require the `lodash/fp` module.

```javascript
const _ = require('lodash/fp');
```

## Auto Curried methods

All methods in Lodash/FP are curried by default. That means that a method will only be executed if all it's arguments are provided. If not, the method will return a new function which accepts the remaining arguments.

For example, the following calls provide the same result.

```javascript
const object = { foo: 1, bar: 2 };

_.pick(['foo'], object);
//{ foo: 1 }

_.pick(['foo'])(object);
//{ foo: 1 }
```

This is very useful when creating functions with predefined arguments and forgoes the need of `_.partial`.

```javascript
const pickFoo = _.pick(['foo']);

pickFoo(object);
//{ foo: 1 }
```

### Fixed arity

Lodash has a lot of methods with optional arguments. This isn't true in Lodash/FP. To allow curry, all methods must have a fixed arity.

For example, the `_.merge` method in Lodash accepts an unlimited number of arguments.

```javascript
_.merge({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 });
//{ a: 1, b: 2, c: 3, d: 4 }
```

In Lodash/FP `_.merge` has a fixed arity of two. This may sound that the method became less useful, but the same behavior can be achieved with subsequent calls or by using a `_.reduce`.

```javascript
_.reduce(_.merge, {}, [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]);
//{ a: 1, b: 2, c: 3, d: 4 }
```

### User defined functions

Of course, any user defined function can be curried with the `_.curry` method.

```javascript
const greet = _.curry((greetings, name) => {
    console.log(`${greetings} ${name}`);
});

const sayHelloTo = greet('Hello');

sayHelloTo('Paulo');
//Hello Paulo
```

## Iterate-first Data-last

All methods that accepts an iterate function as argument now accepts the _collection_ argument for the last.

```javascript
//Lodash
_.map(collection, fn);

//Lodash/FP
_.map(fn, collection);
```

This is, again, done to allow creating functions with a predefined iterator.

```javascript
const addOne = _.map((n) => n + 1);

addOne([1, 2, 3]);
//[2, 3, 4]
```

This new approach make them awesome to use with Promises.

```javascript
const _ = require('lodash/fp');
const request = require('request-promise-native');

//read posts from REST API and
//convert to a user;title CSV
request('http://jsonplaceholder.typicode.com/posts')
.then(JSON.parse)
.then(_.map(_.at(['userId', 'title'])))
.then(_.concat([['userId', 'title']]))
.then(_.map(_.join(';')))
.then(_.join('\n'))
.then(console.log);

// userId;title
// 1;sunt aut facere repellat provident occaecati excepturi optio reprehenderit
// 1;qui est esse
// 1;ea molestias quasi exercitationem repellat qui ipsa sit aut
// ...
```

## Caveats

The Lodash/FP documentation is not very intuitive. The [FP guide](https://github.com/lodash/lodash/wiki/FP-Guide) is the only reference for it, adding to the [main lodash documentation site](https://lodash.com/docs/), which may lead to some confusion, as the methods are slightly different.

When searching the docs, keep in mind that...

1. The first argument on the docs is the last in Lodash/FP
1. Any optional argument is omitted

With these two rules in mind you'll probably be able to use every method without problems.
