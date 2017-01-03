<p align="center">

<a href="https://github.com/generate/generate">
<img height="150" width="150" src="https://raw.githubusercontent.com/generate/generate/master/docs/logo.png">
</a>
</p>

Create backup archives with generate.

# generate-backup

[![NPM version](https://img.shields.io/npm/v/generate-backup.svg?style=flat)](https://www.npmjs.com/package/generate-backup) [![NPM monthly downloads](https://img.shields.io/npm/dm/generate-backup.svg?style=flat)](https://npmjs.org/package/generate-backup) [![Build Status](https://img.shields.io/travis/generate/generate-backup.svg?style=flat)](https://travis-ci.org/generate/generate-backup)

![generate-backup demo](https://raw.githubusercontent.com/generate/generate-backup/master/docs/demo.gif)

## Usage

### CLI

When installed globally, the `backup` generator is available to use through the `gen` command:

Backup a folder to a tar file using the [default](#default) task.

```sh
$ gen backup --src my-project --dest /backups/my-project
```

Extract a tar file to a folder using the [extract](#extract) task.

```sh
$ gen backup:extract --src /backups/my-project/2017-01-02.tar --dest my-project-2
```

### API

**Params**

* `app` **{Object}**: [generate](https://github.com/generate/generate) instance to add tasks to.

**Example**

```js
// use as a plugin with existing generate instance
// $ gen backup
app.use(require('generate-backup'));

// use as a subgenerator on an existing generate instance
// $ gen bkp
app.register('bkp', require('generate-backup'));
```

### Internal API

Internal functions that are used inside the tasks to provide [backup](#backup) and [extract](#extract) functionality.

**Params**

* `options` **{Object}**: Options to control what is archived.
* `returns` **{Stream}**: The stream created by [tar-fs](https://github.com/mafintosh/tar-fs).

**Example**

```js
backup({src: './', dest: '/backups'});
```

**Params**

* `options` **{Object}**: Options to control what is extracted.
* `returns` **{Stream}**: The stream created by [tar-fs](https://github.com/mafintosh/tar-fs).

**Example**

```js
extract({src: '/backups/2017-01-02.tar', dest: './'});
```

## What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/generators.md) and [tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

**For more information**:

* Visit the [generate project](https://github.com/generate/generate/)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/micro-generators.md))

## Getting started

### Install

**Installing the CLI**

To run the `backup` generator from the command line, you'll need to install [Generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-backup**

Install this module with the following command:

```sh
$ npm install --global generate-backup
```

### Usage

Run this generator's `default` [task](https://github.com/generate/generate/blob/master/docs/tasks.md#default) with the following command:

```sh
$ gen backup
```

**What you should see in the terminal**

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Help

To see a general help menu and available commands for Generate's CLI, run:

```sh
$ gen help
```

## Tasks

All available tasks.

### [backup](generator.js#L41)

Default `backup` task that will backup the specified `--src` folder a `.tar` file in the specified `--dest` folder using an optional `--ignore` flag.

**remove spaces in the ignore pattern**

**Example**

```sh
# backup all node projects to the /backups/projects folder but ignore any node_modules folders
$ gen backup --dest /backups/projects --src projects --ignore '** /node_modules/{,** /*}'
```

### [extract](generator.js#L59)

`extract` task that will extract the files from the specified `--src` `.tar` file to the specified `--dest` folder using an optional `--ignore` flag.

**Example**

```sh
# extract the archived projects from /backups/projects/2017-01-02.tar to the ./restore/projects folder.
$ gen backup --dest restore/projects --src /backups/projects/2017-01-02.tar
```

### [default](generator.js#L71)

Default task aliased for [backup](#backup)

Visit Generate's [documentation for tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

## Next steps

### Running unit tests

It's never too early to begin running unit tests. When you're ready to get started, the following command will ensure the project's dependencies are installed then run all of the unit tests:

```sh
$ npm install && test
```

### Publishing your generator

If you're tests are passing and you're ready to publish your generator to [npm](https://www.npmjs.com), you can do that now with the following command:

**Are you sure you're ready?!**

Let's go!

```sh
$ npm publish
```

## About

### Related projects

* [generate](https://www.npmjs.com/package/generate): Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of Slush, and more powerful flow control and composability than either.")
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. | [homepage](https://github.com/jonschlinkert/micromatch "Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch.")
* [tar-fs](https://www.npmjs.com/package/tar-fs): filesystem bindings for tar-stream | [homepage](https://github.com/mafintosh/tar-fs "filesystem bindings for tar-stream")

### Community

Are you using [Generate](https://github.com/generate/generate) in your project? Have you published a [generator](https://github.com/generate/generate/blob/master/docs/generators.md) and want to share your project with the world?

Here are some suggestions!

* If you get like Generate and want to tweet about it, please feel free to mention `@generatejs` or use the `#generatejs` hashtag
* Show your love by starring [Generate](https://github.com/generate/generate) and `generate-backup`
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/generate) (please use the `generatejs` tag in questions)
* **Gitter** Discuss Generate with us on [Gitter](https://gitter.im/generate/generate)
* If you publish an generator, thank you! To make your project as discoverable as possible, please add the keyword `generategenerator` to package.json.

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

### License

Copyright © 2017, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.3, on January 02, 2017._