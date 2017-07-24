import { Request, Response } from 'express';
import Users from '../db/models/users';
import AuthService from './auth.service';

export class AuthController {
    loginUser(req: Request, res: Response){
        let username = req.body["username"];
        let password = req.body["password"];
        Users.findOne({
            where:{
                username: username
            }
        }).then(user=>{
            if(user){
                console.log("User Exists");
                if(!AuthService.validatePassword(user, password)){
                    console.log("Incorrect Password");
                    res.redirect("/auth/loginFailure");
                }else{
                    console.log("Valid Password");
                    let token = AuthService.getToken(user.id);
                    let body = {
                        id: user.id,
                        token: token,
                        success: 1
                    }
                    res.send(body);
                }
            }else{
                console.log("User Doesn't exist");
                res.redirect("/auth/loginFailure");
            }
        })
    }

    registerUser(req: Request, res: Response) {
        let username = req.body["username"];
        let password = req.body["password"];
        console.log("Register", username, password);
        Users.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (user) {
                console.log("User Exists");
                let body = {
                    success: 0
                }
                res.send(body);
            }
            else {
                let secrets = AuthService.genUser(username, password);
                Users.create(secrets)
                    .then(dbres => {
                        console.log("User Created", secrets.username, secrets.id);
                        let id = secrets.id;
                        let token = AuthService.getToken(id);
                        res.send({
                            id: id,
                            token: token,
                            success: 1
                        });
                    });
            }
        })
    }

    loginFailure(req: Request, res: Response) {
        let body = {
            success: 0
        }
        res.send(body);
    }

    validateToken(req: Request, res: Response) {
        res.send({
            status: 1
        })
    }
}

export default new AuthController();