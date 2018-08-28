export const getMovieApi = id =>
  fetch(`/.netlify/functions/get-movie?id=${id}`, {
    method: 'GET',
    headers: {'content-type': 'application/json'},
  })
    .then(response => response.json())
    .then(json => json.payload);
