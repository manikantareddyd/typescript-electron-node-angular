import { Request, Response, NextFunction } from 'express';
import { Users } from '../../db/models';
import AuthService from '../auth.service';
import * as passport from 'passport';
class AuthSocialService {

    public authenticate(social, req: Request, res: Response, next: NextFunction) {
        console.log(req.headers["id"], req.query["id"], "authen");
        req.headers["id"] = req.query["id"];
        passport.authenticate(social, { scope: ['email'] })(req, res, next);
    }
    public callback(social, req: Request, res: Response, next: NextFunction) {
        console.log(req.headers["id"]);
        passport.authorize(social, function (err, user, info) {
            if (err) {
                res.redirect("/");
                return;
            }
            if (info === 3) {
                return res.redirect('/');
            }

            res.cookie("id", user.id);
            if (user.username) {
                res.cookie("username", user.username);
            }
            res.cookie("token", AuthService.getToken(user.id), { httpOnly: true });
            res.redirect("/");

        })(req, res, next);
    }
}

var authSocialService = new AuthSocialService();

class AuthSocialController {
    public authSocialService;
    constructor() {
        authSocialService = new AuthSocialService();
    }
    public facebook(req: Request, res: Response, next: NextFunction) {
        authSocialService.authenticate('facebook', req, res, next);
    }

    public facebook_callback(req: Request, res: Response, next: NextFunction) {
        authSocialService.callback('facebook', req, res, next);
    }

    public twitter(req: Request, res: Response, next: NextFunction) {
        authSocialService.authenticate('twitter', req, res, next);
    }

    public twitter_callback(req: Request, res: Response, next: NextFunction) {
        authSocialService.callback('twitter', req, res, next);
    }
    
}



export default new AuthSocialController();
