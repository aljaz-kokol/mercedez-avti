import {Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/custom.error';
import { Types } from 'mongoose';

import CarClass from '../model/car-class.model';
import { ResourceAlreadyExistsError } from '../errors/already-exists.error';
import { ResourceNotFoundError } from '../errors/not-found.error';

export const getCarClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carClasses = await CarClass.find();
        res.status(200).json(carClasses);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

export const getCarClassFromId = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { classId: string };
    const params = (req.params) as ExpectedReq;
    try {
        if (!Types.ObjectId.isValid(params.classId)) {
            const error = new CustomError('CarClass id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const carClass = await CarClass.findById(params.classId);
        if (!carClass) {
            throw new ResourceNotFoundError('CarClass with this id does not exists!');
        }
        res.status(200).json(carClass);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

export const createCarClass = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        name: string
    };
    const reqBody = (req.body) as ExpectedReq;
    
    try {
        // Check if CarClass with this name already exists
        if (await CarClass.findOne({name: reqBody.name})) {
            throw new ResourceAlreadyExistsError('CasClass with this name already exists!');
        }
        const carClass = new CarClass({
            name: reqBody.name
        });
        const savedCarClass = await carClass.save();
        res.status(201).json({
            carClass: savedCarClass,
            message: 'CarClass successfully created'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    } 
}