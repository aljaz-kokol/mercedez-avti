import {Request, Response, NextFunction} from 'express';

import CarClass from '../model/car-class.model';
import CarClassMongo from '../model/mongo/car-class.mongo.model';

export const getCarClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carClasses: CarClass[] = await CarClassMongo.find();
        res.status(200).json(carClasses);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}