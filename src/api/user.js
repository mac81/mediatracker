export const userLoginApi = (username, password) => {
  console.log(username, password);
  return fetch(`http://localhost:3003/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: username, password: password}),
  })
    .then(response => response.json())
    .then(json => json.payload)
    .catch(err => console.log(err));
};
