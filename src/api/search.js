export const getSearchResultApi = query =>
  fetch(`http://localhost:3003/api/search?query=${query}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(response => response.json())
    .then(json => json.payload);