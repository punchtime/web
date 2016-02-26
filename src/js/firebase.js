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
      "latitude": form.querySelector('[name="latitude"]').value,
      "longitude": form.querySelector('[name="longitude"]').value,
      "note": form.querySelector('[name="note"]').value,
      "time": form.querySelector('[name="time"]').value,
      "type": form.querySelector('[name="type"]').value,
      "user": form.querySelector('[name="user"]').value
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
        "name": form.querySelector('[name="name"]').value,
        "employee": {
          [employee]:true
        }
      });
    }
    if (employer) {
      base.child('users').push({
        "name": form.querySelector('[name="name"]').value,
        "employer": {
          [employer]:true
        }
      });
    }
    if (employer && employee) {
      base.child('users').push({
        "name": form.querySelector('[name="name"]').value,
        "employee": {
          [employee]:true
        },
        "employer": {
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
