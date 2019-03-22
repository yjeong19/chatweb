const url = 'http://localhost:8080';

export const getAllRooms = () => {
    return fetch(`${url}/room`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
};

export const getUserRooms = (user_id) => {
  return fetch(`${url}/rooms?user_id=${user_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
};

export const joinChat = (payload) => {
  console.log(payload);
  return fetch(`${url}/joinChat`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room_id: payload.room_id,
    })
  })
};

export const getMessages = (payload) => {
  // console.log(payload.room_id);
  return fetch(`${url}/messages?room_id=${payload}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
};

export const postMessage = (payload) => {
  return fetch(`${url}/messages`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: payload.message,
      username: payload.username,
    })
  })
};

export const createChat = (payload) => {
  console.log(payload);
  return fetch(`${url}/createChat?user_id=${payload.user_id}`, {
    method: 'GET', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
}
