import * as express from 'express';
import * as passport from 'passport';

let AuthRouter = express.Router();

AuthRouter.post('/login',
    passport.authenticate(
        'local',
        {
            successRedirect: '/',
            failureRedirect: '/'
        }
    ),
    function (req, res) {
        res.redirect('/');
    }
);

export default AuthRouter;