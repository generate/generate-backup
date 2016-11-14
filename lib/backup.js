'use strict';

var fs = require('fs');
var path = require('path');
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

  var fp = path.join(dest, format(new Date())) + '.tar';
  mkdirp.sync(dest);

  var output = fs.createWriteStream(fp);

  return tar.pack(src, {ignore: ignore})
    .on('error', console.error)
    .pipe(output)
    .on('error', console.error)

  function format (date) {
    return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate());
  }

  function pad (n) {
    return (n < 10 ? '0' : '') + n;
  }
};


