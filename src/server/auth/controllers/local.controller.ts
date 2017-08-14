import { Request, Response } from 'express';
import { Users } from '../../db/models/_';
import AuthService from '../auth.service';
import { TokenService, EmailService, CryptService } from '../../services/_';
export class AuthLocalController {
    loginUser(req: Request, res: Response) {
        let username = req.body["username"];
        let password = req.body["password"];
        Users.findOne({ username: username })
            .then(user => {
                if (user) {
                    console.log("User Exists");
                    if (!AuthService.validatePassword(user, password)) {
                        console.log("Incorrect Password");
                        res.send({
                            success: 0
                        });
                    } else {
                        console.log("Valid Password");
                        let token = TokenService.getToken(user.id);
                        res.cookie("id", user.id)
                        res.cookie("username", user.username);
                        res.cookie("token", token, { httpOnly: true });
                        res.send({
                            success: 1
                        });
                    }
                } else {
                    console.log("User Doesn't exist");
                    res.send({
                        success: 0
                    });
                }
            }).catch(err => {
                console.log(err);
                res.send({
                    success: 0
                });
            });
    }

    registerUser(req: Request, res: Response) {
        let username = req.body["username"];
        let password = req.body["password"];
        console.log("Registering", username, password);
        Users.findOne({ username: username })
            .then(user => {
                if (user) {
                    console.log("User Exists");
                    res.send({
                        success: 0
                    });
                } else {
                    console.log("New User");
                    let secrets = AuthService.genUser(username, password);
                    let newuser = new Users(secrets);
                    newuser.save(function (err, dbuser) {
                        if (err) {
                            console.log("db error 2", err);
                            res.send({
                                success: 0
                            })
                            return;
                        }
                        console.log("User Created", secrets.username, secrets.id);
                        let token = TokenService.getToken(secrets.id);
                        res.cookie("id", secrets.id)
                        res.cookie("username", secrets.username);
                        res.cookie("token", token, { httpOnly: true });
                        res.send({
                            success: 1
                        });
                    });

                }
            }).catch(err => {
                console.log(err);
                res.send({
                    success: 0
                });
            });
    }



    updateUsername(req: Request, res: Response) {
        let response = TokenService.authorize(req.cookies);
        if (response === 401) {
            res.status(401).send({});
            return;
        }
        let id = req.body["id"];
        let username = req.body["username"];
        Users.findOne({ username: username })
            .then(user => {
                if (user) {
                    console.log("username in use");
                    res.send({
                        success: 0
                    })
                } else {
                    Users.findOneAndUpdate(
                        { id: id },
                        { username: username }
                    ).then(user => {
                        let token = TokenService.getToken(user.id);
                        res.cookie("id", id)
                        res.cookie("username", username);
                        res.cookie("token", token, { httpOnly: true });
                        res.send({
                            success: 1
                        })
                    }).catch(err => {
                        if (err) {
                            return res.send({
                                success: 0
                            })
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
                res.send({
                    success: 0
                });
            });
    }

    forgotPassword(req: Request, res: Response) {
        let username = req.body["username"];
        console.log("hahahahalelelele");
        let now = Math.floor(Date.now() / 1000).toString();
        let token = CryptService.genId();
        let hashToken = CryptService.hash(token);
        console.log(token, hashToken);
        let resetToken = CryptService.encrypt(token + "." + now);
        Users.findOneAndUpdate({ username: username }, { hashToken: hashToken })
            .then(user => {
                let url = "http://localhost:3000/auth/reset/" + resetToken;
                EmailService.sendmail(url);
            });
    }

    resetPassword(req: Request, res: Response) {
        let params = req.params;
        let resetToken = CryptService.decrypt(params["resetToken"]);
        if (!resetToken) {
            res.redirect("/");
        }
        let token = resetToken.split(".")[0];
        let iat = parseInt(resetToken.split(".")[1]);

        console.log(token, iat, CryptService.hash(token));

        if (Math.floor(Date.now() / 1000) - iat > 86400)
            res.redirect("/");

        res.cookie("password-reset", 1);
        res.cookie("reset-token", params["resetToken"]);
        
        res.redirect("/");
    }
}

export default new AuthLocalController();