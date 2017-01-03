'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var moment = require('moment');
var generate = require('generate');
var npm = require('npm-install-global');
var del = require('delete');
var pkg = require('../package');
var generator = require('..');
var app;

var today = moment.utc().format('YYYY-MM-DD');
var isTravis = process.env.CI || process.env.TRAVIS;
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  return function(err) {
    if (err) return cb(err);
    var filepath = actual(name);

    fs.stat(filepath, function(err, stat) {
      if (err) return cb(err);
      assert(stat);
      del(actual(), cb);
    });
  };
}

describe('generate-backup', function() {
  this.timeout(5000);
  this.slow(250);

  if (!process.env.CI && !process.env.TRAVIS) {
    before(function(cb) {
      npm.maybeInstall('generate', cb);
    });
  }

  beforeEach(function(cb) {
    app = generate({silent: true});
    app.cwd = fixtures();
    app.option('dest', actual());
    app.option('src', fixtures());

    // see: https://github.com/jonschlinkert/ask-when
    app.option('askWhen', 'not-answered');

    // set default data to use in templates. feel free to remove anything
    // that isn't used (e.g. if "username" isn't defined in templates, just remove it)
    app.data(pkg);
    app.data('project', pkg);
    app.data('username', 'foo');
    app.data('owner', 'foo');
    del(actual(), cb);
  });

  afterEach(function(cb) {
    del(actual(), cb);
  });

  describe('tasks', function() {
    it('should extend tasks onto the instance', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('backup'));
    });

    it('should run the `default` task with .build', function(cb) {
      this.timeout(30000);
      app.use(generator);
      app.build('default', exists(`${today}.tar`, cb));
    });

    it('should run the `default` task with .generate', function(cb) {
      app.use(generator);
      app.generate('default', exists(`${today}.tar`, cb));
    });
  });

  describe('backup (CLI)', function() {
    it('should run the default task using the `generate-backup` name', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.use(generator);
      app.generate('generate-backup', exists(`${today}.tar`, cb));
    });

    it('should run the default task using the `generator` generator alias', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.use(generator);
      app.generate('backup', exists(`${today}.tar`, cb));
    });
  });

  describe('backup (API)', function() {
    it('should run the default task on the generator', function(cb) {
      app.register('backup', generator);
      app.generate('backup', exists(`${today}.tar`, cb));
    });

    it('should run the `backup` task', function(cb) {
      app.register('backup', generator);
      app.generate('backup:backup', exists(`${today}.tar`, cb));
    });

    it('should run the `default` task when defined explicitly', function(cb) {
      app.register('backup', generator);
      app.generate('backup:default', exists(`${today}.tar`, cb));
    });
  });

  describe('sub-generator', function() {
    it('should work as a sub-generator', function(cb) {
      app.register('foo', function(foo) {
        foo.register('backup', generator);
      });
      app.generate('foo.backup', exists(`${today}.tar`, cb));
    });

    it('should run the `default` task by default', function(cb) {
      app.register('foo', function(foo) {
        foo.register('backup', generator);
      });
      app.generate('foo.backup', exists(`${today}.tar`, cb));
    });

    it('should run the `generator:default` task when defined explicitly', function(cb) {
      app.register('foo', function(foo) {
        foo.register('backup', generator);
      });
      app.generate('foo.backup:default', exists(`${today}.tar`, cb));
    });

    it('should run the `generator:backup` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('backup', generator);
      });
      app.generate('foo.backup:backup', exists(`${today}.tar`, cb));
    });

    it('should work with nested sub-generators', function(cb) {
      app
        .register('foo', generator)
        .register('bar', generator)
        .register('baz', generator)

      app.generate('foo.bar.baz', exists(`${today}.tar`, cb));
    });
  });
});
