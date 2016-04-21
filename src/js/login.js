let Firebase = require('firebase');
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

let auth = base.getAuth();

if (auth) {
  console.log('logged in with: '+auth.uid);
  location.href = '/dashboard/';
} else {
  console.log('not logged in');
}

/**
 * redirect on good login
 */
base.onAuth(authData=>{
  if (authData) {
    console.log('logged in with: '+authData.uid);
    location.href = '/dashboard/';
  } else {
    console.log('not logged in');
  }
});

/**
 * logging in and out
 */
(()=>{

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
        console.warn('Login Failed!', error);
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
    },(error)=> {
      if (error) {
        console.log('Login Failed!', error);
        base.createUser({
          email    : document.querySelector('[name="email"]').value,
          password : document.querySelector('[name="password"]').value
        },(error)=> {
          if (error) {
            console.log('User creation failed!', error);
          } else {
            base.authWithPassword({
              email    : document.querySelector('[name="email"]').value,
              password : document.querySelector('[name="password"]').value
            },(error, authData)=> {
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
          }
        });
      } else {}
    });
  });

})();
