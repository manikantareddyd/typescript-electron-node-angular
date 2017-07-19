import { Request, Response } from 'express';
import Users from '../db/models/users';
import AuthService from './auth.service';

export class AuthController {
    registerUser(req: Request, res: Response) {
        let username = req.body["username"]
        let password = req.body["password"];
        console.log("Register", username, password);
        Users.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (user) {
                console.log("User Exists");
                return;
            }
            else {
                let secrets = AuthService.genUser(username, password);
                Users.create(secrets)
                    .then(dbres => {
                        console.log("User Created", dbres["dataValues"]["username"]);
                        let token = AuthService.getToken(username);
                        res.send({
                            username: username,
                            token: token
                        });
                    });
            }
        })
    }

    sendToken(req: Request, res: Response) {
        let token = AuthService.getToken(req.user.username);
        // console.log("Here at send token", token);
        let body = {
            username: req.user.username,
            token: token
        }
        res.send(body);
    }

    validateToken(req: Request, res: Response){
        res.send({
            status: 1
        })
    }
}

export default new AuthController();