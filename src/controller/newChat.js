//localhost. dev server
const url = 'http://localhost:8080';
// const url = "https://secure-chatweb.7e14.starter-us-west-2.openshiftapps.com";

export const newChat = info => {
  // console.log(info);
  return fetch(`${url}/room`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: info.username,
      user_id: info.id
    })
  });
};
