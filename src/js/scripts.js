/*
 * Scripts for the web version of Days.rocks
 *
 * @author Haroen Viaene <hello@haroen.me>
 */

// var firebase = require('firebase');

(function(){
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
