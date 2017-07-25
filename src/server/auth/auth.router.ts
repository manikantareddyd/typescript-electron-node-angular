import * as express from 'express';
import * as passport from 'passport';
import AuthLocalController  from './auth.local.controller';
import AuthController from './auth.controller';
import * as expressJwt  from 'express-jwt';
import AuthSecrets from './auth.secrets';
let authenticate = expressJwt({secret: AuthSecrets.jwt.secret})

let AuthRouter = express.Router();

AuthRouter.post('/login', AuthLocalController.loginUser);
AuthRouter.post('/register', AuthLocalController.registerUser)
AuthRouter.get('/validateToken', authenticate, AuthController.validateToken);


export default AuthRouter;