//localhost. dev server
const url = 'http://localhost:8080';

export const newChat = (info) => {
  // console.log(info);
  return fetch(`${url}/room`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: info.username,
      user_id: info.id,
    })
  })
};
