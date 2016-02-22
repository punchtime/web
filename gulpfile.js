'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var imageResize = require('gulp-image-resize');

const SRC = './src';
const DEST = './dist';

gulp.task('scripts',() => {
  return gulp.src([SRC+'/js/*.js', '!./node_modules/**', '!./dist/**'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(babel())
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST+'/src/js'));
});

gulp.task('files',() => {
  return gulp.src(['**/*.html','**/*.php', '!./node_modules/**', '!./dist/**'])
    .pipe(gulp.dest(DEST));
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
    .pipe(gulp.dest(DEST+'/src/img'));
});

gulp.task('sass', () => {
  return gulp.src([SRC+'/scss/**/*.scss', '!./node_modules/**', '!./dist/**'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['>1%'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(DEST+'/src/css'));
});

gulp.task('watch',() => {
  gulp.watch(SRC+'/scss/**/*.scss', ['sass']);
  gulp.watch(SRC+'/js/**/*.js', ['scripts']);
  gulp.watch(SRC+'/img/**/*', ['images']);
  gulp.watch(['**/*.html','**/*.php'], ['files']);
});

gulp.task('default', ['sass','scripts','images','files']);
