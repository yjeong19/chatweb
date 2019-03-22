// import axios fom 'axios';


//localhost. dev server
const url = 'http://localhost:8080';


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
