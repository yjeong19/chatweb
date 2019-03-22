const url = 'http://localhost:8080';

export const text = (payload) => {
  return fetch(`/5c724cd94a9471812e307eb3`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
};
