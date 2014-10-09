var subject = require('..');
var assert = require('assert');
var gulp = require('gulp');
var gutil = require('gulp-util');

describe('plugin', function() {
  it('renames files according to the pathspec', function(done) {
    gulp.src(__filename)
      .pipe(subject('%X.min.js'))
      .on('data', function(file) {
        assert.equal(file.path, __dirname + '/plugin.min.js');
        done();
      });
  });
  it('passes a replacement callback', function(done) {
    gulp.src(__filename)
      .pipe(subject('%X%{js,*}x', function() {
        return 'min.js';
      }))
      .on('data', function(file) {
        assert.equal(file.path, __dirname + '/plugin.min.js');
        done();
      });
  });
  it('support windows', function(done) {
    var stream = subject('%{foo/bar/,}p');
    stream.on('data', function(newFile) {
      assert.equal(newFile.path, 'c://home/a.js');
      done();
    });
    stream.write(new gutil.File({
      path: 'c:\\\\home\\foo\\bar\\a.js'
    }));
  });
});
