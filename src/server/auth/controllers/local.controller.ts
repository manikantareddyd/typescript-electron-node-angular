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
        console.log("Forgot Password!");
        let now = Math.floor(Date.now() / 1000).toString();
        let token = CryptService.genId();
        let pin = Math.floor(Math.random() * 90000) + 10000;
        let resetTokenHash = CryptService.hash(token + "." + pin);
        let resetToken = CryptService.encrypt(token + "." + now + "." + pin);
        Users.findOneAndUpdate({ username: username }, { resetTokenHash: resetTokenHash })
            .then(user => {
                if (user != null) {
                    let url = "http://localhost:3000/auth/password/reset/" + resetToken;
                    EmailService.sendmail(url, pin.toString());
                } else {
                    console.log("Wrong Username");
                }
            });
    }

    resetPassword(req: Request, res: Response) {
        let resetToken;
        let params = req.params;
        resetToken = CryptService.decrypt(params["resetToken"]);
        res.clearCookie("token");
        res.clearCookie("id");
        res.clearCookie("username");
        if (!resetToken) {
            res.cookie("password-reset-message", "Reset Link Invalid");
            res.send({
                success: 0
            });
            return;
        }
        let token = resetToken.split(".")[0];
        let iat = parseInt(resetToken.split(".")[1]);
        let pintok = resetToken.split(".")[2];
        let resetTokenHash = CryptService.hash(token + "." + pintok);
        if (Math.floor(Date.now() / 1000) - iat > 3600) {
            Users.findOneAndUpdate(
                { resetTokenHash: resetTokenHash },
                { resetTokenHash: "" }
            ).then(user => {
                res.cookie("password-reset-message", "Reset Link Expired");
                res.send({
                    success: 0
                });
            })

            return;
        }
        res.cookie("password-reset", 1);
        res.cookie("reset-token", params["resetToken"]);
        res.redirect("/");
        return;


    }

    changePassword(req: Request, res: Response) {
        let resetToken;
        let params = req.params;
        resetToken = CryptService.decrypt(req.cookies["reset-token"]);
        res.clearCookie("reset-token");
        res.clearCookie("password-reset");
        if (!resetToken) {
            res.cookie("password-reset-message", "Reset Link Invalid");
            res.send({
                success: 0
            });
            return;
        }
        let token = resetToken.split(".")[0];
        let iat = parseInt(resetToken.split(".")[1]);
        let pintok = resetToken.split(".")[2];
        let resetTokenHash = CryptService.hash(token + "." + pintok);
        if (Math.floor(Date.now() / 1000) - iat > 3600) {
            Users.findOneAndUpdate(
                { resetTokenHash: resetTokenHash },
                { resetTokenHash: "" }
            ).then(user => {
                res.cookie("password-reset-message", "Reset Link Expired");
                res.send({
                    success: 0
                });
            });
            return;
        }
        let newPassword = req.body["password"];
        let pin = req.body["pin"];
        if (pin != pintok) {
            res.cookie("password-reset-message", "Invalid OTP. Request PIN again.");
            Users.findOneAndUpdate(
                { resetTokenHash: resetTokenHash },
                { resetTokenHash: "" }
            ).then(user => {
                if (!user) {
                    res.cookie("password-reset-message", "Reset Link Expired");
                }
                res.send({
                    success: 0
                });

            }).catch(err => {
                res.send({
                    success: 0
                });
            });
            return;
        }
        let secrets = AuthService.genUser("", newPassword);
        Users.findOneAndUpdate(
            { resetTokenHash: resetTokenHash },
            {
                salt: secrets.salt,
                hashpass: secrets.hashpass,
                resetTokenHash: ""
            }
        ).then(user => {
            if (user) {
                res.cookie("password-reset-message", "Password Reset Successful");
                res.send({
                    success: 1
                });
            } else {
                res.cookie("password-reset-message", "Reset Link Expired");
                res.send({
                    success: 0
                });
            }
        }).catch(err => {
            res.cookie("password-reset-message", "Reset Link Expired");
            res.send({
                success: 0
            });
            return;
        });

    }

}

export default new AuthLocalController();