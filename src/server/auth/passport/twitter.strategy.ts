import * as passport from 'passport';
import * as TwitterStrategy from 'passport-twitter';
import AuthSecrets from '../auth.secrets';
import { Users } from '../../db/models';
import AuthService from '../auth.service';
import { Request, Response } from 'express';

export default new TwitterStrategy({
    consumerKey: AuthSecrets.twitter.consumer_key,
    consumerSecret: AuthSecrets.twitter.consumer_secret,
    callbackURL: AuthSecrets.twitter.callback,
    passReqToCallback: true,
    profileFields: ['id', 'displayName', 'photos', 'emails', 'name']
},
    function (req: Request, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function () {
            let id;
            try {
                id = req.cookies["id"];
            } catch (err) {
                id = null;
            }
            // check if the user is already logged in
            if (!id) {
                // New User
                console.log("Unlogged in User");
                Users.findOne({ 'twitter.id': profile.id }, function (err, user) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }

                    if (user) {
                        console.log("Twitter registered earlier");
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.twitter.token = token;
                            user.twitter.displayName = profile.displayName;
                            user.twitter.photos = profile.photos;
                            user.twitter.emails = profile.emails;
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
                        console.log("totally new user");
                        let newUser = new Users();
                        console.log(newUser);
                        console.log("***************");
                        console.log(profile);
                        newUser.id = AuthService.genId();
                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.displayName = profile.displayName;
                        newUser.twitter.photos = profile.photos;
                        newUser.twitter.emails = profile.emails;
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
                console.log("User is currently logged in")
                Users.findOne({ 'twitter.id': profile.id },
                    function (err, user) {
                        if (user) {
                            if (user.id != id) {
                                console.log("twitter registered with someone else");
                                // twitter already registered with different account
                                console.log("Linked with Different Account");
                                return done(null, user, 3);
                            } else {
                                //twitter already linked with this account
                                //nothing to do
                                console.log("Already linked")
                                return done(null, user, "Already Linked");
                            }
                        } else {
                            // user already exists and is logged in
                            // This twitter id is not registered before
                            // We need to link these two.
                            console.log("linking both accounts")
                            Users.findOneAndUpdate({ id: id }, {
                                'twitter': {
                                    'id': profile.id,
                                    'token': token,
                                    'displayName': profile.displayName,
                                    'photos': profile.photos,
                                    'emails': profile.emails
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
