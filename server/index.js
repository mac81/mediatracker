import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import {config} from './config';

const port = process.env.PORT || 3003;
const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());
server.use(passport.initialize());

mongoose.connect(config.databaseUrl, {useMongoClient: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  router(server);

  server.listen(port, () =>
    console.log(`Server started on port ${port} with environment ${process.env.NODE_ENV || 'development'}`)
  );
});
