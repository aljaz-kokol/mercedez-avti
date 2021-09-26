import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import { CustomError } from '../errors/custom.error';
import { ResourceNotFoundError } from '../errors/not-found.error';
import Car from '../model/car.model';
import { ApiImage } from '../util/api-image';
import { getCarClass } from '../util/find-carclass';

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

export const getCarFromId = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { carId: string };
    const params = req.params as ExpectedReq;
    try {
        if (!Types.ObjectId.isValid(params.carId)) {
            const error = new CustomError('Car id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const car = await Car.findById(params.carId);
        if (!car) {
            throw new ResourceNotFoundError('Car document with this id does not exist!');
        }
        res.status(200).json(car);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        } 
        next(err);
        return err;
    }
};

export const createCar = async (req: Request, res: Response, next: NextFunction) => {    
    type ExpectedReq = {
        car: {
            class: string,
            type: string,
            fuel: string,
            engine: {
                kilowatts: number,
                torque: number,
                volume: number
            },
            drive: string,
            gearbox: string,
            name: string,
            releaseYear: string,
            doors: number,
            weight: number,
            height: number,
            length: number,
            width: number,
            topSpeed: number,
            basePrice: number,
        },
        imageNames: string[]
    };
    const reqBody = JSON.parse(req.body.data) as ExpectedReq;    
    try {
        const images: ApiImage[] = [];
        if (req.files && req.files.length > 0) {
            req.files = req.files as Express.Multer.File[];
            req.files.forEach((file, index) => {
                images.push({
                    name: reqBody.imageNames[index],
                    path: `http://localhost:3000/api/images/${file.filename}`
                })
            });
        }
        const car = await Car.create({...reqBody.car, images});
        res.status(201).json({
            message: 'Car document successfully created',
            car
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        } 
        next(err);
        return err;
    }
};

export const getCarsFromClass = async (req: Request, res: Response, next: NextFunction) => {
    const classId = req.params.classId;
    try {
        // Check if car class with given id exists else throw an error
        if (!await getCarClass(classId)) {
            throw new ResourceNotFoundError(`Can't find cars related to this class. Class does not exits.`);
        }
        const cars = await Car.find({ class: classId });
        res.status(200).json(cars);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}