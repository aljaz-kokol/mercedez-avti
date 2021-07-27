import { Request, Response, NextFunction } from 'express';

import CarType from '../model/car-type.model';

export const getCarTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carTypes = await CarType.find();
        res.status(200).json(carTypes);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};