const token = sessionStorage.getItem('token');
const netlifyIdentity = require('netlify-identity-widget');

export const getSeriesApi = id => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/get-series?id=${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);
};

export const getSeasonApi = (id, seasonNumber) =>
  fetch(`/.netlify/functions/get-season?id=${id}&seasonNumber=${seasonNumber}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => json.payload);
