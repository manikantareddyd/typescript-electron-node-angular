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
                .then(res=>{
                    console.log("User Created", res["dataValues"]["username"]);
                });
            }
        })
    }
}

export default new AuthController();