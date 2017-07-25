import { Request, Response } from 'express';
import Heroes from '../../../db/models/heroes';

export class HeroController {
    getAll(req: Request, res: Response) {
        return Heroes.find({}).exec().then(heroes => {
            res.status(200).send(heroes);
        });
    }

    getOne(req: Request, res: Response) {
        return Heroes.findOne({
            id: req.params['id']
        }).exec().then(hero => {
            res.status(200).send(hero);
        });
    }
}

export default new HeroController();