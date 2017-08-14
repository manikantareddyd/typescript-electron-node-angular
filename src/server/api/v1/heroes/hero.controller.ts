import { Request, Response } from 'express';
import { Heroes } from '../../../db/models/_';
import { TokenService } from '../../../services/_';
export class HeroController {
    getAll(req: Request, res: Response) {
        let response = TokenService.authorize(req.cookies);
        if (response === 401) {
            res.status(401).send({});
            return;
        }
        res.cookie("token", TokenService.refreshToken(req.cookies), { httpOnly: true });
        return Heroes.find({}).exec().then(heroes => {
            res.status(200).send(heroes);
        });
    }

    getOne(req: Request, res: Response) {
        let response = TokenService.authorize(req.cookies);
        if (response === 401) {
            res.status(401).send({});
            return;
        }
        res.cookie("token", TokenService.refreshToken(req.cookies), { httpOnly: true });
        return Heroes.findOne({
            id: req.params['id']
        }).exec().then(hero => {
            res.status(200).send(hero);
        });
    }
}

export default new HeroController();