/**
 * Firebase setup
 */
// require('./scripts');
const Firebase = require('firebase');
const tableify = require('tableify');
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

/**
 * logging all of the values of our firebase
 */
(()=>{
  base.child('/').on('value', (snapshot) => {
    document.getElementById('table').innerHTML = tableify(snapshot.val());
  });
})();

/**
 * Adding Firebase.push() to the pulse form
 */
(()=>{
  let form = document.getElementById('pulse');
  form.querySelector('[name="time"]').value = new Date().getTime();

  navigator.geolocation.getCurrentPosition(pos=>{
    form.querySelector('[name="latitude"]').value = pos.coords.latitude;
    form.querySelector('[name="longitude"]').value = pos.coords.longitude;
  },err=>{
    console.warn('ERROR(' + err.code + '): ' + err.message);
  });

  form.querySelector('[type="submit"]').addEventListener('click',e=>{
    e.preventDefault();
    base.child('pulses').push({
      'latitude': form.querySelector('[name="latitude"]').value,
      'longitude': form.querySelector('[name="longitude"]').value,
      'note': form.querySelector('[name="note"]').value,
      'time': form.querySelector('[name="time"]').value,
      'type': form.querySelector('[name="type"]').value,
      'user': form.querySelector('[name="user"]').value
    });
    //todo: also push to the array of pulses of that user
    //this won't be possible in this version of the test, because users aren't authenticated
    //Consider that disk space is cheap, but a user’s time is not
    //source for that: https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html
  });
})();

/**
 * Adding firebase.push() to the 'create a user' form
 * it's kinda messy, should be fixed
 */
(()=>{
  let form = document.getElementById('create-user');

  form.querySelector('[type="submit"]').addEventListener('click',e=>{
    e.preventDefault();
    let employer = form.querySelector('[name="employer"]').value;
    let employee = form.querySelector('[name="employee"]').value;
    if (employee) {
      base.child('users').push({
        'name': form.querySelector('[name="name"]').value,
        'employee': {
          [employee]:true
        }
      });
    }
    if (employer) {
      base.child('users').push({
        'name': form.querySelector('[name="name"]').value,
        'employer': {
          [employer]:true
        }
      });
    }
    if (employer && employee) {
      base.child('users').push({
        'name': form.querySelector('[name="name"]').value,
        'employee': {
          [employee]:true
        },
        'employer': {
          [employer]:true
        }
      });
    }
    //todo: also push the new user to the array of users of his company
    //this won't be possible in this version of the test, because users aren't authenticated
    //Consider that disk space is cheap, but a user’s time is not
    //source for that: https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html
  });
})();

/**
 * logging in and out
 */
(()=>{

  /**
   * enable all fieldsets except the login form
   * @param {boolean} login true if login, false if logout
   */
  let enableForms = login=>{
    let fieldsets = document.querySelectorAll('fieldset');
    for (let i = fieldsets.length; i--;) {
      fieldsets[i].disabled = !login;
    }
    document.getElementById('login').disabled = login;
    document.getElementById('auth').disabled = false;
  };

  /**
   * log on logging in and out
   */
  base.onAuth(authData=>{
    if (authData) {
      console.log('User ' + authData.uid + ' is logged in with ' + authData.provider, authData);
      enableForms(true);
    } else {
      console.log('User is logged out');
      enableForms(false);
    }
  });

  /**
   * logging in with any service
   * @param {string} service the auth service [google,twitter,facebook]
   */
  let auth = service => {
    console.log('logging in');
    base.authWithOAuthPopup(service, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('authenticated with: '+authData.uid);
      }
    });
  };

  /**
   * adding event listeners to the log in buttons
   */
  document.getElementById('google').addEventListener('click',()=>{
    auth('google');
  });
  document.getElementById('facebook').addEventListener('click',()=>{
    auth('facebook');
  });
  document.getElementById('twitter').addEventListener('click',()=>{
    auth('twitter');
  });

  /**
   * logging out after clicking on #logout
   */
  document.getElementById('logout').addEventListener('click',()=>{
    console.log('logging out');
    base.unauth();
  });
})();
