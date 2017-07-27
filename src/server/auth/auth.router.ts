import * as express from 'express';
import * as passport from 'passport';
import { Request, Response } from 'express';

import AuthLocalController  from './controllers/local.controller';
import AuthFacebookController from './controllers/facebook.controller';
import AuthController from './controllers/auth.controller';
import * as expressJwt  from 'express-jwt';
import AuthSecrets from './auth.secrets';
import AuthService from './auth.service';
let authenticate = expressJwt({secret: AuthSecrets.jwt.secret})

let AuthRouter = express.Router();

AuthRouter.post('/login', AuthLocalController.loginUser);
AuthRouter.post('/register', AuthLocalController.registerUser);
AuthRouter.post('/updateUsername', AuthLocalController.updateUsername);
AuthRouter.get('/validateToken', authenticate, AuthController.validateToken);


AuthRouter.get('/facebook', AuthFacebookController.authenticate);

AuthRouter.get('/facebook/callback', AuthFacebookController.callback);

export default AuthRouter;