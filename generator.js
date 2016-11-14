'use strict';

var isValid = require('is-valid-app');
var backup = require('./lib/backup');
var extract = require('./lib/extract');

module.exports = function(app) {
  if (!isValid(app, 'generate-backup')) return;

  app.task('backup', function(cb) {
    backup(app.options)
      .once('error', cb)
      .once('finish', cb);
  });

  app.task('extract', function(cb) {
    extract(app.options)
      .once('error', cb)
      .once('finish', cb);
  });

  app.task('default', ['backup']);
};
