'use strict';

var gulp = require('gulp'),
    util = require('gulp-util'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    csswring = require('csswring'),
    autoprefixer = require('autoprefixer-core'),
    concat = require('gulp-concat'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    browsersync = require('browser-sync');

var reload = browsersync.reload.bind(null, {stream: true});

function watch(glob, tasks) {
  var w = require('gulp-watch'),
      batch = require('gulp-batch');
  w(glob, {verbose: true}, batch(function (events, cb) {
    gulp.start(tasks, cb);
  }));
}

function errorHandler(prefix) {
  return function (err) {
    util.log(util.colors.red(prefix) + '\n' + err.stack);
    this.emit('end');
  };
}


gulp.task('build', ['pages', 'assets']);

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});


gulp.task('pages', function () {
  return gulp.src('pages/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload());
});

gulp.task('assets', ['styles', 'scripts']);

gulp.task('styles', function () {
  return gulp.src(['blocks/util/**/*.scss', 'blocks/main/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      precision: 10
    }))
    .pipe(concat('styles.css'))
    .pipe(postcss([
      csswring({removeAllComments: true}),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets'))
    .pipe(reload());
});

gulp.task('scripts', function () {
  var b = browserify({
      entries: './src/app.js',
      debug: true
    })
    .transform('babelify', {
      stage: 1,
      loose: 'all'
    })
    .transform('jadeify')
    .plugin('bundle-collapser/plugin');

  return b.bundle()
    .on('error', errorHandler('Browserify error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets'))
    .pipe(reload());
});


gulp.task('serve', ['watch'], function (cb) {
  browsersync({
    server: {
      baseDir: 'dist'
    },
    open: false
  }, cb);
});

gulp.task('watch', ['build'], function () {
  watch('pages/**/*', ['pages']);
  watch('blocks/**/*.scss', ['styles']);
  watch('src/**/*', ['scripts']);
});


gulp.task('default', ['build']);
