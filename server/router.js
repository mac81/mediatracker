import express from 'express';
import VerifyToken from './verifyToken';

import * as AuthenticationController from './controllers/AuthenticationController';
import * as SearchController from './controllers/SearchController';
import * as MovieController from './controllers/MovieController';
import * as TvController from './controllers/TvController';
import * as CollectionController from './controllers/CollectionController';

export default app => {
  // Initializing route groups
  const apiRoutes = express.Router();
  const searchRoutes = express.Router();
  const authenticationRoutes = express.Router();
  const movieRoutes = express.Router();
  const tvRoutes = express.Router();
  const collectionRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  apiRoutes.use('/auth', authenticationRoutes);

  authenticationRoutes.post('/register', AuthenticationController.register);

  authenticationRoutes.post('/login', AuthenticationController.login);

  authenticationRoutes.get('/me', VerifyToken, AuthenticationController.getUser);

  //=========================
  // Search Routes
  //=========================

  apiRoutes.use('/search', searchRoutes);

  searchRoutes.get('/', SearchController.search);

  //=========================
  // Movie Routes
  //=========================

  apiRoutes.use('/movies', movieRoutes);

  movieRoutes.get('/:id', MovieController.getDetails);

  //=========================
  // TV Series Routes
  //=========================

  apiRoutes.use('/tv', tvRoutes);

  tvRoutes.get('/:id', TvController.getDetails);
  tvRoutes.get('/:id/season/:seasonNumber', TvController.getSeason);

  //=========================
  // Collection Routes
  //=========================

  apiRoutes.use('/collection', collectionRoutes);

  collectionRoutes.get('/series', VerifyToken, CollectionController.getAllSeries);

  collectionRoutes.get('/series/:id', VerifyToken, CollectionController.getSeries);
  collectionRoutes.post('/series/:id', VerifyToken, CollectionController.addSeries);
  collectionRoutes.delete('/series/:id', VerifyToken, CollectionController.removeSeries);

  collectionRoutes.get('/series/:id/season/:seasonNumber', VerifyToken, CollectionController.getSeason);

  collectionRoutes.post('/series/:id/:episodeId', VerifyToken, CollectionController.addEpisode);
  collectionRoutes.delete('/series/:id/:episodeId', VerifyToken, CollectionController.removeEpisode);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
