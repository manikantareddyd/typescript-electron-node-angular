import { Request, Response, NextFunction } from 'express';
import { Users } from '../../db/models';
import AuthService from '../auth.service';
import * as passport from 'passport';
export class AuthTwitterController {

    public authenticate(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers["id"], req.query["id"], "authen");
        req.headers["id"] = req.query["id"];
        passport.authenticate('twitter', { scope: ['email'] })(req, res, next);
    }
    public callback(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers["id"]);
        passport.authorize('twitter', function (err, user, info) {
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

export default new AuthTwitterController();
