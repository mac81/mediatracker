import faunadb from 'faunadb';

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: 'fnAC4iU94rACDRtzYeM1tjfh_l8nEaGmifyFd6fe',
});

exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  console.log(JSON.stringify(context));
  const data = JSON.parse(event.body);
  console.log('Function `add-series-to-watchlist` invoked', data);
  const series = {
    data: data,
  };
  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref('classes/series'), series))
    .then(response => {
      console.log('success', response);
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(context),
      });
    })
    .catch(error => {
      console.log('error', error);
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
