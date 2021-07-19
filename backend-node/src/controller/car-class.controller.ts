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

export const getCarClassFromId = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { classId: string };
    const params = (req.params) as ExpectedReq;
    try {
        const carClass = await CarClassMongo.findById(params.classId);
        if (!carClass) {
            throw new Error('car-class with this id does not exist!');
        }
        res.status(200).json(carClass);
    } catch (err) {
        if (!err.stautsCode) {
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
        if (await CarClassMongo.findOne({name: reqBody.name})) {
            throw new Error('CarClass with this name already exists!');
        }

        const carClass = new CarClassMongo({
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