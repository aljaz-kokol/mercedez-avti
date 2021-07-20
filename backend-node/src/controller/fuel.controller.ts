import { Request, Response, NextFunction } from 'express';

import Fuel from '../model/fuel.model';
import FuelMongo  from '../model/mongo/fuel.mongo.model';

export const getFuels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fuels = (await FuelMongo.find()) as Fuel[];
        res.status(200).json(fuels);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

export const getFuelFromId = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { fuelId: string };

    const params = req.params as ExpectedReq;
    try {
        const fuel = await FuelMongo.findById(params.fuelId) as Fuel;
        if (!fuel) {
            throw new Error('Fuel document with this id does not exist!');
        }
        res.status(200).json(fuel);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}