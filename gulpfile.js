'use strict';

var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    babel           = require("gulp-babel"),
    browserify      = require('gulp-browserify'),
    cssnano         = require('gulp-cssnano'),
    imagemin        = require('gulp-imagemin'),
    notify          = require('gulp-notify'),
    jade            = require('gulp-jade'),
    jshint          = require('gulp-jshint'),
    sass            = require('gulp-sass'),
    stylish         = require('jshint-stylish'),
    uglify          = require('gulp-uglify'),
    gutil           = require('gulp-util'),
    browserSync     = require('browser-sync').create();

const SRC = './src';
const DIST = './dist';

gulp.task('scripts',() => {
  return gulp.src([SRC+'/js/*.js', '!./node_modules/**', '!./dist/**'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(uglify().on('error', gutil.log)) //notify(...) and continue
    .pipe(gulp.dest(DIST+'/src/js'));
});

gulp.task('templates', function() {
  var LOCALS = {};
  gulp.src(['**/*.jade', '!./node_modules/**', '!./dist/**', '!./includes/**'])
    .pipe(jade({
      locals: LOCALS
    }))
    .pipe(gulp.dest(DIST));
});

gulp.task('images', () => {
  return gulp.src([SRC+'/img/**/*', '!./node_modules/**', '!./dist/**'])
    .pipe(imagemin({
      optimizationLevel: 2,
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ]}))
    .pipe(gulp.dest(DIST+'/src/img'));
});

gulp.task('sass', () => {
  return gulp.src([SRC+'/scss/**/*.scss', '!./node_modules/**', '!./dist/**'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['>1%'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(DIST+'/src/css'));
});

gulp.task('copy',() => {
  return gulp.src(['CNAME'])
    .pipe(gulp.dest(DIST));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: DIST
    }
  });
});

gulp.task('watch',['default','browser-sync'], () => {
  gulp.watch('CNAME',['copy']);
  gulp.watch('**/*.jade', ['templates']);
  gulp.watch(SRC+'/scss/**/*.scss', ['sass']);
  gulp.watch(SRC+'/js/**/*.js', ['scripts']);
  gulp.watch(SRC+'/img/**/*', ['images']);
});

gulp.task('default', ['copy','templates','sass','scripts','images']);
