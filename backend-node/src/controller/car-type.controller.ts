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

export const getCarTypeFromId = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { typeId: string };
    const params = req.params as ExpectedReq;
    try {
        const carType = await CarType.findById(params.typeId);
        if (!carType) {
            throw new Error('CarType document with this id does not exist!');
        }
        res.status(200).json(carType);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};