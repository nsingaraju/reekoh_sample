'use strict'

const PATHS = {
  js: ['*.js', '*/*.js', '*/**/*.js', '!node_modules/**', '!plugin/**', '!test/lib/**'],
  json: ['*.json', '*/*.json', '*/**/*.json', '!node_modules/**', '!plugin/**'],
  specs: ['*.test.js']
}

const gulp = require('gulp')
const mocha = require('gulp-mocha')
const jshint = require('gulp-jshint')
const plumber = require('gulp-plumber')
const jsonlint = require('gulp-json-lint')
const standard = require('gulp-standard')

gulp.task('js-lint', function () {
  return gulp.src(PATHS.js)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
})

gulp.task('json-lint', function () {
  return gulp.src(PATHS.json)
    .pipe(plumber())
    .pipe(jsonlint({
      comments: true
    }))
    .pipe(jsonlint.report())
})

gulp.task('standard', function () {
  return gulp.src(PATHS.js)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('run-tests', function () {
  return gulp.src(PATHS.specs)
    .pipe(mocha({
      reporter: 'spec'
    }))
})

gulp.task('lint', gulp.series('js-lint', 'json-lint', 'standard'))
gulp.task('test', gulp.series('run-tests'))
gulp.task('default', gulp.series('run-tests'))
