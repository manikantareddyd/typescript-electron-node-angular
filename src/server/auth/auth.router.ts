import * as express from 'express';
import * as passport from 'passport';
import AuthController  from './auth.controller';
import * as expressJwt  from 'express-jwt';
import AuthSecrets from './auth.secrets';
let authenticate = expressJwt({secret: AuthSecrets.jwt_secret})

let AuthRouter = express.Router();

AuthRouter.post('/login',
    passport.authenticate(
        'local',
        {
            successRedirect: '/sendToken',
            failureRedirect: '/',
            session: true
        }
    )
);



AuthRouter.post('/register', AuthController.registerUser)
AuthRouter.get('/sendToken', AuthController.sendToken);
AuthRouter.get('/validateToken', authenticate, AuthController.validateToken);


export default AuthRouter;