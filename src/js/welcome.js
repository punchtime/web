/*
 * Welcome to punchtime
 *
 * @author Haroen Viaene <hello@haroen.me>
 */
(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.welcome = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.welcome = factory();
  }
})(this, function() {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit: https://github.com/umdjs/umd

  'use strict';

  var welcome = function() {
    console.log("%cWelcome to punchtime\nAll our code is open source, if you want to help, take a look at https://github.com/punchtime", "font-family: sans-serif; color: red; font-size: 1em;");
  };

  return welcome;

});
