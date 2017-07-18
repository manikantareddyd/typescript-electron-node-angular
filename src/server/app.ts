import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import SQLZ from './db/index';
import passportConfig from './auth/passport.config';

import Heroes from './db/models/heroes';

import BaseRouter from './app.router';
import AuthRouter from './auth/auth.router';
import HeroRouter from './api/v1/heroes/hero.router';
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public app: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.app = express();
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
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(session({ secret: 'keyboard cat' }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passportConfig();
  }

  // Configure API endpoints.
  private routes(): void {
    this.app.use('/', express.static(path.join(__dirname, '../client')));
    this.app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));

    this.app.use('/api/v1/heroes', HeroRouter);
    this.app.use('/', AuthRouter);
    this.app.use('/', BaseRouter);
  }

}

export default new App().app;