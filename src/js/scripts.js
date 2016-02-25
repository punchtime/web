/*
 * Scripts for the web version of punchtime.io
 *
 * @author Haroen Viaene <hello@haroen.me>
 */

var Firebase = require('firebase');

var base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

base.child('0/tier/').on('value', (snapshot) => {
  console.log('tier: '+snapshot.val());
});

// https://www.firebase.com/docs/web/guide/saving-data.html
base.child('0/tier/').set("paid");

(()=>{
  /* jshint ignore:start */
  /* google analytics */
  window.ga = window.ga || function(){
      (ga.q = ga.q||[]).push(arguments);
  };
  ga.l = +new Date;
  // fill in analytics
  ga('create', '', 'auto');
  ga('send', 'pageview');
  /* jshint ignore:end */
})();

(()=>{
  console.log(`%cWelcome to punchtime
All our code is open source, if you want to help, take a look at https://github.com/punchtime`, "font-family: sans-serif; color: red; font-size: 1em;");
})();
