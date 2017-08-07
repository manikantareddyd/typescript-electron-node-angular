import * as express from 'express';
import * as passport from 'passport';
import { Request, Response } from 'express';

import {
    AuthController,
    AuthLocalController,
    AuthSocialController
} from './controllers'
import * as expressJwt from 'express-jwt';
import AuthSecrets from './auth.secrets';
import AuthService from './auth.service';
let authenticate = expressJwt({ secret: AuthSecrets.jwt.secret })

let AuthRouter = express.Router();

AuthRouter.post('/login', AuthLocalController.loginUser);
AuthRouter.post('/register', AuthLocalController.registerUser);

AuthRouter.post('/updateUsername', AuthLocalController.updateUsername);
AuthRouter.get('/validateToken', authenticate, AuthController.validateToken);


AuthRouter.get('/facebook', AuthSocialController.facebook);
AuthRouter.get('/facebook/callback', AuthSocialController.facebook_callback);

AuthRouter.get('/twitter', AuthSocialController.twitter);
AuthRouter.get('/twitter/callback', AuthSocialController.twitter_callback);

AuthRouter.get('/logout', AuthController.logoutUser);
export default AuthRouter;