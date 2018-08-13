export const getMovieDetailsApi = id =>
  fetch(`http://localhost:3003/api/movies/${id}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(response => response.json())
    .then(json => json.payload);