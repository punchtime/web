// todo: require d3 and d3-timeline
let Firebase = require('firebase');
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

let company = {
  "name": "my-company",
  "id": "-KBdSPf90dvJCeH3J8m7"
};

let addEmployees = employees => {
  for (let i in employees) {
    if (employees.hasOwnProperty(i)) {
      let employee = document.createElement('div');
      employee.classList.add('employee');

      let image = document.createElement('img');
      image.src = "/src/img/favicon/favicon-96x96.png"; //todo: real image
      image.alt = employees[i].name;
      image.classList.add('employee--image');
      employee.appendChild(image);

      let name = document.createElement('p');
      name.classList.add('employee--name');
      name.innerHTML = employees[i].name;
      employee.appendChild(name);

      let status = document.createElement('span');
      status.title= "status "+/*employees[i].status*/'good';
      status.classList.add('status');
      // todo: add status
      status.classList.add('status__'+/*employees[i].status*/'good');
      employee.appendChild(status);

      let shadow = document.createElement('div');
      shadow.classList.add('👻');

      document.querySelector('.employee-container').appendChild(employee);
      document.querySelector('.employee-container').appendChild(shadow);
    }
  }
};

let getEmployees = (id,myCallback) => {
  let employees = [];

  base.child('companies').child(id).child('employees').once('value',snapshot=>{
    let baseEmployees = snapshot.val();
    for (let i in baseEmployees) {
      if (baseEmployees.hasOwnProperty(i)) {
        base.child('users').child(i).once('value',snap=>{
          employees.push(snap.val());
          myCallback(employees);
        });
      }
    }
  });
};

getEmployees(company.id,addEmployees);

google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        let container = document.getElementById('timeline');
        let chart = new google.visualization.Timeline(container);
        let dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'President' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows([
          [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
          [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
          [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);

        chart.draw(dataTable);
      }
