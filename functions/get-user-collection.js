import connectToDatabase from './utils/connect-db';
import getUserCollection from './queries/getUserCollection';
import getUser from './utils/get-user';
import {config} from '../config';
import fetch from 'node-fetch';

async function fetchSeries(series) {
  const {apiRoot, apiKey, apiLanguage} = config;

  try {
    const data = await Promise.all(
      series.map(s => {
        return fetch(`${apiRoot}tv/${s.id}?api_key=${apiKey}`).then(response => response.json());
      })
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = getUser(context);

  connectToDatabase()
    .then(db => getUserCollection(db, user))
    .then(result => {
      console.log('=> returning result: ', result);

      const payload = JSON.parse(result.body);

      const apiSeries = fetchSeries(payload.series);

      apiSeries.then(series => {
        const newSeries = series.map(s => {
          const userSeries = payload.series.find(ps => ps.id === s.id);
          if (userSeries && userSeries.episodes) {
            s.watchedEpisodesCount = userSeries.episodes.length;
          }
          return s;
        });

        return callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            series: newSeries,
            movies: payload.movies,
          }),
        });
      });
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};
