import {MongoClient} from 'mongodb';
import config from '../../config';

let cachedDb = null;

export default function connectToDatabase() {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(
    config.databaseUrl,
    {useNewUrlParser: true}
  ).then(database => {
    cachedDb = database.db('test');
    return cachedDb;
  });
}
