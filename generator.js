'use strict';

var isValid = require('is-valid-app');
var backup = require('./lib/backup');
var extract = require('./lib/extract');

/**
 * [generate][] plugin or subgenerator that adds a [backup](#backup) and [extract](#extract) tasks for archiving and extract tar archives.
 * Advantages of using this generator include being able to specify complex ignore patterns (handled by [micromatch][]).
 *
 * ```js
 * // use as a plugin with existing generate instance
 * // $ gen backup
 * app.use(require('generate-backup'));
 *
 * // use as a subgenerator on an existing generate instance
 * // $ gen bkp
 * app.register('bkp', require('generate-backup'));
 * ```
 *
 * @param  {Object} `app` [generate][] instance to add tasks to.
 */

module.exports = function(app) {
  if (!isValid(app, 'generate-backup')) return;

  /**
   * Default `backup` task that will backup the specified `--src` folder a `.tar` file in the specified `--dest` folder
   * using an optional `--ignore` flag.
   *
   * __remove spaces in the ignore pattern__
   *
   * ```sh
   * # backup all node projects to the /backups/projects folder but ignore any node_modules folders
   * $ gen backup --dest /backups/projects --src projects --ignore '** /node_modules/{,** /*}'
   * ```
   * @name backup
   * @api public
   */

  app.task('backup', function(cb) {
    backup(app.options)
      .once('error', cb)
      .once('finish', cb);
  });

  /**
   * `extract` task that will extract the files from the specified `--src` `.tar` file to the specified `--dest` folder
   * using an optional `--ignore` flag.
   *
   * ```sh
   * # extract the archived projects from /backups/projects/2017-01-02.tar to the ./restore/projects folder.
   * $ gen backup --dest restore/projects --src /backups/projects/2017-01-02.tar
   * ```
   * @name extract
   * @api public
   */

  app.task('extract', function(cb) {
    extract(app.options)
      .once('error', cb)
      .once('finish', cb);
  });

  /**
   * Default task aliased for [backup](#backup)
   * @name default
   * @api public
   */

  app.task('default', ['backup']);
};
