import { Request, Response } from 'express';
export class AuthController {
    public logoutUser(req: Request, res: Response){
        res.clearCookie("token");
        res.clearCookie("id");
        res.clearCookie("username");
        res.redirect("/");
    }
    validateToken(req: Request, res: Response) {
        let id = req.body.id;
        let token = req.body.token;
        res.send({
            status: 1
        })
    }
}

export default new AuthController();