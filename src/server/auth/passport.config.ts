import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import User from '../db/models/users';
import AuthService from './auth.service';
function configure_passport(): void {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne(
                {
                    where: {
                        username: username
                    }
                }
            ).catch(ex => {
                console.log(ex, "Exception");
                return done(null, false, {message: "Exception"});
            }).then(user => {
                if(!user)
                {
                    console.log("Incorrect Username");
                    return done(null, false, {message: "Incorrect Username"});
                }
                if(!AuthService.validatePassword(user, password))
                {
                    console.log("Incorrect Password");
                    return done(null, false, {message: "Incorrect Password"});
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user: User, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id: string, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

export default configure_passport;