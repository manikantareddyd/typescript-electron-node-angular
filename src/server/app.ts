import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import SQLZ from './db/index';
import Heroes from './db/models/heroes';
import BaseRouter from './app.router';

import HeroRouter from './api/v1/heroes/hero.router';
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    // setup sequelizer
    SQLZ();
    this.middleware();
    this.routes();
    Heroes.count().then(c => {
      console.log("Heroes Count:\t", c);
    });
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/', express.static(path.join(__dirname, '../client')));
    this.express.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));

    
    this.express.use('/api/v1/heroes', HeroRouter);
    this.express.use('/', BaseRouter);
  }

}

export default new App().express;