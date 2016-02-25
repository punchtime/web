/*
 * Scripts for the web version of punchtime.io
 *
 * @author Haroen Viaene <hello@haroen.me>
 */

var firebase = require('firebase');

(()=>{
  /* jshint ignore:start */
  /* google analytics */
  window.ga = window.ga || function() {
      (ga.q = ga.q||[]).push(arguments);
  };
  ga.l = +new Date;
  // fill in analytics
  ga("create", "", "auto");
  ga("send", "pageview");
  /* jshint ignore:end */
})();

(()=>{
  console.log('test');
})();
