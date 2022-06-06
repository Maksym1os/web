fetch("http://localhost:3000/signup", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": JSON.stringify({
    "username": "Test user",
    "email": "maxlos@gmail.com",
    "phsone": "88005553535",
    "password": "qwerty",
    "amount": "653685"
  })
}).then(response => { console.log(response); }).catch(err => { console.error(err); });


fetch("http://localhost:8000/login", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": JSON.stringify({
    "username": "Maksym_Los",
    "password": "q",
  })
}).then(response => { console.log(response); }).catch(err => { console.error(err); });


fetch("http://localhost:8000/users", {
  "method": "GET",
  "headers": {
    "content-type": "application/json"
  }
}).then(response => { console.log(response); }).catch(err => { console.error(err); });


