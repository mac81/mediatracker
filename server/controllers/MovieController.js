import fetch from 'node-fetch';
import {config} from '../config';
import * as Vibrant from 'node-vibrant';

export const getDetails = (req, res, next) => {
  const {apiRoot, apiKey, apiLanguage} = config;

  fetch(`${apiRoot}movie/${req.params.id}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(json => {
      Vibrant.from(`https://image.tmdb.org/t/p/w1280/${json.poster_path}`).getPalette((err, palette) => {
        const swatch = {
          swatch: palette,
        };
        return res.status(200).json({
          payload: Object.assign(swatch, json),
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export default getDetails;
