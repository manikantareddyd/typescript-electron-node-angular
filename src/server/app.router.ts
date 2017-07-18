import * as express from 'express';
import * as path from 'path';
let BaseRouter = express.Router();
    BaseRouter.get('/login', (req, res, next) => {
      res.sendFile('auth/login.html', {root: path.join(__dirname, "../client")});
    });
    BaseRouter.get('/', (req, res, next) => {
      res.render("index");
    });
    BaseRouter.get('*', (req, res, next) => {
      res.redirect("/");
    });
    
export default BaseRouter;