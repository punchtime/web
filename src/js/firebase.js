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
    let pulseUrl = base.child('pulses').push({
      'latitude': form.querySelector('[name="latitude"]').value,
      'longitude': form.querySelector('[name="longitude"]').value,
      'note': form.querySelector('[name="note"]').value,
      'time': form.querySelector('[name="time"]').value,
      'type': form.querySelector('[name="type"]').value,
      'user': base.getAuth().uid
    });

    /**
     * get the reference from the url
     * @param  {string} url the exact url of a push
     * @return {string}     the id of that push
     */
    let getID = url => {
      return url.substr(url.indexOf('/-')+1);
    };

    /**
     * Also pushed the reference to this pulse to the corresponding user
     */
    base.child('users').child(base.getAuth().uid).child('pulses').push({
      [getID(pulseUrl)]: true
    });
    //todo: also push to the array of pulses of that user
    //this won't be possible in this version of the test, because users aren't authenticated
    //Consider that disk space is cheap, but a user’s time is not
    //source for that: https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html
  });
})();

/**
 * Add yourself to certain companies as employee or employer
 */
(()=>{
  let form = document.getElementById('add-roles');

  form.querySelector('[type="submit"]').addEventListener('click',e=>{
    e.preventDefault();
    let employer = form.querySelector('[name="employer"]').value;
    let employee = form.querySelector('[name="employee"]').value;
    if (employee) {
      //base.getAuth().uid
      base.child('users').child('-KBUKRyWeWruegpnzZYI').on('value', snapshot=> {
        console.log(snapshot);
      });
      // base.child('users').push({
      //   'name': form.querySelector('[name="name"]').value,
      //   'employee': {
      //     [employee]:true
      //   }
      // });
    }
    if (employer) {
      // base.child('users').push({
      //   'name': form.querySelector('[name="name"]').value,
      //   'employer': {
      //     [employer]:true
      //   }
      // });
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
      console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
      enableForms(true);
    } else {
      console.log('User is logged out');
      enableForms(false);
    }
  });

  /**
   * get name from authData
   */
  let getName = authData => {
    switch(authData.provider) {
      case 'password':
        return authData.password.email.replace(/@.*/, '');
      case 'twitter':
        return authData.twitter.displayName;
      case 'facebook':
        return authData.facebook.displayName;
      case 'google':
        return authData.google.displayName;
    }
  };

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
        // make a new account if it didn't exist yet
        base.child('users').child(authData.uid).once('value', snapshot=>{
          if (!snapshot.exists()) {
            base.child('users').child(authData.uid).set({
              provider: authData.provider,
              name: getName(authData)
            });
          }
        });
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
