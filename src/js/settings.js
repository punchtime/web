"use strict";

const formObj = require('form-obj');
const modal = require('modal');
require('./welcome')();
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

if (localStorage.punchtime) {
  base.child('companies/' + JSON.parse(localStorage.punchtime).company.id).on('value', snapshot => {
    try {
      document.getElementById('contact-email').value = snapshot.val().contact.email || '';
      document.getElementById('contact-phone').value = snapshot.val().contact.phone || '';
      document.getElementById('contact-note').value = snapshot.val().contact.note || '';
    } catch (e) { /*don't care*/ }
  });
}

try {
  document.getElementById('contact').addEventListener('submit', e => {
    e.preventDefault();
    let form = formObj(e.target);
    base.child('companies/' + JSON.parse(localStorage.punchtime).company.id + '/contact').set(form)
      .then(() => {
        modal('Settings saved', () => {}, () => {});
      });
  });
} catch (e) {}

if (auth) {
  console.log('logged in with: ' + auth.uid);
  setTitle();
  if (document.getElementById('invite') && localStorage.punchtime) {
    base.child('companies')
      .child(JSON.parse(localStorage.punchtime).company.id)
      .child('employees')
      .once('value')
      .then((s) => {
        if (s.numChildren() === 0) {
          modal(`You don't have any employees yet, try inviting them`, () => {
            location.href = '#invite';
          }, () => {});
        }
      });
  }
  base.child('users')
    .child(auth.uid)
    .child('employer')
    .once('value')
    .then((s) => {
      if (s.numChildren() === 0 && location.pathname === '/dashboard/settings.html') {
        modal("You don't have any company yet. Let's make one", () => {
          location.href = 'create.html';
        }, () => {});
      }
    });

} else {
  console.warn('not logged in');
  location.href = '/login/';
}

try {
  document.getElementById('logout').addEventListener('click', () => {
    base.unauth();
    localStorage.punchtime = '';
    location.href = '/login/';
  });
} catch (e) {}

if (document.getElementById('username')) {
  base.child('/users/' + auth.uid).once('value', (snapshot) => {
    settings.name = snapshot.val().name;
    document.getElementById('username').innerHTML = settings.name;
    if (document.getElementById('company')) {
      for (let i in snapshot.val().employer) {
        if (snapshot.val().employer.hasOwnProperty(i)) {
          base.child('/companies/' + i).once('value', snap => {
            companies[i] = snap.val().name;
            document.getElementById('company').innerHTML += `<option value="${i}">${snap.val().name}</option>`;
            document.getElementById('company').value = JSON.parse(localStorage.punchtime).company.id;
          });
        }
      }
    }
  });
}

try {
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
} catch (e) {}

let num = 0;
const addEmail = (e) => {
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

try {
  document.getElementById('add').addEventListener('click', addEmail);
} catch (e) {}

try {
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
    modal('Your employees now got an email with instructions', () => {}, () => {});
  });
} catch (e) {}

try {
  document.getElementById('create').addEventListener('submit', e => {
    e.preventDefault();
    let form = formObj(e.target);

    if (form.name) {
      // create the new company
      base.child('companies').push({
        name: form.name,
        tier: 'free'
      }).then((s) => {
        let companyKey = s.key();
        let companyName = form.name;
        // put this new company as your company
        base.child('users')
          .child(auth.uid)
          .child('employer')
          .child(companyKey)
          .set(true);

        // set the newly created company in localStorage
        var ls = JSON.parse(localStorage.punchtime);
        ls.company = {
          id: companyKey,
          name: companyName
        };
        localStorage.punchtime = JSON.stringify(ls);

        // invite employees
        for (let email in form) {
          if (form.hasOwnProperty(email) && form[email]) {
            base.child('invites').push({
              claimed: 'false',
              company: {
                id: companyKey,
                name: companyName
              },
              email: form[email]
            });
          }
        }

        // form finished
        e.target.reset();
        modal('Thanks, your employees now got an email', () => {
          location.href = '/dashboard';
        }, () => {});
      });


    } else {
      modal('you didn\'t fill in a name', () => {}, () => {});
    }
  });
} catch (e) {}
