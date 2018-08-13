import fetch from 'node-fetch';
import { config } from '../config';

export const search = (req, res, next) => {
  const { apiRoot, apiKey, apiLanguage } = config;

  fetch(`${apiRoot}search/multi?api_key=${apiKey}&query=${req.query.query}`)
    .then(res => res.json())
    .then(json => {
      res.status(200).json({
        payload: json
      });
    });
};

export default search;