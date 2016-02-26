# [punchtime.io](https://punchtime.io)

[![Join the chat at https://gitter.im/punchtime/web](https://badges.gitter.im/punchtime/web.svg)](https://gitter.im/punchtime/web?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/punchtime/web.svg?branch=master)](https://travis-ci.org/punchtime/web) [![Dependency Status](https://david-dm.org/punchtime/web.svg)](https://david-dm.org/punchtime/web) [![devDependency Status](https://david-dm.org/punchtime/web/dev-status.svg)](https://david-dm.org/punchtime/web#info=devDependencies)

## info

This is the web client of [punchtime.io](https://punchtime.io).

Made for Projecten 1 at Odisee in Ghent

By [Haroen Viaene](https://haroen.me), [Elias Meire](http://eliasmei.re) and [Arnaud Weyts](https://weyts.xyz)

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

## License

MIT
