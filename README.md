# [punchtime.io](https://punchtime.io)

[![Build Status](https://travis-ci.org/punchtime/web.svg?branch=master)](https://travis-ci.org/punchtime/web)

## info

This is the web client of [punchtime.io](https://punchtime.io).

Made for Projecten 1 at Odisee in Ghent

By [Haroen Viaene](https://haroen.me), [Elias Meire](http://eliasmei.re), [Arnaud Weyts](https://weyts.xyz)

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

## related

- [organisation](https://github.com/punchtime/organisation)
- [Android client](https://github.com/punchtime/app)

## License

MIT
