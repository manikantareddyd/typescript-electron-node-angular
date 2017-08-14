import * as passport from 'passport';
import * as FacebookStrategy from 'passport-facebook';
import AppSecrets from '../../../app.secrets';
import { Users } from '../../../db/models/_';
import AuthService from '../../auth.service';
import { CryptService } from '../../../services/_';
import * as fs from 'fs';
import { Request, Response } from 'express';

export default new FacebookStrategy({
    authorizationURL: AppSecrets.auth.facebook.auth_url,
    tokenUrl: AppSecrets.auth.facebook.token_url,
    clientID: AppSecrets.auth.facebook.app_id,
    clientSecret: AppSecrets.auth.facebook.app_secret,
    callbackURL: AppSecrets.auth.facebook.callback,
    passReqToCallback: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'name']
},
    function (req: Request, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function () {
            let id = req.cookies["id"] ? req.cookies["id"] : null;
            
            // check if the user is already logged in
            if (!id) {
                // New User
                console.log("Unlogged in User");
                Users.findOne({ 'facebook.id': profile.id })
                    .then(user => {
                        if (user) {
                            console.log("Facebook registered earlier");
                            // if there is a user id already but no token 
                            // user was linked at one point and then removed
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                user.facebook.displayName = profile.displayName;
                                user.facebook.photos = profile.photos;
                                user.facebook.emails = profile.emails;
                                user.save()
                                    .then(user => {
                                        return done(null, user);
                                    }).catch(err => {
                                        console.log(err);
                                        return done(err);
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
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.displayName = profile.displayName;
                            newUser.facebook.photos = profile.photos;
                            newUser.facebook.emails = profile.emails;
                            newUser.save()
                                .then(newUser => {
                                    return done(null, newUser);
                                }).catch(err => {
                                    console.log(err);
                                    return done(err);
                                })
                        }
                    })
                    .catch(err => {
                        if (err) {
                            console.log(err);
                            return done(err);
                        }
                    })
            } else {
                console.log("User is currently logged in")
                Users.findOne({ 'facebook.id': profile.id })
                    .then(user => {
                        if (user) {
                            if (user.id != id) {
                                console.log("fb registered with someone else");
                                // facebook already registered with different account
                                console.log("Linked with Different Account");
                                return done(null, user, 3);
                            } else {
                                //facebook already linked with this account
                                //nothing to do
                                console.log("Already linked")
                                return done(null, user, "Already Linked");
                            }
                        } else {
                            // user already exists and is logged in
                            // This facebook id is not registered before
                            // We need to link these two.
                            console.log("linking both accounts")
                            Users.findOneAndUpdate({
                                id: id
                            },
                                {
                                    'facebook': {
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
                                    return done(err);
                                })
                        }
                    }).catch(err => {
                        if (err) {
                            console.log(err);
                            return done(err);
                        }
                    });

            }
        });

    });
