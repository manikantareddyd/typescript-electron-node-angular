import * as passport from 'passport';
import * as TwitterStrategy from 'passport-twitter';
import AppSecrets from '../../../constants/app.secrets';
import { Users } from '../../../db/models/_';
import AuthService from '../../auth.service';
import { CryptService } from '../../../services/_';
import { Request, Response } from 'express';

export default new TwitterStrategy({
    consumerKey: AppSecrets.auth.twitter.consumerKey,
    consumerSecret: AppSecrets.auth.twitter.consumerSecret,
    callbackURL: AppSecrets.auth.twitter.callback,
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
                Users.findOne({ 'twitter.id': profile.id })
                    .then(user => {
                        if (user) {
                            console.log("Twitter registered earlier");
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.twitter.token) {
                                user.twitter.token = token;
                                user.twitter.displayName = profile.displayName;
                                user.twitter.photos = profile.photos;
                                user.twitter.emails = profile.emails;
                                user.save()
                                    .then(user => {
                                        return done(null, user);
                                    }).catch(err => {
                                        console.log(err);
                                        return (err);
                                    })
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            console.log("totally new user");
                            let newUser = new Users();
                            console.log(newUser);
                            console.log("***************");
                            console.log(profile);
                            newUser.id = CryptService.genId();
                            newUser.twitter.id = profile.id;
                            newUser.twitter.token = token;
                            newUser.twitter.displayName = profile.displayName;
                            newUser.twitter.photos = profile.photos;
                            newUser.twitter.emails = profile.emails;
                            newUser.save()
                                .then(newUser => {
                                    return done(null, newUser);
                                }).catch(err => {
                                    console.log(err)
                                    return done(err);
                                })
                        }
                    }).catch(err => {
                        console.log(err);
                        return done(err);
                    })

            } else {
                console.log("User is currently logged in")
                Users.findOne({ 'twitter.id': profile.id })
                    .then(user => {
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
                            }).then(user => {
                                return done(null, user);
                            }).catch(err => {
                                console.log(err);
                                return (err);
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        return done(err);
                    })
            }
        });

    });
