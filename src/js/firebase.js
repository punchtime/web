/**
 * Firebase setup
 */
// require('./scripts');
var Firebase = require('firebase');
var tableify = require('tableify');
var base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

/**
 * testing out firebase code
 * @todo remove when real code is written
 */
(()=>{
  var table;
  base.child('/').on('value', (snapshot) => {
    table = tableify(snapshot.val());
    document.getElementById('table').innerHTML = table;
  });

  // https://www.firebase.com/docs/web/guide/saving-data.html
  // base.child('companies/test-company').set({"tier":"paid"});
})();

(()=>{
  let form = document.getElementById('form');
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
  });
})();
