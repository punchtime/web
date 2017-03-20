# [punchtime.io](https://punchtime.io)

[![Join the chat at https://gitter.im/punchtime/public](https://badges.gitter.im/punchtime/public.svg)](https://gitter.im/punchtime/public?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/punchtime/web.svg?branch=master)](https://travis-ci.org/punchtime/web) [![Dependency Status](https://david-dm.org/punchtime/web.svg)](https://david-dm.org/punchtime/web) [![devDependency Status](https://david-dm.org/punchtime/web/dev-status.svg)](https://david-dm.org/punchtime/web#info=devDependencies)

## info

This is the web client of [punchtime.io](https://punchtime.io).

Made for Projecten 1 at Odisee in Ghent

By [Haroen Viaene](https://haroen.me), [Elias Meire](http://eliasmei.re) and [Arnaud Weyts](https://weyts.xyz).

It uses Firebase to communicate the location of an employee when he arrives at a location he works at (i.e. an electrician). This is then used to calculate the amount of hours the employee worked, and also how much the clients should pay for offered services.

## contributing

The front end uses [gulp](http://gulpjs.com) and thus also [npm](https://www.npmjs.com).

To build the front-end locally, you run:

```sh
npm install
gulp
```

If you only want gulp to build the files that have been changed, you can run after the previous command:

```sh
gulp watch
```

Deploying is done to `gh-pages` using [travis](https://travis-ci.org) with our friendly bot: [@punchtimebot](https://github.com/punchtimebot).

See also [CONTRIBUTING.md](CONTRIBUTING.md).

## related

- [organisation](https://github.com/punchtime/organisation)
- [Android client](https://github.com/punchtime/android)

## Open source packages used

* <https://github.com/google/material-design-icons/>
* babel-preset-es2015
* browser-sync
* gulp
* gulp-autoprefixer
* gulp-babel
* gulp-browserify
* gulp-cssnano
* gulp-imagemin
* gulp-jade
* gulp-jshint
* gulp-sass
* gulp-uglify
* gulp-util
* jshint
* jshint-stylish

## Screenshots

![](./assets/screenshots/Screen%20Shot%202017-03-20%20at%2020.47.45.png)

![](./assets/screenshots/Screen%20Shot%202017-03-20%20at%2020.47.59.png)

![](./assets/screenshots/Screen%20Shot%202017-03-20%20at%2020.48.24.png)

## License

Apache License 2.0
