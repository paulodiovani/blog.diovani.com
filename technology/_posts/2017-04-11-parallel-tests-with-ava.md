---
layout: post
title: Parallel tests with AVA
image: /media/2017/ava-header.png
image_credits: ava.li
---

There are a lot of test frameworks for Javascript/Node.js and I've been working with Mocha, Jasmine and Lab for a while. But I decided to give a try to [AVA][ava] in a [new project](https://github.com/societiesio/societies-api) to be able to write faster specs in ES2017.

Different from other test frameworks AVA runs tests in parallel by default. Not only by using Node asynchronous capabilities but by running every test in a separate process. This gives each test an isolated environment.

## Main differences from other frameworks (I've used)

The table below shows the most significant features.

&nbsp;          | Implicit Globals | Async | Parallel | Process Fork | BDD             | ES2017
--              | :--:             | :--:  | :--:     | :--:         | :--:            | :--:
[AVA][ava]      | No               | Yes   | Default  | Yes          | [Ava-Spec][aes] | Yes
[Hapi/Lab][lab] | No               | Yes   | Yes      | No           | Yes             | No
[Jasmine][jas]  | No               | Yes   | No       | No           | Yes             | No
[Mocha][moc]    | Yes              | Yes   | No       | No           | Yes             | No

- AVA doesn't support BDD style by default, but [Ava-Spec][aes] does (I'm using it)
- Hapi/Lab can run tests in parallel, but I've never used it this way
- Mocha is the only one that add Implicit Globals, so `describe` and `it`, are always available

## Configuration

First of all, [AVA configuration](https://github.com/avajs/ava#configuration) is done on `package.json` `"ava"` section. All [client arguments](https://github.com/avajs/ava#cli) can be set there.

My initial configuration looks as.

```json
{
  "ava": {
    "require": [
      "./test/support/bootstrap.js"
    ],
    "files": [
      "./test/**/*_spec.js"
    ]
  }
}
```

- `require`: requires node modules prior to **every test** (I'm explaining the `bootstrap.js` below)
- `files`: a glob pattern to tell which test files to run.

## ES2017 support

It's possible to write tests using ES2017 syntax with any other framework too, since you can just require `babel/register` or use `node >= 7.0.0`. But AVA is the only one that comes with a babel compiler by default, so it's quite easier and you'll find more ES2017 examples for it.

The biggest advantage in using ES2017 is to use `async` and `await` to deal with promises.

So, instead of writing:

```javascript
it('creates a record in db', () => {
  return new User().save()
    .then((model) => expect(model).to.include.keys(['id']))
})
```

You can just write:

```javascript
it('creates a record in db', async () => {
  const model = await new User().save()
  expect(model).to.include.keys(['id'])
})
```

This makes tests much more clear and easier to read.

## Bootstrap / Initialize

I usually add a `test/bootstrap.js` (or `test/initialize.js`) file with the common setup for the tests. These include loading env vars, initializing external services, setting common globals (as `chai.expect`), cleaning up databases, etc.

For AVA there is a _gotcha_ here, since this bootstrap file is required for every test it's not much _ok_ to add heavy tasks to it. Mine just loads env vars.

```javascript
process.env.NODE_ENV = 'test'

require('dotenv').config({ silent: true })
```

The goal of **NOT** adding heavy tasks to test/boostrap, like database cleanup, for example, is that smaller tests will run faster. For example, when testing a simple lib that does not require a database connection, the test will run without connecting to db.

## DB cleanup and dealing with concurrency

Since tests run in parallel, it's not safe to rely on (global) stored data. A quick solution is to have one of:

1. several databases, one for each test
2. table/collection prefixes for each test

With Mongodb/Mongoose, it's easy to have several databases, as they're created on first write to a collection and the io is fast enough. So I've created a small helper to deal with connection and cleanup.

```javascript
const {after, afterEach} = require('ava-spec')

/* use a different database for each test */
process.env.DATABASE_URL += `-test-${process.pid}`

/* initialize/connect to database */
const connection = require('../../../models/_connection')

const User = require('../../../models/user')

/* remove all documents */
const cleanDb = () => User.remove()

/* drop the database */
const dropDb = () => connection.db.dropDatabase()

/* defaults hooks for tests */
const dbHooks = () => {
  afterEach(() => cleanDb())
  after.always(() => dropDb())
}

module.exports = { cleanDb, dropDb, dbHooks }
```

So, on every spec that a database connection is required I just run:

```javascript
const {dbHooks} = require('../support/helpers/database')

dbHooks()
```

This will create a new `db` for each test using `test` and `process.pid` as a suffix (e.g. `mongodb://localhost:27017/database-test-999`), so that each test runs in a _sandboxed_ database.

## Caveats and Conclusions

[AVA][ava] Is a full featured test framework for Javascript focused on speed. It achieves it's goal by running tests in parallel in separate processes, which can even use more cores/processors to increase speed even more and isolates environments.

However, it's not as easy or intuitive to setup as other Javascript test frameworks and may be a little difficult for beginners, due to concurrency handling, mostly. Also, the lack of a BDD style DSL forces you (if you prefer BDD, of course) to rely on extra libs.

I would recommend it for big projects where test suites can take several minutes, due to tests running in parallel and not depending on each other.

[ava]: https://github.com/avajs/ava
[aes]: https://github.com/sheerun/ava-spec
[lab]: https://github.com/hapijs/lab
[jas]: https://jasmine.github.io/
[moc]: https://mochajs.org/
