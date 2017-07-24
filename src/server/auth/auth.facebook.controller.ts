import { Request, Response } from 'express';
import Users from '../db/models/users';
import AuthService from './auth.service';
import * as passport from 'passport';
import * as FacebookStrategy from 'passport-facebook';
import AuthSecrets from './auth.secrets';
export class AuthFacebookController {
    public configure() {
        passport.use(new FacebookStrategy({
            clientID: AuthSecrets["facebook_app_id"],
            clientSecret: AuthSecrets["facebook_app_id"],
            callbackURL: AuthSecrets["facebook_callback"]
        },
            function (accessToken, refreshToken, profile, done) {
                Users.findOrCreate(..., function (err, user) {
                    if (err) { return done(err); }
                    done(null, user);
                });
            }
        ));
    }
}

export default new AuthFacebookController();