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
        passport.authorize('facebook', {failureFlash: true},function (err, user, info) {
            if(err){
                res.redirect("/");
                return;
            }
            if(info === 3){
                return res.redirect('/');
            }

            res.cookie("id", user._id);
            if(user.username){
                res.cookie("username", user.username);
            }
            res.cookie("token", AuthService.getToken(user._id), {httpOnly: true});      
            res.redirect("/");
            
        })(req, res, next);
    }
}

export default new AuthFacebookController();