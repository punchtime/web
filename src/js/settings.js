let Firebase = require('firebase');
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

let auth = base.getAuth();

if (auth) {
  console.log('logged in with: '+auth.uid);
} else {
  console.warn('not logged in');
  location.href = '/login/';
}
