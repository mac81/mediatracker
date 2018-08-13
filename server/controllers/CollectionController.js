import fetch from 'node-fetch';
import {config} from '../config';

import Series from '../models/Series';

const request = async url => {
  return await fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('Error: ', err);
    });
};

export const getAllSeries = (req, res, next) => {
  const id = req.params.id;
  const {apiRoot, apiKey, apiLanguage} = config;

  Series.find({}, (err, series) => {
    Promise.all(series.map(tv => request(`${apiRoot}tv/${tv.id}?api_key=${apiKey}`))).then(series => {
      return res.status(200).json({
        payload: series,
      });
    });
  });
};

export const getSeries = async (req, res, next) => {
  const {apiRoot, apiKey, apiLanguage} = config;
  const id = req.params.id;

  console.log('GET SERIES');

  try {
    const details = await request(`${apiRoot}tv/${id}?api_key=${apiKey}`);
    const latestSeason = details.seasons.length;
    //const season = await request(`${apiRoot}tv/${id}/season/${latestSeason}?api_key=${apiKey}`);

    const data = {
      details,
      latestSeason,
    };

    return res.status(200).json({
      payload: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: error,
    });
  }
};

export const addSeries = (req, res, next) => {
  const id = req.params.id;

  Series.findOrCreate({id: id}, (err, series, created) => {
    return res.status(200).json({
      payload: series,
    });
  });
};

export const removeSeries = (req, res, next) => {
  const id = req.params.id;

  Series.findOneAndRemove({id: id}, (err, series) => {
    return res.status(200).json({
      payload: series,
    });
  });
};

export const getSeason = async (req, res, next) => {
  const {apiRoot, apiKey, apiLanguage} = config;
  const id = req.params.id;
  const seasonNumber = req.params.seasonNumber;

  console.log('GET SEASON');

  try {
    const season = await request(`${apiRoot}tv/${id}/season/${seasonNumber}?api_key=${apiKey}`);

    Series.findOne({id: id}, (err, series) => {
      console.log(season.episodes);

      return res.status(200).json({
        payload: {
          details: season,
          episodes: series.episodes,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: error,
    });
  }
};

export const addEpisode = (req, res, next) => {
  const id = req.params.id;
  const episodeId = req.params.episodeId;

  Series.findOne({id: id}, (err, series) => {
    if (!series.episodes.includes(episodeId)) {
      series.episodes.push(episodeId);
      series.save(err => {
        if (err) return err;
        return res.status(200).json({
          payload: series,
        });
      });
    } else {
      return res.status(409).json({
        payload: series,
      });
    }
  });
};

export const removeEpisode = (req, res, next) => {
  const id = req.params.id;
  const episodeId = req.params.episodeId;

  Series.findOneAndRemove({episodes: episodeId}, (err, series) => {
    return res.status(200).json({
      payload: series,
    });
  });
};
