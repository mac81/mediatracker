const token = sessionStorage.getItem('token');

export const getSeriesDetailsApi = id =>
  fetch(`http://localhost:3003/api/tv/${id}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  })
    .then(response => response.json())
    .then(json => json.payload);

export const getSeasonApi = (id, seasonNumber) =>
  fetch(`http://localhost:3003/api/tv/${id}/season/${seasonNumber}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
    },
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

export const addToWatchlistApi = id =>
  fetch(`http://localhost:3003/api/tv/${id}`, {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);

export const removeFromWatchlistApi = id =>
  fetch(`http://localhost:3003/api/tv/${id}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json.payload);

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
