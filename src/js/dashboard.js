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
const addEmployee = (employee,id) => {
  let employeePulses = [];
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
          employeePulses.push({
            id: pulse,
            latitude: employee.pulses[pulse].latitude,
            longitude: employee.pulses[pulse].longitude,
            checkin: checkin,
            checkout: checkout,
            address: address,
            city: employee.pulses[pulse].addressCityCountry,
            note: employee.pulses[pulse].note,
            confirmed: parseBool(employee.pulses[pulse].confirmed),
            user: {
              id: id
            }
          });
          drawChart();
        } catch (e) {
          console.log(`/pulses/${pulse} in /users/${employee.name} has a problem.`);
        }
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
    addOverview(employeePulses, employee);
  });

  let flexfix = document.createElement('div');
  flexfix.classList.add('👻');
  document.querySelector('.employee-container').appendChild(flexfix);
};

/**
 * show the overview of an employee with a timeline
 * @param  {object} pulses   pulses of that employee
 * @param  {object} employee employee object
 */
let addOverview = (pulses, employee) => {
  let overview = document.createElement('div');
  overview.classList.add('overview');
  let overviewContent = document.createElement('div');
  overviewContent.classList.add('overview--content');
  overviewContent.innerHTML = html `<h2 class="overview--title">${employee.name}</h2>`;
  let timeline = document.createElement('div');
  timeline.classList.add('timeline');

  if (pulses.length === 0) {
    timeline.innerHTML += `<p>No checkins</p>`;
  }
  for (let i in pulses) {
    if (pulses.hasOwnProperty(i)) {
      addToTimeline(pulses[i], pulses[i - 1], timeline);
    }
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

/**
 * add a moment ot the timeline
 * @param  {object} current  the current pulse
 * @param  {object} previous the previous pulse (optional)
 * @param  {htmlnode} timeline the place where it should be added
 */
let addToTimeline = (current, previous, timeline) => {
  if (!previous || current.checkin.toLocaleDateString() !== previous.checkout.toLocaleDateString()) {
    timeline.innerHTML += html `<div class="timeline--item timeline--item__day">
  <h3>${current.checkin.toLocaleDateString()}</h3>
</div>`;
  } else if (previous) {
    let diff = new Date(current.checkin - previous.checkout);
    let diffHours = Math.round(diff.getTime() / 3600000);
    timeline.innerHTML += html `<div class="timeline--item timeline--item__travel ${'timeline--item__good'}">
  <div class="duration"><span>${diffHours > 0 ? diffHours+' h' : ''} ${diff.getMinutes() + Math.round(diff.getSeconds() / 60)} min</span></div>
</div>`;
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
      callback(snap.val(),snap.key());
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

// dragon
// https://github.com/tomhodgins/dragon
window.steps = 0;
window.necessary = 10;
document.querySelector('.header').addEventListener('click', () => {
  if (window.steps > window.necessary) {

    window.b = 0;
    window.X = 0;
    window.Y = 0;
    window.T = 0;
    window.L = 0;

    document.addEventListener("click", function(a) {
      a.preventDefault();
    }, !0);
    document.addEventListener("mousedown", c);
    document.addEventListener("touchstart", c);

    function c(a) {

      a.preventDefault();
      a.target !== document.documentElement && a.target !== document.body && (window.b = Date.now(), a.target.setAttribute("data-drag", window.b), a.target.style.position = "relative", window.T = a.target.style.top.split("px")[0] || 0, window.L = a.target.style.left.split("px")[0] || 0);
      window.X = a.clientX || a.touches[0].clientX;
      window.Y = a.clientY || a.touches[0].clientY;
    }
    document.addEventListener("mousemove", d);
    document.addEventListener("touchmove", d);

    function d(a) {
      if ("" !== window.b) {
        var e = document.querySelector('[data-drag="' + window.b + '"]');
        e.style.top = parseInt(window.T) + parseInt((a.clientY || a.touches[0].clientY) - window.Y) + "px";
        e.style.left = parseInt(window.L) + parseInt((a.clientX || a.touches[0].clientX) - window.X) + "px";
      }
    }
    document.addEventListener("mouseup", f);
    document.addEventListener("touchend", f);

    function f() {
      window.b = "";
    }
    document.addEventListener("mouseover", g);

    function g(a) {
      a.target.style.cursor = "move";
      a.target.style.boxShadow = "inset lime 0 0 1px,lime 0 0 1px";
    }
    document.addEventListener("mouseout", h);

    function h(a) {
      a.target.style.cursor = a.target.style.boxShadow = "";
    }

  } else {
    window.steps++;
  }
});
