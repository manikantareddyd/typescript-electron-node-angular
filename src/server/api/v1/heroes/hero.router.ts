import { Router, Request, Response, NextFunction } from 'express';
import HeroController from './hero.controller';
import * as expressJwt  from 'express-jwt';
import AuthSecrets from '../../../auth/auth.secrets';
export class HeroRouter {
    router: Router
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    constructor() {
        let authenticate = expressJwt({secret: AuthSecrets.jwt_secret})
        this.router = Router();
        this.router.get('/getAll', authenticate, HeroController.getAll);
        this.router.get('/getOne/:id', authenticate, HeroController.getOne);
    }

}

// Create the HeroRouter, and export its configured Express.Router

export default new HeroRouter().router;