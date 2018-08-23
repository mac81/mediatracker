export const getSearchResultApi = query =>
  fetch(`/.netlify/functions/search?query=${query}`, {
    method: 'GET',
    headers: {'content-type': 'application/json'},
  })
    .then(response => response.json())
    .then(json => json.payload);
