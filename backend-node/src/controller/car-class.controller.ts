import {Request, Response, NextFunction, request} from 'express';
import { CustomError } from '../errors/custom.error';
import { isValidObjectId } from 'mongoose';

import CarClass, { CarClassDocument } from '../model/car-class.model';
import { ResourceAlreadyExistsError } from '../errors/already-exists.error';
import { ResourceNotFoundError } from '../errors/not-found.error';
import { getCarClass, getCarClassWithNewSubclass } from '../util/find-carclass';
import { ApiImage } from '../util/api-image';

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
        if (!isValidObjectId(params.classId)) {
            const error = new CustomError('CarClass id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const carClass = await getCarClass(params.classId);
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
        name: string;
        subclasses?: CarClassDocument[];
        images?: ApiImage[];
    };
    const reqBody = (req.body) as ExpectedReq;
    
    try {
        // Check if CarClass with this name already exists
        if (await CarClass.findOne({name: reqBody.name})) {
            throw new ResourceAlreadyExistsError('CasClass with this name already exists!');
        }
        const carClass = new CarClass({
            name: reqBody.name,
            subclasses: reqBody.subclasses || [],
            images: reqBody.images || []
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

export const createSubclass = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        name: string;
        subclasses?: CarClassDocument[];
        images?: ApiImage[];
    };
    const reqBody = (req.body) as ExpectedReq;
    try {
        // Check the validity of classId
        if (!isValidObjectId(req.params.classId)) {
            const error = new CustomError('CarClass id is invalid');
            error.statusCode = 400;
            throw error;
        }
        // Check if CarClass with the given id exists
        const carClass = await getCarClassWithNewSubclass(req.params.classId, reqBody.name, reqBody.subclasses, reqBody.images);
        if (!carClass) {
            throw new ResourceNotFoundError('CarClass with this id does not exist');
        }
        
        let updatedCarClass = await CarClass.findById(carClass._id);
        if (!updatedCarClass) {
            throw new ResourceNotFoundError('CarClass with this id does not exist');
        }
        updatedCarClass.subclasses = carClass.subclasses;
        await updatedCarClass.save();
        // Return response with confirmation message and status code of 201
        res.status(200).json({
            message: 'Successfully added a subclass'
        })
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}