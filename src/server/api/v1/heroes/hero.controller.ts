import { Request, Response } from 'express';
import Heroes from '../../../db/models/hero';

export class HeroController {
    getAll(req: Request, res: Response){
        return Heroes.findAll().then(
            heroes => {
                 res.status(200).send(heroes);
            }
        )
    }
}

export default new HeroController();