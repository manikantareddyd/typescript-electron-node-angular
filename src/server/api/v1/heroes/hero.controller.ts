import { Request, Response } from 'express';
import { Heroes } from '../../../db/models';
import AuthService from '../../../auth/auth.service';
export class HeroController {
    getAll(req: Request, res: Response) {
        let response = AuthService.authorize(req.cookies);
        if(response === 401){
            res.status(401).send({});
            return;
        }
        return Heroes.find({}).exec().then(heroes => {
            res.status(200).send(heroes);
        });
    }

    getOne(req: Request, res: Response) {
        let response = AuthService.authorize(req.cookies);
        if(response === 401){
            res.status(401).send({});
            return;
        }
        return Heroes.findOne({
            id: req.params['id']
        }).exec().then(hero => {
            res.status(200).send(hero);
        });
    }
}

export default new HeroController();