import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {Sequelize} from 'sequelize-typescript';
import Heroes from './app/db/models/hero';
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    let sequelize;
    const config = require(__dirname+'/app/db/config')['development'];
    console.log(config, "config");
    sequelize = new Sequelize({
      name:config.database, 
      username:config.username, 
      password:config.password, 
      dialect:config.dialect,
      host:config.host,
      port:config.port,
      modelPaths:[__dirname+'/app/db/models']
    });
    // sequelize.addModels([__dirname+'/app/db/models']);
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        Heroes.findAll().then(users => {
          console.log(users)
        })
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
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
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
  }

}

export default new App().express;