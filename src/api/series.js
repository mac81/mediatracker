const token = sessionStorage.getItem('token');
const netlifyIdentity = require('netlify-identity-widget');

export const getSeriesDetailsApi = id =>
  fetch(`/.netlify/functions/get-series?id=${id}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => json.payload);

export const getSeasonApi = (id, seasonNumber) =>
  fetch(`/.netlify/functions/get-season?id=${id}&seasonNumber=${seasonNumber}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => json.payload);

export const getSeasonCollectionApi = (id, seasonNumber) =>
  fetch(`http://localhost:3003/api/collection/series/${id}/season/${seasonNumber}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);

export const getUserSeriesApi = () =>
  fetch(`http://localhost:3003/api/collection/series`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);

export const addSeriesToWatchlistApi = (id, name) => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/add-series-to-watchlist`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id, name}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.error('Error:', error));
};

export const removeSeriesFromWatchlistApi = id => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/remove-series-from-watchlist`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.error('Error:', error));
};

export const addEpisodeApi = (id, episodeId) =>
  fetch(`http://localhost:3003/api/collection/series/${id}/${episodeId}`, {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);

export const removeEpisodeApi = (id, episodeId) =>
  fetch(`http://localhost:3003/api/collection/series/${id}/${episodeId}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);
