//import fetch from 'node-fetch';
import connectToDatabase from './utils/connect-db';
import getUserCollection from './queries/getUserCollection';
import getUser from './utils/get-user';
import {config} from '../config';
import wretch from 'wretch';

wretch().polyfills({
  fetch: require('node-fetch'),
});

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = getUser(context);

  connectToDatabase()
    .then(db => getUserCollection(db, user))
    .then(result => {
      console.log('=> returning result: ', result);

      const {apiRoot, apiKey, apiLanguage} = config;

      const payload = JSON.parse(result.body);

      wretch(`${apiRoot}tv/${event.queryStringParameters.id}?api_key=${apiKey}`)
        .get()
        .json(json => {
          const inCollection = payload.series && !!payload.series.find(series => series.id === json.id);

          return callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              payload: {
                details: Object.assign({isInCollection: inCollection}, json),
              },
            }),
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
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};
