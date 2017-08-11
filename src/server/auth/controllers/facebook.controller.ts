import { AuthSocialController } from './_';
import { Request, Response, NextFunction } from 'express';

class AuthFacebookController {
    public authenticate(req: Request, res: Response, next: NextFunction) {
        AuthSocialController.authenticate('facebook', req, res, next);
    }

    public callback(req: Request, res: Response, next: NextFunction) {
        AuthSocialController.callback('facebook', req, res, next);
    }
}

export default new AuthFacebookController();