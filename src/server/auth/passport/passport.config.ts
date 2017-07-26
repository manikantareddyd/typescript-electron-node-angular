import * as passport from 'passport';
import facebookStrategy from './facebook.strategy';
function configure_passport(): void {

    passport.use(facebookStrategy);

    passport.serializeUser<any, any>((user, done) => {
        console.log("Serializing")
        return done(undefined, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        //Users.findById(id).then((user: Users)=>done(null, user)).catch(err=>{done(err, null)});
        console.log("Deserializing");
        let user = {id: id}
        return done(null, user)
    });
}

export default configure_passport;