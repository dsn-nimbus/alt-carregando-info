"use strict";

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const coveralls = require('gulp-coveralls');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const Karma = require('karma').Server;

const _coverage = 'coverage/**/lcov.info';
const _scripts = 'src/**/*.js';
const _styles = 'src/**/*.css';
const _script = 'alt-carregando-info.js';
const _style = 'alt-carregando-info.css';
const _dist = 'dist';

gulp.task('build-css', () => {
  return gulp.src(_styles)
             .pipe(concat(_style.toLowerCase()))
             .pipe(gulp.dest(_dist))
             .pipe(cssmin())
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest(_dist));
})

gulp.task('build', ['unit_test', 'build-css'], () => {
  return gulp.src(_scripts)
             .pipe(concat(_script.toLowerCase()))
             .pipe(gulp.dest(_dist))
             .pipe(uglify())
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest(_dist));
})

gulp.task('unit_test', (done) => {
  return new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['Chrome']
  }, done).start();
})

gulp.task('test_ci', ['unit_test'], () => {
  return gulp.src(_coverage).pipe(coveralls());
})
