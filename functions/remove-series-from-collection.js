import connectToDatabase from './utils/connect-db';

const queryDatabase = (db, user, payload) => {
  console.log('=> query database');

  const {id} = payload;

  return db
    .collection('users')
    .updateOne({userId: user.exp}, {$pull: {series: {id: id}}}, {upsert: true})
    .then(() => {
      return {statusCode: 200, body: JSON.stringify({id})};
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return {statusCode: 500, body: 'error'};
    });
};

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  //const {user} = context && context.clientContext;
  const user = {
    exp: 1,
  };

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
