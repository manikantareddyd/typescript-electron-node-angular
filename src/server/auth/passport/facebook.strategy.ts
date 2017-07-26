import * as passport from 'passport';
import * as FacebookStrategy from 'passport-facebook';
import AuthSecrets from '../auth.secrets';
import Users from '../../db/models/users';
import AuthService from '../auth.service';
import * as fs from 'fs';

export default new FacebookStrategy({
    clientID: AuthSecrets.facebook.app_id,
    clientSecret: AuthSecrets.facebook.app_secret,
    callbackURL: AuthSecrets.facebook.callback,
    passReqToCallback: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'name']
},
    function (req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function () {
            req.user = {}
            req.user._id = req.headers["id"];
            // check if the user is already logged in
            if (!req.user) {
                // New User
                Users.findOne({ 'facebook.id': profile.id }, function (err, user) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.displayName = profile.displayName;

                            user.save(function (err) {
                                if (err) {
                                    console.log(err);
                                    return done(err);
                                }

                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        let newUser = new Users();
                        newUser._id = AuthService.genId();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.displayName = profile.displayName;

                        newUser.save(function (err) {
                            if (err) {
                                console.log(err);
                                return done(err);
                            }

                            return done(null, newUser);
                        });
                    }
                });

            } else {
                Users.findOne({ facebook: { id: profile.id } },
                    function (err, user) {
                        if (user._id != req.user._id) {
                            // facebook already registered with different account
                            return done(null, null, "linked elsewhere");
                        } else {
                            // user already exists and is logged in, we have to link accounts
                            // This facebook id is not registered before
                            let id = req.user._id; // pull the user out of the session
                            Users.findByIdAndUpdate(id, {
                                'facebook': {
                                    id: profile.id,
                                    token: token,
                                    displayName: profile.displayName
                                }
                            }, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return done(err);
                                }

                                return done(null, user);
                            });
                        }
                    })

            }
        });

    });
