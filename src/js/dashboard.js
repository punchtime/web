// HTML Escape helper utility
var util = (function() {
  // Thanks to Andrea Giammarchi
  var
    reEscape = /[&<>'"]/g,
    reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,
    oEscape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    },
    oUnescape = {
      '&amp;': '&',
      '&#38;': '&',
      '&lt;': '<',
      '&#60;': '<',
      '&gt;': '>',
      '&#62;': '>',
      '&apos;': "'",
      '&#39;': "'",
      '&quot;': '"',
      '&#34;': '"'
    },
    fnEscape = function(m) {
      return oEscape[m];
    },
    fnUnescape = function(m) {
      return oUnescape[m];
    },
    replace = String.prototype.replace;
  return (Object.freeze || Object)({
    escape: function escape(s) {
      return replace.call(s, reEscape, fnEscape);
    },
    unescape: function unescape(s) {
      return replace.call(s, reUnescape, fnUnescape);
    }
  });
}());

// Tagged template function
var html = function(pieces) {
  var result = pieces[0];
  var substitutions = [].slice.call(arguments, 1);
  for (var i = 0; i < substitutions.length; ++i) {
    result += util.escape(substitutions[i]) + pieces[i + 1];
  }
  return result;
};

let Firebase = require('firebase');
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

const addEmployee = employee => {
  for (let pulse in employee.pulses) {
    if (employee.pulses.hasOwnProperty(pulse)) {
      base.child('pulses').child(pulse).once('value',snap=>{
        try {
          let name = employee.name,
              checkin = new Date(parseInt(snap.val().checkin)),
              note = snap.val().note,
              checkout;
          if (snap.val().checkout && snap.val().checkout !== 0) {
            checkout = new Date(parseInt(snap.val().checkout));
          } else {
            checkout = new Date();
          }
          pulses.push([name, note, checkin, checkout]);
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
  empl.innerHTML = html`
  <img src="${image}" alt="${name}" class="employee--image"><p class="employee--name">${name}</p><span title="status ${status}" class="status status__${status}">${status}</span>`;
  document.querySelector('.employee-container').appendChild(empl);
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
  let container = document.getElementById('timeline');
  let chart = new google.visualization.Timeline(container);
  let dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'employee' });
  dataTable.addColumn({ type: 'string', id: 'note' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows(pulses);

  chart.draw(dataTable,{
    timeline: { colorByRowLabel: true }
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
