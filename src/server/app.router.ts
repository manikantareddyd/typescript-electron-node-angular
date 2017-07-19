import * as express from 'express';
import * as path from 'path';
import AuthRouter from './auth/auth.router';
import HeroRouter from './api/v1/heroes/hero.router';




let BaseRouter = express.Router();

BaseRouter.use('/api/v1/heroes', HeroRouter);

BaseRouter.use('/', AuthRouter);

BaseRouter.get('/', (req, res, next) => {
  res.render("index");
});

BaseRouter.get('*', (req, res, next) => {
  res.redirect("/");
});

export default BaseRouter;