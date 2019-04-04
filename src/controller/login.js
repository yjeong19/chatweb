// import axios fom 'axios';


//localhost. dev server
// const url = 'http://localhost:8080';
const url = 'http://chatweb-chatweb.7e14.starter-us-west-2.openshiftapps.com';



export const testing = (payload) => {
  return fetch(`${url}/test`)
};

export const login = (info) => {
  const { username, password } = info;
  console.log(username, password)
  return fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
};

export const register = (info) => {
  const { username, password, password2 } = info;
  return fetch(`${url}/register`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username, 
      password,
      password2,
    })
  })
};
