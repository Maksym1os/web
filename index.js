fetch("http://localhost:8000/signup", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": JSON.stringify({
    "username": "Vova Kuchkovskiy",
    "email": "лuchkovskiy@gmail.com",
    "phone": "05473456783",
    "password": "qwerty",
    "amount": "99999999999"
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


