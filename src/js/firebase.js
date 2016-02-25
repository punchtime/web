/**
 * Firebase setup
 */
var Firebase = require('firebase');
var base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

/**
 * testing out firebase code
 * @todo remove when real code is written
 */
(()=>{
  base.child('/').on('value', (snapshot) => {
    console.log(snapshot.val());
  });

  // https://www.firebase.com/docs/web/guide/saving-data.html
  // base.child('0/tier/').set("paid");
})();
