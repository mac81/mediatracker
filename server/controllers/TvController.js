import fetch from 'node-fetch';
import {config} from '../config';
import * as Vibrant from 'node-vibrant';

import Series from '../models/Series';

export const getDetails = (req, res, next) => {
  const {apiRoot, apiKey, apiLanguage} = config;

  fetch(`${apiRoot}tv/${req.params.id}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(json => {
      Vibrant.from(`https://image.tmdb.org/t/p/w1280/${json.poster_path}`).getPalette((err, palette) => {
        const swatch = {
          swatch: palette,
        };

        Series.findOne({id: req.params.id}, (err, series) => {
          const isAddedToWatchlist = series ? true : false;
          // if (series) {
          //   json = Object.assign({included: true}, json);
          // }
          return res.status(200).json({
            payload: {
              details: Object.assign(swatch, json),
              isAddedToWatchlist,
            },
          });
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getSeason = (req, res, next) => {
  const {apiRoot, apiKey, apiLanguage} = config;

  fetch(`${apiRoot}tv/${req.params.id}/season/${req.params.seasonNumber}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(json => {
      return res.status(200).json({
        payload: json,
      });
    })
    .catch(error => {
      console.log(error);
    });
};
