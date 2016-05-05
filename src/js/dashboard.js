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
  console.log('logged in with: ' + auth.uid);
  setTitle();
} else {
  console.warn('not logged in');
  location.href = '/login/';
}

let pulses = []; // the graph is made from this object

const addEmployee = (employee) => {
  let employeePulses = [];
  for (let pulse in employee.pulses) {
    if (employee.pulses.hasOwnProperty(pulse)) {
      base.child('pulses').child(pulse).once('value', (snap) => {
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
            confirmed: parseBool(snap.val().confirmed)
          });
          drawChart();
        } catch (e) {
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
  empl.innerHTML = html `
<img src="${image}" alt="${name}" class="employee--image">
<p class="employee--name">${name}</p>
<span title="status ${status}" class="status status__${status}">${status}</span>`;
  document.querySelector('.employee-container').appendChild(empl);

  empl.addEventListener('click', () => {
    addOverview(employeePulses,employee)
  });

  let flexfix = document.createElement('div');
  flexfix.classList.add('👻');
  document.querySelector('.employee-container').appendChild(flexfix);
};

let addOverview = (pulses,employee) => {
  let overview = document.createElement('div');
  overview.classList.add('overview');
  let overviewContent = document.createElement('div');
  overviewContent.classList.add('overview--content');
  overviewContent.innerHTML = html `<h2 class="overview--title">${employee.name}</h2>`;
  let timeline = document.createElement('div');
  timeline.classList.add('timeline');
  // todo: take day in account
//   timeline.innerHTML = html `
// <div class="timeline--item timeline--item__day">
//   <h3>Thursay, 28 April</h3>
// </div>`;

  for (let i in pulses) {
    addToTimeline(pulses[i],pulses[i-1],timeline);
  }

  overviewContent.appendChild(timeline);
  overview.appendChild(overviewContent);

  document.body.insertBefore(overview, document.querySelector('.employees'));
  overview.addEventListener('click', (e) => {
    if (e.target.classList.contains('overview')) {
      e.target.parentNode.removeChild(e.target);
    } else if (e.target.parentNode.classList.contains('timeline--item__still')) {
      toggleStatus(e.target.parentNode);
    } else if (e.target.classList.contains('timeline--item__still')) {
      toggleStatus(e.target);
    }
  });
};

let parseBool = (string) {
  if (string === 'true' || string === true) {
    return true;
  } else {
    return false;
  }
}

let addToTimeline = (current, previous, timeline) => {
  if (previous) {
    let diff = new Date(current.checkin - previous.checkout);
    timeline.innerHTML += html `
<div class="timeline--item timeline--item__travel timeline--item__bad">
  <div class="duration"><span>${diff.getHours() - 1}h ${diff.getMinutes() + Math.round(diff.getSeconds() / 60)}m</span></div>
</div>`;
  }
  timeline.innerHTML += html `
<div class="timeline--item timeline--item__still timeline--item__${current.confirmed ? '' : 'un'}confirmed" data-pulse="${current.id}">
  <h4>${current.address}</h4>
  <p class="timeline--item__note">${current.note}<p>
  <div class="duration">
    <time datetime="${current.checkin.toISOString()}">${current.checkin.getHours()}:${current.checkin.getMinutes() < 10 ? 0 : ''}${current.checkin.getMinutes()}</time><span class="duration--arrow">→</span>
    <time datetime="${current.checkout.toISOString()}">${current.checkout.getHours()}:${current.checkout.getMinutes() < 10 ? 0 : ''}${current.checkout.getMinutes()}</time>
  </div>
</div>`;
};

let toggleStatus = (element) => {
  if (element.classList.contains('timeline--item__unconfirmed')) {
    element.classList.remove('timeline--item__unconfirmed');
    element.classList.add('timeline--item__confirmed');
    base.child('pulses')
      .child(element.dataset.pulse)
      .child('confirmed')
      .set('true');
  } else if (element.classList.contains('timeline--item__confirmed')) {
    element.classList.remove('timeline--item__confirmed');
    element.classList.add('timeline--item__unconfirmed');
    base.child('pulses')
      .child(element.dataset.pulse)
      .child('confirmed')
      .set('false');
  }
};

let getEmployees = (id, callback) => {
  base.child('companies').child(id).child('employees').on('child_added', (snapshot) => {
    base.child('users').child(snapshot.key()).once('value', (snap) => {
      callback(snap.val());
    });
  });
};

getEmployees(JSON.parse(localStorage.punchtime).company.id, addEmployee);

const drawChart = () => {
  let chart = new google.visualization.Timeline(document.getElementById('timeline'));
  let dataTable = new google.visualization.DataTable();

  dataTable.addColumn({
    type: 'string',
    id: 'employee'
  });
  dataTable.addColumn({
    type: 'string',
    id: 'note'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'Start'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'End'
  });
  dataTable.addRows(pulses);

  chart.draw(dataTable, {
    timeline: {
      singleColor: '#3B4358'
    }
  });
};
google.charts.load('current', {
  'packages': ['timeline']
});
google.charts.setOnLoadCallback(drawChart);

/*
 * listener on resize to reload graph
 * Will refresh the graph if there is 250 ms after a resize event
 */
var resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    drawChart();
  }, 250);
});
