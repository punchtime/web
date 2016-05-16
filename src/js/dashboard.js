"use strict";
let Firebase = require('firebase');
let html = require('./html-escaping');
require('./welcome')();
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

let auth = base.getAuth();

const setTitle = () => {
  document.getElementById('company-name').innerHTML = JSON.parse(localStorage.punchtime).company.name;
};

// if the localstorage hasn't been set, go to settings
if (!localStorage.punchtime) {
  location.href = 'settings.html';
} else {
  base
    .child('companies')
    .child(JSON.parse(localStorage.punchtime).company.id)
    .child('employees')
    .once('value')
    .then((s) => {
      if (s.numChildren() === 0) {
        location.href = 'settings.html';
      }
    });
}

if (auth) {
  console.log('logged in with: ' + auth.uid);
  setTitle();
} else {
  console.warn('not logged in');
  location.href = '/login/';
}

/**
 * parse a string as a boolean
 * @param  {string} string what you want to parse
 * @return {boolean}        true of string is 'true' or true, false otherwise
 */
let parseBool = (string) => {
  if (string === 'true' || string === true) {
    return true;
  } else {
    return false;
  }
};

let pulses = []; // the graph is made from this object

/**
 * add an employee to the dashboard
 * 1. his face in a card
 * 2. popup for that card
 * 3. history view in timeline
 * @param  {object} employee the employee
 * @param  {string} id       its uid
 */
const addEmployee = (employee, id) => {
  let image = employee.image || '/src/img/icons/empty.svg',
    name = employee.name,
    status = 'good';

  let empl = document.createElement('div');
  empl.classList.add('employee');
  empl.dataset.id = id;
  empl.innerHTML = html `
<img src="${image}" alt="${name}" class="employee--image">
<p class="employee--name">${name}</p>
<span title="status ${status}" class="status status__${status}">${status}</span>`;
  document.querySelector('.employee-container').appendChild(empl);

  empl.addEventListener('click', () => {
    addOverview(employee, id);
  });

  let flexfix = document.createElement('div');
  flexfix.classList.add('👻');
  document.querySelector('.employee-container').appendChild(flexfix);

  // todo: make this into a different function
  for (let pulse in employee.pulses) {
    if (employee.pulses.hasOwnProperty(pulse) && employee.pulses[pulse].employer === JSON.parse(localStorage.punchtime).company.id) {
      try {
        let name = employee.name,
          checkin = new Date(parseInt(employee.pulses[pulse].checkin)),
          address = employee.pulses[pulse].addressStreet,
          checkout;
        if (employee.pulses[pulse].checkout && employee.pulses[pulse].checkout !== 0) {
          checkout = new Date(parseInt(employee.pulses[pulse].checkout));
        } else {
          checkout = new Date();
        }
        pulses.push([name, address, checkin, checkout]);
        drawChart();
      } catch (e) {
        console.log(`/pulses/${pulse} in /users/${employee.name} has a problem.`);
      }
    }
  }
};

/**
 * show the overview of an employee with a timeline
 * @param  {object} pulses   pulses of that employee
 * @param  {object} employee employee object
 * @param  {string} id       the employee id
 */
let addOverview = (employee, id) => {
  let overview = document.createElement('div');
  overview.classList.add('overview');
  let overviewContent = document.createElement('div');
  overviewContent.classList.add('overview--content');
  overviewContent.innerHTML = html `<h2 class="overview--title">${employee.name}</h2>`;
  let timeline = document.createElement('div');
  timeline.classList.add('timeline');

  base.child('users')
    .child(id)
    .child('pulses')
    .on('child_added', (snap,prev) => {
      let current = {
        id: snap.key(),
        latitude: snap.val().latitude,
        longitude: snap.val().longitude,
        checkin: new Date(parseInt(snap.val().checkin)),
        checkout: new Date(parseInt(snap.val().checkout)),
        address: snap.val().addressStreet,
        city: snap.val().addressCityCountry,
        note: snap.val().note,
        confirmed: parseBool(snap.val().confirmed),
        user: {
          id: id
        }
      };
      if (prev) {
        base.child('users')
          .child(id)
          .child('pulses')
          .child(prev)
          .child('checkout')
          .once('value')
          .then((snapshot)=>{
            addToTimeline(current, {
              checkout: new Date(parseInt(snapshot.val())),
            }, timeline);
          })
      } else {
        addToTimeline(current, false, timeline);
      }
    });


  // if (pulses.length === 0) {
  //   timeline.innerHTML += `<p>No checkins</p>`;
  // }

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

/**
 * add a moment ot the timeline
 * @param  {object} current  the current pulse
 * @param  {object} previous the previous pulse (optional)
 * @param  {htmlnode} timeline the place where it should be added
 */
let addToTimeline = (current, previous, timeline) => {
  console.log(current);
  let addDate = () => {
    timeline.innerHTML += html `<div class="timeline--item timeline--item__day">
  <h3>${current.checkin.toLocaleDateString()}</h3>
</div>`;
  };
  if (previous) {
    let diff = new Date(current.checkin - previous.checkout);
    let diffHours = Math.round(diff.getTime() / 3600000);
    timeline.innerHTML += html `<div class="timeline--item timeline--item__travel ${'timeline--item__good'}">
  <div class="duration"><span>${diffHours > 0 ? diffHours+' h' : ''} ${diff.getMinutes() + Math.round(diff.getSeconds() / 60)} min</span></div>
</div>`;
  }
  if (!previous) {
    addDate();
  } else if (current.checkin.toLocaleDateString() !== previous.checkout.toLocaleDateString()) {
    addDate();
  }
  timeline.innerHTML += html `
<div class="timeline--item timeline--item__still timeline--item__${current.confirmed ? '' : 'un'}confirmed" data-pulse="${current.id}" data-user="${current.user.id}">
  <h4>${current.address}</h4>
  <p class="timeline--item__city">${current.city}</p>
  <p class="timeline--item__note">${current.note}</p>
  <div class="duration">
    <time datetime="${current.checkin.toISOString()}">${current.checkin.getHours()}:${current.checkin.getMinutes() < 10 ? 0 : ''}${current.checkin.getMinutes()}</time><span class="duration--arrow">→</span>
    <time datetime="${current.checkout.toISOString()}">${current.checkout.getHours()}:${current.checkout.getMinutes() < 10 ? 0 : ''}${current.checkout.getMinutes()}</time>
  </div>
</div>`;
};

/**
 * click handler to toggle the confirmed status
 * @param  {htmlnode} element clicked element
 */
let toggleStatus = (element) => {
  if (element.classList.contains('timeline--item__unconfirmed')) {
    element.classList.remove('timeline--item__unconfirmed');
    element.classList.add('timeline--item__confirmed');
    base.child('users')
      .child(element.dataset.user)
      .child('pulses')
      .child(element.dataset.pulse)
      .child('confirmed')
      .set('true');
  } else if (element.classList.contains('timeline--item__confirmed')) {
    element.classList.remove('timeline--item__confirmed');
    element.classList.add('timeline--item__unconfirmed');
    base.child('users')
      .child(element.dataset.user)
      .child('pulses')
      .child(element.dataset.pulse)
      .child('confirmed')
      .set('false');
  }
};

/**
 * get all the employees once
 * @param  {string}   id       your company id
 * @param  {function} callback what should be called after running (addEmployee)
 */
let getEmployees = (id, callback) => {
  base.child('companies').child(id).child('employees').on('child_added', (snapshot) => {
    base.child('users').child(snapshot.key()).once('value', (snap) => {
      callback(snap.val(), snap.key());
    });
  });
};

getEmployees(JSON.parse(localStorage.punchtime).company.id, addEmployee);

/**
 * draw a new timeline chart
 * can also be used to redraw the chart
 */
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
