import connectToDatabase from './utils/connect-db';
import {getUser} from './utils/get-user';

const queryDatabase = (db, user) => {
  console.log('=> query database');

  return db
    .collection('users')
    .findOne({userId: user.exp})
    .then(user => {
      return {statusCode: 200, body: JSON.stringify({series: user.series})};
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return {statusCode: 500, body: 'error'};
    });
};

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = getUser(context);

  connectToDatabase()
    .then(db => queryDatabase(db, user))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};
