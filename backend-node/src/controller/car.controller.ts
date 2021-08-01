import { Request, Response, NextFunction } from 'express';

import Car from '../model/car.model';

export const getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};