import fetch from 'node-fetch';
import connectToDatabase from './utils/connect-db';
import {getUser} from './utils/get-user';
import {config} from '../config';

async function fetchSeasons(seriesId, seasons) {
  const {apiRoot, apiKey, apiLanguage} = config;

  try {
    const data = await Promise.all(
      seasons.map(s => {
        return fetch(`${apiRoot}tv/${seriesId}/season/${s.season_number}?api_key=${apiKey}`).then(response =>
          response.json()
        );
      })
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

const queryDatabase = async (db, user, payload) => {
  console.log('=> query database');

  const {seriesId} = payload;

  const {apiRoot, apiKey, apiLanguage} = config;

  const series = await fetch(`${apiRoot}tv/${seriesId}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(json => json);

  const apiSeasons = await fetchSeasons(series.id, series.seasons);

  const newEpisodes = [];

  apiSeasons.forEach(season => {
    season.episodes.forEach(episode => {
      newEpisodes.push({
        id: episode.id,
        series_id: seriesId,
        season_number: season.season_number,
      });
    });
  });

  return db
    .collection('users')
    .updateOne(
      {userId: user.email},
      {
        $addToSet: {
          episodes: {$each: newEpisodes},
        },
      }
    )
    .then(data => {
      return {statusCode: 200, body: JSON.stringify({newEpisodes})};
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
