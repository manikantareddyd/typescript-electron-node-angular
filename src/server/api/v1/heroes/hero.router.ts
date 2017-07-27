import { Router, Request, Response, NextFunction } from 'express';
import HeroController from './hero.controller';
export class HeroRouter {
    router: Router
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    constructor() {
        this.router = Router();
        this.router.get('/getAll', HeroController.getAll);
        this.router.get('/getOne/:id', HeroController.getOne);
    }

}

// Create the HeroRouter, and export its configured Express.Router

export default new HeroRouter().router;