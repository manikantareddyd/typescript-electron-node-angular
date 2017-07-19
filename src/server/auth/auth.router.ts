import * as express from 'express';
import * as passport from 'passport';
import AuthController  from './auth.controller';
let AuthRouter = express.Router();

AuthRouter.post('/login',
    passport.authenticate(
        'local',
        {
            successRedirect: '/',
            failureRedirect: '/api/v1/heroes/getAll'
        }
    ),
    function (req, res) {
        res.redirect('/');
    }
);

AuthRouter.post('/register', AuthController.registerUser)

export default AuthRouter;