const netlifyIdentity = require('netlify-identity-widget');

export const getSeriesApi = id => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/get-series?id=${id}`, {
    method: 'GET',
    headers: {
      ...(user && {Authorization: `Bearer ${user.token.access_token}`}),
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);
};

export const getSeasonApi = (id, seasonNumber) => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/get-season?id=${id}&seasonNumber=${seasonNumber}`, {
    method: 'GET',
    headers: {
      ...(user && {Authorization: `Bearer ${user.token.access_token}`}),
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);
};

export const addEpisodeApi = (seriesId, episodeId, seasonNumber) => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/add-episode`, {
    method: 'POST',
    headers: {
      ...(user && {Authorization: `Bearer ${user.token.access_token}`}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({seriesId, episodeId, seasonNumber}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.error('Error:', error));
};

export const removeEpisodeApi = (seriesId, episodeId) => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/remove-episode`, {
    method: 'DELETE',
    headers: {
      ...(user && {Authorization: `Bearer ${user.token.access_token}`}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({seriesId, episodeId}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.error('Error:', error));
};

export const addAllEpisodesApi = seriesId => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/add-all-episodes`, {
    method: 'POST',
    headers: {
      ...(user && {Authorization: `Bearer ${user.token.access_token}`}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({seriesId}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.error('Error:', error));
};
