export const getUserCollectionApi = () =>
  fetch(`/.netlify/functions/get-user-collection`, {
    method: 'GET',
    headers: {'content-type': 'application/json'},
  })
    .then(response => response.json())
    .then(json => json);
