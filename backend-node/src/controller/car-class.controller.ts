import {Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/custom.error';
import { Types } from 'mongoose';

import CarClass from '../model/car-class.model';

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
            const error = new CustomError('Car-Class id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const carClass = await CarClass.findById(params.classId);
        if (!carClass) {
            const error = new CustomError('car-class with this id does not exist!');
            error.name = 'Resource was not found';
            error.statusCode = 404;
            throw error;
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
            const error = new CustomError('CarClass with this name already exists!');
            error.name = 'Resource already exists';
            error.statusCode = 409;
            throw error;    
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