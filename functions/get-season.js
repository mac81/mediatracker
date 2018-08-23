import fetch from 'node-fetch';

import {config} from '../config';

exports.handler = (event, context, callback) => {
  const {apiRoot, apiKey, apiLanguage} = config;

  fetch(
    `${apiRoot}tv/${event.queryStringParameters.id}/season/${
      event.queryStringParameters.seasonNumber
    }?api_key=${apiKey}`
  )
    .then(res => res.json())
    .then(json => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          payload: json,
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
};
