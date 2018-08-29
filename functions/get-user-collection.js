import connectToDatabase from './utils/connect-db';
import getUserCollection from './queries/getUserCollection';
import getUser from './utils/get-user';

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = getUser(context);

  connectToDatabase()
    .then(db => getUserCollection(db, user))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};
