import { Request, Response } from 'express';
import Heroes from '../../../db/models/heroes';

export class HeroController {
    getAll(req: Request, res: Response) {
        return Heroes.findAll().then(
            heroes => {
                res.status(200).send(heroes);
            }
        )
    }

    getOne(req: Request, res: Response) {
        return Heroes.findOne({
            where: {
                id: req.params['id']
            }
        }).then(
            hero => {
                res.status(200).send(hero);
            }
            )
    }
}

export default new HeroController();