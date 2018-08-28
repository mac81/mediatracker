import fetch from 'node-fetch';
import * as Vibrant from 'node-vibrant';

import {config} from '../config';

exports.handler = (event, context, callback) => {
  const {apiRoot, apiKey, apiLanguage} = config;

  fetch(`${apiRoot}movie/${event.queryStringParameters.id}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(json => {
      // Vibrant.from(`https://image.tmdb.org/t/p/w1280/${json.poster_path}`).getPalette((err, palette) => {
      //   const swatch = {
      //     swatch: palette,
      //   };

      fetch(`http://www.websirius.com/.netlify/functions/get-user-collection`, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
      })
        .then(response => response.json())
        .then(collection => {
          const inCollection = Boolean(collection.movies && collection.movies.find(series => series.id === json.id));

          return callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              payload: {
                details: Object.assign({isInCollection: inCollection}, json),
              },
            }),
          });
        });

      // });
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
