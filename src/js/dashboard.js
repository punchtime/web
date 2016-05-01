let Firebase = require('firebase');
let html = require('./html-escaping');
let welcome = require('./welcome')();
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

let auth = base.getAuth();

const setTitle = () => {
  document.getElementById('company-name').innerHTML = JSON.parse(localStorage.punchtime).company.name;
};

// if the localstorage hasn't been set, go to settings
if (!localStorage.punchtime) {
  location.href = 'settings.html';
}

if (auth) {
  console.log('logged in with: '+auth.uid);
  setTitle();
} else {
  console.warn('not logged in');
  location.href = '/login/';
}

let pulses = []; // the graph is made from this object

// todo: put results in the right location
const geocoding = {
  req: null,
  init: function() {
    this.req = new XMLHttpRequest();
    this.req.addEventListener("load", this.listener);
  },
  listener: function() {
    var a = JSON.parse(this.response).results[0].address_components;
    console.log(a[1].long_name +' '+ a[0].long_name);
  },
  search: function(lat,lon) {
    this.req.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyA8Tawxe7x2cpGiTpvOh35xHe8dUZsjsFg");
    this.req.send();
  }
};

const addEmployee = (employee) => {
  let employeePulses = [];
  for (let pulse in employee.pulses) {
    if (employee.pulses.hasOwnProperty(pulse)) {
      base.child('pulses').child(pulse).once('value',snap=>{
        try {
          let name = employee.name,
              checkin = new Date(parseInt(snap.val().checkin)),
              note = snap.val().note,
              address = snap.val().addressStreet,
              checkout;
          if (snap.val().checkout && snap.val().checkout !== 0) {
            checkout = new Date(parseInt(snap.val().checkout));
          } else {
            checkout = new Date();
          }
          pulses.push([name, address, checkin, checkout]);
          employeePulses.push({
            id: snap.key(),
            latitude: snap.val().latitude,
            longitude: snap.val().longitude,
            checkin: new Date(parseInt(snap.val().checkin)),
            checkout: new Date(parseInt(snap.val().checkout)),
            address: snap.val().addressStreet,
            note: snap.val().note,
            confirmed: snap.val().confirmed
          });
          drawChart();
        } catch(e) {
          console.log(`/pulses/${snap.key()} in /users/${employee.name} has a problem.`);
        }
      });
    }
  }

  let image = employee.image || '/src/img/icons/empty.svg',
      name = employee.name,
      status = 'good';

  let empl = document.createElement('div');
  empl.classList.add('employee');
  // empl.dataset.id = id;
  empl.innerHTML = html`
<img src="${image}" alt="${name}" class="employee--image">
<p class="employee--name">${name}</p>
<span title="status ${status}" class="status status__${status}">${status}</span>`;
  document.querySelector('.employee-container').appendChild(empl);

  empl.addEventListener('click',()=>{
    let overview = document.createElement('div');
    overview.classList.add('overview');
    // todo: get the right pulses out of the user
    let overviewContent = document.createElement('div');
    overviewContent.classList.add('overview--content');
    overviewContent.innerHTML = html`<h2 class="overview--title">${employee.name}</h2>`;
    let timeline = document.createElement('div');
    timeline.classList.add('timeline');
    timeline.innerHTML = html`
<div class="timeline--item timeline--item__day">
  <h3>Thursay, 28 April</h3>
</div>
<div class="timeline--item timeline--item__still timeline--item__confirmed" data-pulse="-KGSNFkJ8ha5yT3sqpo7">
  <h4>Werfstraat 131</h4>
  <p class="timeline--item__note">there is some note<p>
  <div class="duration">
    <time datetime="2016-04-28T15:15:24+00:00">15:15</time><span class="duration--arrow">→</span>
    <time datetime="2016-04-28T15:30:24+00:00">15:30</time>
  </div>
</div>
<div class="timeline--item timeline--item__travel timeline--item__good">
  <div class="duration"><span>30 min</span></div>
</div>
<div class="timeline--item timeline--item__still timeline--item__unconfirmed" data-pulse="-KGSNFkJ8ha5yT3sqpo7">
  <h4>Oudeheerweg 13</h4>
  <p class="timeline--item__note">this is also a note<p>
  <div class="duration">
    <time datetime="2016-04-28T16:00:24+00:00">16:00</time><span class="duration--arrow">→</span>
    <time datetime="2016-04-28T16:30:24+00:00">16:30</time>
  </div>
</div>`;

    // todo: don't hardcode this anymore
    let previous = {
      checkout: new Date(1462022458815)
    }
    let current = {
      checkin: new Date (1462022569815),
      checkout: new Date(1462022697858),
      id: '-KGbKsOy2jwSbMK-QdFP',
      confirmed: 'true',
      note: 'bla bla bla bla',
      address: 'Gebroeders Desmetstraat 1'
    };
    let diff = new Date(current.checkin - previous.checkout);

    timeline.innerHTML += html`
<div class="timeline--item timeline--item__travel timeline--item__bad">
  <div class="duration"><span>${diff.getHours() - 1}h ${diff.getMinutes() + Math.round(diff.getSeconds() / 60)}m</span></div>
</div>
<div class="timeline--item timeline--item__still timeline--item__${current.confirmed ? '' : 'un'}confirmed" data-pulse="${current.id}">
  <h4>${current.address}</h4>
  <p class="timeline--item__note">${current.note}<p>
  <div class="duration">
    <time datetime="${current.checkin.toISOString()}">${current.checkin.getHours()}:${current.checkin.getMinutes()}</time><span class="duration--arrow">→</span>
    <time datetime="${current.checkout.toISOString()}">${current.checkout.getHours()}:${current.checkout.getMinutes()}</time>
  </div>
</div>`;
    overviewContent.appendChild(timeline);
    overview.appendChild(overviewContent);

    document.body.insertBefore(overview,document.querySelector('.employees'));
    overview.addEventListener('click',e=>{
      if (e.target.classList.contains('overview')) {
        e.target.parentNode.removeChild(e.target);
        console.log('removed');
        // todo: DRY this code
      } else if (e.target.parentNode.classList.contains('timeline--item__still')) {
        if (e.target.parentNode.classList.contains('timeline--item__unconfirmed')){
          e.target.parentNode.classList.remove('timeline--item__unconfirmed');
          e.target.parentNode.classList.add('timeline--item__confirmed');
          base.child('pulses').child(e.target.parentNode.dataset.pulse).child('confirmed').set('true');
        } else if (e.target.parentNode.classList.contains('timeline--item__confirmed')) {
          e.target.parentNode.classList.remove('timeline--item__confirmed');
          e.target.parentNode.classList.add('timeline--item__unconfirmed');
          base.child('pulses').child(e.target.parentNode.dataset.pulse).child('confirmed').set('false');
        }
      } else if (e.target.classList.contains('timeline--item__still')) {
        if (e.target.classList.contains('timeline--item__unconfirmed')){
          e.target.classList.remove('timeline--item__unconfirmed');
          e.target.classList.add('timeline--item__confirmed');
          base.child('pulses').child(e.target.dataset.pulse).child('confirmed').set('true');
        } else if (e.target.classList.contains('timeline--item__confirmed')) {
          e.target.classList.remove('timeline--item__confirmed');
          e.target.classList.add('timeline--item__unconfirmed');
          base.child('pulses').child(e.target.dataset.pulse).child('confirmed').set('false');
        }
      }
    });
  });

  let flexfix = document.createElement('div');
  flexfix.classList.add('👻');
  document.querySelector('.employee-container').appendChild(flexfix);
};

let getEmployees = (id,callback) => {
  base.child('companies').child(id).child('employees').on('child_added',snapshot=>{
    base.child('users').child(snapshot.key()).once('value',snap=>{
      callback(snap.val());
    });
  });
};

getEmployees(JSON.parse(localStorage.punchtime).company.id,addEmployee);

const drawChart = () => {
  let chart = new google.visualization.Timeline(document.getElementById('timeline'));
  let dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'employee' });
  dataTable.addColumn({ type: 'string', id: 'note' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows(pulses);

  chart.draw(dataTable,{
    timeline: { singleColor: '#3B4358' }
  });
};
google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);

/*
 * listener on resize to reload graph
 * Will refresh the graph if there is 250 ms after a resize event
 */
var resizeTimer;
window.addEventListener('resize', function(){
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    drawChart();
  }, 250);
});
