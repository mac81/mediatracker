var MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = `mongodb+srv://thomasw:Mac173173@watchit-3nncd.mongodb.net/test?retryWrites=true`; // or Atlas connection string
let cachedDb = null;

function connectToDatabase(uri) {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(
    uri,
    {useNewUrlParser: true}
  ).then(database => {
    cachedDb = database.db('test');
    return cachedDb;
  });
}

function queryDatabase(db, user) {
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
}

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  //const {user} = context && context.clientContext;
  const user = {
    exp: 1,
  };

  connectToDatabase(MONGODB_URI)
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
