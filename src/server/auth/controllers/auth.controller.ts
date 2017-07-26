import { Request, Response } from 'express';
export class AuthController {

    validateToken(req: Request, res: Response) {
        let id = req.body.id;
        let token = req.body.token;
        res.send({
            status: 1
        })
    }
}

export default new AuthController();