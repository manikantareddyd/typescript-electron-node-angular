import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import passportConfig from './auth/passport/passport.config';

import { Heroes } from './db/models/_';
import { EmailService } from './services/_';
import AppRouter from './app.router';
// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public app: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.app = express();
        mongoose.connect('mongodb://localhost:27017/sample');
        (<any>mongoose).Promise = Promise;
        this.middleware();
        this.routes();
        Heroes.count({}, function (err, c) {
            console.log("Heroes Count:\t", c);
        });
        Heroes.count({}).then(h => {
            console.log("halala", h);
        })
        EmailService.sendmail("oo");
    }

    // Configure Express middleware.
    private middleware(): void {
        this.app.use(logger('dev'));
        this.app.use(cookieParser())
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
        this.app.use('/assets', express.static(path.join(__dirname, '../assets')));
        this.app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
        this.app.use('/', AppRouter);
    }

}

export default new App().app;