import * as express from 'express';
import * as passport from 'passport';
import { Request, Response } from 'express';

import {
    AuthController,
    AuthLocalController,
    AuthTwitterController,
    AuthFacebookController
} from './controllers/_'
import * as expressJwt from 'express-jwt';
import AppSecrets from '../app.secrets';
import AuthService from './auth.service';
let authenticate = expressJwt({ secret: AppSecrets.auth.jwt.secret })

let AuthRouter = express.Router();

AuthRouter.post('/login', AuthLocalController.loginUser);
AuthRouter.post('/register', AuthLocalController.registerUser);

AuthRouter.post('/password/forgot', AuthLocalController.forgotPassword);
AuthRouter.get('/password/reset/:resetToken', AuthLocalController.resetPassword);
AuthRouter.post('/password/reset', AuthLocalController.changePassword);

AuthRouter.post('/username/update', AuthLocalController.updateUsername);
AuthRouter.get('/validateToken', authenticate, AuthController.validateToken);


AuthRouter.get('/facebook', AuthFacebookController.authenticate);
AuthRouter.get('/facebook/callback', AuthFacebookController.callback);

AuthRouter.get('/twitter', AuthTwitterController.authenticate);
AuthRouter.get('/twitter/callback', AuthTwitterController.callback);

AuthRouter.get('/logout', AuthController.logoutUser);
export default AuthRouter;