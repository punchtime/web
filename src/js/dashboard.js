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


let chart = d3.timeline().stack();
let testData = [
  {label: "person a", times: [
    {"starting_time": 1355752800000, "ending_time": 1355759900000},
    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
  {label: "person b", times: [
    {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
  {label: "person c", times: [
    {"starting_time": 1355761910000, "ending_time": 1355763910000}]},
];
let svg = d3.select("#timeline")
            .append("svg")
            .attr("width", window.innerWidth - 50)
            .datum(testData).call(chart);
