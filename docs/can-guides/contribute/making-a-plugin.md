@page guides/contributing/making-a-plugin Making a plugin
@parent guides/contribute 11

@description Learn how contribute a code change to CanJS.

@body

Making an official or unofficial CanJS plugin is easy.  

An __official__ plugin is:

 - In a repository under the [https://github.com/canjs CanJS organization].
 - Listed and documented under the [can-ecosystem Ecosystem Collection].
 - Tested in the `canjs/canjs` integration suite.
 - Published as `can-<name>` (with a few exceptions).

__Unofficial__ plugins can be maintained however you choose, but to maximize your project’s:

- Compatibility — useful in as many development environments as possible (Browserify, StealJS, Webpack, etc.)
- Discoverability — other developers can find it
- Contribute-ability — other developers can contribute to it

…we suggest following the [DoneJS plugin guide](https://donejs.com/plugin.html) with the following changes:

__1.__ Pick a plugin name that has `can` in the name.  

__2.__ When the `donejs add plugin` generator asks for “Project main folder”, use `.`

__3.__ List `canjs` in your `package.json`’s `keywords`.

__4.__ Update the code to match the [File organization and responsibilities](#Fileorganizationandresponsibilities) section.  There are a few changes to make:

- Change everything to CommonJS.  Use `require('module-name')` instead of `import 'module-name'`.
- Use _tabs_ instead of _spaces_.
- Use dashes instead of underscores in generated filenames.

__5.__ Use the [migrate-3] guide to update the code for CanJS 3. This won’t be necessary with DoneJS 1; it’s [coming soon](https://github.com/donejs/donejs/issues/703)!
