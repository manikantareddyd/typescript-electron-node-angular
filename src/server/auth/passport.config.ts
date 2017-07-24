import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as FacebookStrategy from 'passport-facebook';
import Users from '../db/models/users';
import AuthService from './auth.service';
const config = require('./config');
function configure_passport(): void {
    passport.use(new LocalStrategy(
        function (username: string, password: string, done) {
            Users.findOne(
                {
                    where: {
                        username: username
                    }
                }
            ).catch(ex => {
                console.log(ex, "Exception");
                return done(null, false, { message: "Exception" });
            }).then((user: Users) => {
                if (!user) {
                    console.log("Incorrect Username");
                    return done(null, false, { message: "Incorrect Username" });
                }
                if (!AuthService.validatePassword(user, password)) {
                    console.log("Incorrect Password");
                    return done(null, false, { message: "Incorrect Password" });
                }
                console.log("Valid User", user.username);
                return done(null, user);
            });
        }
    ));

    passport.serializeUser<any, any>((user, done) => {
        done(undefined, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        //Users.findById(id).then((user: Users)=>done(null, user)).catch(err=>{done(err, null)});
        let user = {id: id}
        done(null, user)
    });
}

export default configure_passport;