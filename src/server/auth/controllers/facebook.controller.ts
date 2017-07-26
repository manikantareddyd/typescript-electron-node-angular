import { Request, Response, NextFunction } from 'express';
import Users from '../../db/models/users';
import AuthService from '../auth.service';
import * as passport from 'passport';
export class AuthFacebookController {

    public authenticate(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers["id"], req.query["id"], "authen");
        req.headers["id"] = req.query["id"];
        passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
    }
    public callback(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers["id"]);        
        passport.authorize('facebook', function (err, user, info) {
            if(info === "linked elsewhere"){
                return res.send({
                    success: 3
                })
            }
            res.send({
                id: user._id,
                username: (user.username) ? user.username : null,
                token: AuthService.getToken(user.id),
                success: 1
            });
        })(req, res, next);
    }
}

export default new AuthFacebookController();