/*
 * Scripts for the web version of punchtime.io
 *
 * @author Haroen Viaene <hello@haroen.me>
 */

/**
 * google analytics
 * @param {string} trackingCode The google analytics tracking code like UA-XXXXXXXX-X
 */
/* jshint ignore:start */
// ((trackingCode)=>{
//   /* google analytics */
//   window.ga = window.ga || function(){
//       (ga.q = ga.q||[]).push(arguments);
//   };
//   ga.l = +new Date;
//   // fill in analytics
//   ga('create', trackingCode, 'auto');
//   ga('send', 'pageview');
// })('UA-XXXXXXXX-X');
/* jshint ignore:end */

/**
 * The welcome message to the console
 */
(()=>{
  console.log(`%cWelcome to punchtime
All our code is open source, if you want to help, take a look at https://github.com/punchtime`, "font-family: sans-serif; color: red; font-size: 1em;");
})();
