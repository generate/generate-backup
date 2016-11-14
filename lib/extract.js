'use strict';

var fs = require('fs');
var tar = require('tar-fs');
var mkdirp = require('mkdirp');
var mm = require('micromatch');
var extend = require('extend-shallow');

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


