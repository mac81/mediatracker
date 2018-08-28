import {MongoClient} from 'mongodb';

let cachedDb = null;

export default function connectToDatabase() {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(
    `mongodb+srv://thomasw:Mac173173@watchit-3nncd.mongodb.net/test?retryWrites=true`,
    {useNewUrlParser: true}
  ).then(database => {
    cachedDb = database.db('test');
    return cachedDb;
  });
}
