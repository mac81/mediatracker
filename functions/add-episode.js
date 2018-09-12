import connectToDatabase from './utils/connect-db';
import {getUser} from './utils/get-user';

const queryDatabase = (db, user, payload) => {
  console.log('=> query database');

  const {seriesId, episodeId, seasonNumber} = payload;

  return db
    .collection('users')
    .updateOne(
      {userId: user.email},
      {
        $addToSet: {
          episodes: {id: episodeId, series_id: seriesId, season_number: seasonNumber},
        },
      }
    )
    .then(test => {
      return {statusCode: 200, body: JSON.stringify({episodeId})};
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return {statusCode: 500, body: 'error'};
    });
};

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = getUser(context);

  const payload = JSON.parse(event.body);

  connectToDatabase()
    .then(db => queryDatabase(db, user, payload))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};
