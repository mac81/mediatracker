const netlifyIdentity = require('netlify-identity-widget');

export const getUserCollectionApi = () => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/get-user-collection`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json);
};

export const addSeriesToCollectionApi = (id, name) => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/add-series-to-collection`, {
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

export const removeSeriesFromCollectionApi = id => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/remove-series-from-collection`, {
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

export const addEpisodeApi = (seriesId, episodeId) => {
  const user = netlifyIdentity.currentUser();
  return fetch(`/.netlify/functions/add-episode`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({seriesId, episodeId}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.error('Error:', error));
};
