import * as express from 'express';

let BaseRouter = express.Router();
    BaseRouter.get('/', (req, res, next) => {
      res.render("index");
    });
    BaseRouter.get('*', (req, res, next) => {
      res.redirect("/");
    });
    
export default BaseRouter;