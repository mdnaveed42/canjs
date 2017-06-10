@page guides/contributing/project-organization Project Organization
@parent guides/contribute 2

@description Learn about how CanJS is organized.

@body

## File organization and responsibilities

Most __library__ repositories share a similar structure.  Understanding it can help
you figure out what code needs to be changed.  The following outline shows the
directory structure of a nonexistent `can-example` repository:

```
├── .editorconfig           — Configures editors for this project
├── .gitignore              — Tells git to ignore certain files
├── .jshintrc               — Configures JSHint
├── .npmignore              — Tells npm publish to ignore certain files
├── .travis.yml             — Travis CI configuration
├── build.js                — Build script to export code in other formats
├── can-example.js          — Main module code
├── package.json            — Configuration of package and dev scripts
├── readme.md               — Automatically generated readme
├── docs/                   — Documentation source
|   ├── can-example.md      — Package or module documentation
├── node_modules/           — Node dependency installation folder
├── test/                   — Test files
|   ├── can-example-test.js — Main test file
|   ├── test.html           — Main test page
```

Generally speaking, the most important files are:

 - the main module —  `can-example.js`
 - the main test module — `test/can-example-test.js`
 - the test page — `test/test.html`

To fix a bug or making a feature, add a test in the main test module, update code in the main module, and then verify the tests are passing by running
the test page.

Some modules have multiple modules, test modules, and test pages.  These modules are
commonly organized as __modlets__ where each folder will have its own main module, test module,
and test page:

```
├── a-module/            — Module’s modlet folder
|   ├── a-module.js      — The module
|   ├── a-module-test.js — The module’s tests
|   ├── test.html        — A test page that runs just the module’s tests
```

Where possible, CanJS code uses:

- Tabs not spaces
- JSHint
- CommonJS not ES6
- jQuery’s [coding conventions](https://contribute.jquery.org/style-guide/js/)
