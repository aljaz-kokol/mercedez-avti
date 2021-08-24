import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import { CustomError } from '../errors/custom.error';
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
        if (!Types.ObjectId.isValid(params.typeId)) {
            const error = new CustomError('CarType id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const carType = await CarType.findById(params.typeId);
        if (!carType) {
            const error = new CustomError('CarType document with this id does not exist!');
            error.name = 'Resource was not found';
            error.statusCode = 404;
            throw error;
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

export const createCarType = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        type: string;
        abbreviation: string;
    };
    const reqBody = req.body as ExpectedReq;
    try {
        // Check if CarType with a given id already exists
        if (await CarType.exists({ type: reqBody.type })) {
            const error = new CustomError('CarType document with this type already exists!');
            error.name = 'Resource already exists';
            error.statusCode = 409;
            throw error;
        }
        const carType = await CarType.create({
            type: reqBody.type,
            abbreviation: reqBody.abbreviation
        });
        res.status(201).json({
            message: 'Successfully created a CarType document',
            carType
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};