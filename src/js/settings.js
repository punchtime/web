const formObj = require('form-obj');
const modal = require('modal');
let Firebase = require('firebase');
let base = new Firebase('https://scorching-inferno-1467.firebaseio.com/');

let auth = base.getAuth();

let settings = {};
let companies = {};

const setTitle = () => {
  if (localStorage.punchtime) {
    document.getElementById('company-name').innerHTML = JSON.parse(localStorage.punchtime).company.name;
  }
};

if (auth) {
  console.log('logged in with: ' + auth.uid);
  setTitle();
} else {
  console.warn('not logged in');
  location.href = '/login/';
}

document.getElementById('logout').addEventListener('click', () => {
  base.unauth();
  location.href = '/login/';
});

base.child('/users/' + auth.uid).once('value', (snapshot) => {
  settings.name = snapshot.val().name;
  document.getElementById('username').innerHTML = settings.name;
  for (let i in snapshot.val().employer) {
    if (snapshot.val().employer.hasOwnProperty(i)) {
      base.child('/companies/' + i).once('value', snap => {
        companies[i] = snap.val().name;
        document.getElementById('company').innerHTML += `<option value="${i}">${snap.val().name}</option>`;
        document.getElementById('company').value = JSON.parse(localStorage.punchtime).company.id;
      });
    }
  }
});

document.getElementById('settings').addEventListener('submit', e => {
  e.preventDefault();
  let form = formObj(e.target);
  settings.company = {
    id: form.company,
    name: companies[form.company]
  };
  localStorage.punchtime = JSON.stringify(settings);
  setTitle();
});

const addEmail = e => {
  e.preventDefault();
  num++;
  let div = document.createElement('div');
  div.innerHTML = `<input type="email" placeholder="their@email.com" name="email-${num}" data-num="${num}">`;
  let button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = '+';
  div.appendChild(button);
  e.target.parentNode.parentNode.appendChild(div);
  button.addEventListener('click', addEmail);
  e.target.parentNode.removeChild(e.target);
};

let num = 0;
document.getElementById('add').addEventListener('click', addEmail);

document.getElementById('invite').addEventListener('submit', e => {
  e.preventDefault();
  let form = formObj(e.target);

  for (let email in form) {
    if (form.hasOwnProperty(email) && form[email]) {
      console.log({
        claimed: 'false',
        company: JSON.parse(localStorage.punchtime).company.id,
        email: form[email]
      });
      base.child('invites').push({
        claimed: 'false',
        company: {
          id: JSON.parse(localStorage.punchtime).company.id,
          name: JSON.parse(localStorage.punchtime).company.name
        },
        email: form[email]
      });
    }
  }

  e.target.reset();
  modal('Your employees now got an email with instructions',()=>{},()=>{});
});
