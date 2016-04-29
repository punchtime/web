(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.html = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.html = factory();
  }
})(this, function() {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit: https://github.com/umdjs/umd

  'use strict';

  var util = (function() {
    // Thanks to Andrea Giammarchi
    var
      reEscape = /[&<>'"]/g,
      reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,
      oEscape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      },
      oUnescape = {
        '&amp;': '&',
        '&#38;': '&',
        '&lt;': '<',
        '&#60;': '<',
        '&gt;': '>',
        '&#62;': '>',
        '&apos;': "'",
        '&#39;': "'",
        '&quot;': '"',
        '&#34;': '"'
      },
      fnEscape = function(m) {
        return oEscape[m];
      },
      fnUnescape = function(m) {
        return oUnescape[m];
      },
      replace = String.prototype.replace;
    return (Object.freeze || Object)({
      escape: function escape(s) {
        return replace.call(s, reEscape, fnEscape);
      },
      unescape: function unescape(s) {
        return replace.call(s, reUnescape, fnUnescape);
      }
    });
  }());

  // Tagged template function
  var html = function(pieces) {
    var result = pieces[0];
    var substitutions = [].slice.call(arguments, 1);
    for (var i = 0; i < substitutions.length; ++i) {
      result += util.escape(substitutions[i]) + pieces[i + 1];
    }
    return result;
  };

  return html;

});
