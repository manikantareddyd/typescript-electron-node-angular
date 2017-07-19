import * as express from 'express';
import * as path from 'path';
import AuthRouter from './auth/auth.router';
import HeroRouter from './api/v1/heroes/hero.router';




let AppRouter = express.Router();

AppRouter.use('/api/v1/heroes', HeroRouter);

AppRouter.use('/', AuthRouter);

AppRouter.get('/', (req, res, next) => {
  res.render("index");
});

AppRouter.get('*', (req, res, next) => {
  res.redirect("/");
});

export default AppRouter;