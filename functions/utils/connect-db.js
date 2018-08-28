var MongoClient = require('mongodb').MongoClient;

let cachedDb = null;

export default function connectToDatabase(uri) {
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
