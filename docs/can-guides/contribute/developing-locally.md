@page guides/contributing/developing-locally Developing Locally
@parent guides/contribute 6

@description Learn how contribute a code change to CanJS.

@body

## Overview

Contributing to any Open Source project can be intimidating.  All contributions from all types of contributors are welcome.  We’re
committed to making the experience as pleasant and rewarding as possible.  We’re happy to set up a
pairing session to show you how to fix a bug or write a feature.  

If you have any questions, you can always reach us on [Gitter chat](https://gitter.im/canjs/canjs).

The first thing to know about `CanJS` is that its code is split across about 40 different
repositories.  All but one of these are __library__ repositories like
[canjs/can-event](https://github.com/canjs/can-event) and [canjs/can-define](https://github.com/canjs/can-define).  These all work the same way.
The [canjs/canjs](https://github.com/canjs/canjs) __framework__ repository works slightly
differently.  The vast majority of code changes happen in one of the __library__
repositories.

If you don’t know which repository you need to work on, ask us in [Gitter chat](https://gitter.im/canjs/canjs).

We’ll cover the following details in this guide:

- Setting up your development environment.
- Getting the repository’s code and verify it’s working.
- The file organization and responsibilities.
- Making changes and submitting a pull request.

The following video walks through most of the following steps:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PRuueWqnpIw" frameborder="0" allowfullscreen></iframe>

## Setting up your development environment

Developing CanJS requires:

 - A [GitHub](https://github.com/) account and git client.
 - Node.js version 5 or later.
 - Firefox for running automated tests.

### Getting GitHub account and client

Sign up for a [GitHub](https://github.com/) account.  

There are a variety of ways to get a git command line client
connected to your GitHub account. GitHub has
great documentation on how to [set up Git](https://help.github.com/articles/set-up-git/).


If you already have `git` installed, make sure you’ve
[set up your ssh keys](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).

### Get Node.js

Download Node.js version 5 or later at [NodeJS.org](https://nodejs.org).  You can
verify Node’s version with:

```
node -v
```

### Get Firefox

Download the Firefox browser
[here](https://www.mozilla.org/en-US/firefox/new/). Make sure it gets installed into the
default location for your operating system.

Firefox is used to run each repository’s tests.


## Getting the code and verifying that it’s working

Once your environment is set up, you should be able to clone the repository you
want to change, install its dependencies, and verify you’ve set up your
development environment correctly.

__1.__  Click the __Fork__ button to fork the repository from which you will be working.
For example, you can fork `can-compute` by pressing its __Fork__ button on GitHub:

<img src="../../../docs/can-guides/contribute/fork.png" width="600px"/>


__2.__ Clone your forked version of the repository:

```
git clone git@github.com:<your username>/<repository-name>.git
```

For example, if your username is `justinbmeyer` and you forked `can-compute`:

```
git clone git@github.com:justinbmeyer/can-compute.git
```

__3.__ Move into your project’s directory.  For example

```
cd can-compute
```

__4.__ Install npm dependencies with:

```
npm install
```

__5.__ Make sure Firefox is closed and run the test suite with:

```
npm test
```

If every test passed, __congrats__! You have everything you need to
change code and have the core team review it.
