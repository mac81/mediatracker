import fetch from 'node-fetch';
import {config} from '../config';

exports.handler = (event, context, callback) => {
  const {apiRoot, apiKey, apiLanguage} = config;

  fetch(`${apiRoot}search/multi?api_key=${apiKey}&query=${event.queryStringParameters.query}`)
    .then(res => res.json())
    .then(json => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          payload: json,
        }),
      });
    });
};
