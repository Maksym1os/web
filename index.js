fetch("http://localhost:3000/signup", {
  "method": "POST",
  "headers": {
    "user-agent": "vscode-restclient",
    "content-type": "application/json"
  },
  "body": {
    "username": "Maksym_Los",
    "email": "maxlos@gmail.com",
    "phone": "88005553535",
    "password": "qwerty",
    "amount": "1000"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});

fetch("http://localhost:3000/login", {
  "method": "POST",
  "headers": {
    "user-agent": "vscode-restclient",
    "content-type": "application/json"
  },
  "body": {
    "username": "Maksym_Los",
    "password": "qwerty"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});

fetch("http://localhost:3000/users", {
  "method": "GET",
  "headers": {
    "user-agent": "vscode-restclient",
    "content-type": "application/json",
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZlbHljaGtvdnljaCIsImlhdCI6MTY1NDExMjE4MH0.ZqWi2uxEcFrJdxZm8KILwfkVoJqfd0VYP6biZY2xtRc"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});