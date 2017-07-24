import * as passport from 'passport';

import FacebookStrategy from './auth.facebook.controller';

const config = require('./config');
function configure_passport(): void {
    
    FacebookStrategy.configure();

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