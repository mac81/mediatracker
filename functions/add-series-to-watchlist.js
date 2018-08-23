var MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = `mongodb+srv://thomasw:${encodeURIComponent(
  'Mac173173'
)}@watchit-3nncd.mongodb.net/test?retryWrites=true`; // or Atlas connection string
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

function queryDatabase(db, context) {
  console.log('=> query database');
  return db
    .collection('users')
    .update({userId: 1}, {userId: 1, name: 'Ted', age: 50}, {upsert: true})
    .then(() => {
      return {statusCode: 200, body: 'success'};
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return {statusCode: 500, body: 'error'};
    });
}

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(context.clientContext);
  console.log(context.clientContext && context.clientContext.user);
  connectToDatabase(MONGODB_URI)
    .then(db => queryDatabase(db, context))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};
