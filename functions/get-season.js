// import fetch from 'node-fetch';
// import {config} from '../config';

// exports.handler = (event, context, callback) => {
//   const {apiRoot, apiKey, apiLanguage} = config;

//   fetch(
//     `${apiRoot}tv/${event.queryStringParameters.id}/season/${
//       event.queryStringParameters.seasonNumber
//     }?api_key=${apiKey}`
//   )
//     .then(res => res.json())
//     .then(json => {
//       return callback(null, {
//         statusCode: 200,
//         body: JSON.stringify({
//           payload: json,
//         }),
//       });
//     })
//     .catch(error => {
//       console.log('error', error);
//       /* Error! return the error with statusCode 400 */
//       return callback(null, {
//         statusCode: 400,
//         body: JSON.stringify(error),
//       });
//     });
// };

import fetch from 'node-fetch';
import connectToDatabase from './utils/connect-db';
import getUserCollection from './queries/getUserCollection';
import getUser from './utils/get-user';
import {config} from '../config';

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = getUser(context);

  connectToDatabase()
    .then(db => getUserCollection(db, user))
    .then(result => {
      console.log('=> returning result: ', result);

      const {apiRoot, apiKey, apiLanguage} = config;

      const payload = JSON.parse(result.body);

      fetch(
        `${apiRoot}tv/${event.queryStringParameters.id}/season/${
          event.queryStringParameters.seasonNumber
        }?api_key=${apiKey}`
      )
        .then(res => res.json())
        .then(season => {
          const newEpisodes = season.episodes.map(e => {
            const userEpisode = !!payload.episodes.find(ep => ep.id === e.id);
            e.watched = userEpisode;
            return e;
          });

          return callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              payload: Object.assign({episodes: newEpisodes}, season),
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
