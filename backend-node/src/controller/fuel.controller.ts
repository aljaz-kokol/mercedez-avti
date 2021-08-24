import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { ResourceAlreadyExistsError } from '../errors/already-exists.error';
import { CustomError } from '../errors/custom.error';
import { ResourceNotFoundError } from '../errors/not-found.error';

import Fuel  from '../model/fuel.model';

export const getFuels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fuels = await Fuel.find();
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
        if (!Types.ObjectId.isValid(params.fuelId)) {
            const error = new CustomError('Fuel id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const fuel = await Fuel.findById(params.fuelId);
        if (!fuel) {
            throw new ResourceNotFoundError('Fuel document with this id does not exist!');
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

export const createFuel = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { type: string };    
    const reqBody = req.body  as ExpectedReq;

    try {
        //Check if a Fuel document with a given type already exists
        if (await Fuel.findOne({ type: reqBody.type })) {
            throw new ResourceAlreadyExistsError('Fuel document with this type already exists!');
        }
        const newFuel = await new Fuel({
            type: reqBody.type
        }).save();

        res.status(201).json({
            message: 'Successfully created a Fuel document',
            fuel: newFuel
        })
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}