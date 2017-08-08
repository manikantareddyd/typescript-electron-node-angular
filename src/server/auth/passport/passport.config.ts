import * as passport from 'passport';
import {
    facebookStrategy,
    twitterStrategy
} from './strategies';

function configure_passport(): void {

    passport.use(facebookStrategy);

    passport.use(twitterStrategy);

    passport.serializeUser<any, any>((user, done) => {
        // This is where we fuck em all
        // No serializing or deserializing hahahahaha
        console.log("Serializing")
        return done(undefined, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        // This is where we fuck em all
        // No serializing or deserializing hahahahaha
        console.log("Deserializing");
        let user = { id: id }
        return done(null, user)
    });
}

export default configure_passport;