/**
 * import statements
 */
let Firebase = require('firebase');
let tableify = require('tableify');

/**
 * Firebase setup
 */
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');


/**
 * all database operations that are allowed
 * not really used
 * @type {class}
 */
// class baseOperations {
//   getAll() {
//     console.log(base);
//   }

//   addEmployee(userRef,company) {
//     console.log('add user');
//   }

//   addEmployer(userRef,company) {
//     console.log('add user');
//   }

//   baseOperations(url) {
//     let base = new Firebase(url);
//   }
// }

// let yeah = new baseOperations('https://scorching-inferno-1467.firebaseio.com/');

// yeah.getAll();

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
    let employer;

    base.child('companies').orderByChild('name').equalTo(form.querySelector('[name="employer"]').value).once('value',snap=>{
      employer = Object.keys(snap.val())[0];
    });

    e.preventDefault();
    let pulseUrl = base.child('pulses').push({
      'latitude': form.querySelector('[name="latitude"]').value,
      'longitude': form.querySelector('[name="longitude"]').value,
      'note': form.querySelector('[name="note"]').value,
      'time': form.querySelector('[name="time"]').value,
      'type': form.querySelector('[name="type"]').value,
      'employer': employer,
      'employee': base.getAuth().uid
    });

    /**
     * Also pushed the reference to this pulse to the corresponding user
     */
    base.child('users').child(base.getAuth().uid).child('pulses').update({
      [pulseUrl.ref().key()]: true
    });
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
      base.child('companies').orderByChild('name').equalTo(employee).once('value',snap=>{
        base.child('companies').child(Object.keys(snap.val())[0]).child('employees').update({
          [base.getAuth().uid]:true
        });
        base.child('users').child(base.getAuth().uid).child('employee').update({
          [Object.keys(snap.val())[0]]:true
        });
      });
    }
    if (employer) {
      base.child('companies').orderByChild('name').equalTo(employer).once('value',snap=>{
        base.child('companies').child(Object.keys(snap.val())[0]).child('employers').update({
          [base.getAuth().uid]:true
        });
        base.child('users').child(base.getAuth().uid).child('employer').update({
          [Object.keys(snap.val())[0]]:true
        });
      });
    }
  });
})();

/**
 * form for adding a company
 */
(()=>{
  let form = document.getElementById('add-company');

  form.querySelector('[type="submit"]').addEventListener('click',e=>{
    e.preventDefault();
    base.child('companies').push({
      'name': form.querySelector('[name="name"]').value,
      'tier': form.querySelector('[name="tier"]').value
    });
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

  document.getElementById('email-button').addEventListener('click',()=>{
    base.authWithPassword({
      email    : document.querySelector('[name="email"]').value,
      password : document.querySelector('[name="password"]').value
    },(error, authData)=> {
      if (error) {
        console.log('Login Failed!', error);
        base.createUser({
          email    : document.querySelector('[name="email"]').value,
          password : document.querySelector('[name="password"]').value
        },(error, authData)=> {
          if (error) {
            console.log('User creation failed!', error);
          } else {
            base.authWithPassword({
              email    : document.querySelector('[name="email"]').value,
              password : document.querySelector('[name="password"]').value
            },(error, authData)=> {
              if (error) {
                console.log('Login Failed!', error);
              } else {}
            });
          }
        });
      } else {}
    });
  });

  /**
   * logging out after clicking on #logout
   */
  document.getElementById('logout').addEventListener('click',()=>{
    console.log('logging out');
    base.unauth();
  });
})();
