'use strict';

var fs = require('fs');
var tar = require('tar-fs');
var mkdirp = require('mkdirp');
var mm = require('micromatch');
var extend = require('extend-shallow');

/**
 * Extract the specified `.src` `.tar` file to the specified `.dest` folder.
 * Additional `.ignore` option may be passed to ignore files and directories. The `.ignore` property may be anything that
 * is acceptable to pass to the `[micromatch][].filter` method.
 *
 * ```js
 * extract({src: '/backups/2017-01-02.tar', dest: './'});
 * ```
 * @param  {Object} `options` Options to control what is extracted.
 * @return {Stream} The stream created by [tar-fs][].
 * @api public
 */

module.exports = function(options) {
  var opts = extend({}, options);
  var dest = opts.dest;
  if (!dest) throw new Error('expected a `dest`');

  var src = opts.src;
  if (!src) throw new Error('expected a `src`');

  var ignore = function() {};
  if (typeof opts.ignore === 'function') {
    ignore = opts.ignore;
  }

  if (typeof opts.ignore === 'string' || Array.isArray(opts.ignore)) {
    ignore = mm.filter(opts.ignore);
  }

  mkdirp.sync(dest);
  return fs.createReadStream(src)
    .on('error', console.error)
    .pipe(tar.extract(dest, {ignore: ignore}))
    .on('error', console.error);
};


