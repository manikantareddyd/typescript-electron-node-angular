import { AuthSocialController } from './_';
import { Request, Response, NextFunction } from 'express';

class AuthTwitterController {
    public authenticate(req: Request, res: Response, next: NextFunction) {
        AuthSocialController.authenticate('twitter', req, res, next);
    }

    public callback(req: Request, res: Response, next: NextFunction) {
        AuthSocialController.callback('twitter', req, res, next);
    }
}

export default new AuthTwitterController();