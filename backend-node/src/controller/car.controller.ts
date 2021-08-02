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

export const getCarFromId = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { carId: string };
    const params = req.params as ExpectedReq;
    try {
        const car = await Car.findById(params.carId);
        if (!car) {
            throw new Error('Car document with this id does not exist!');
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
        imagePath: string,
        name: string,
        releaseYear: string,
        doors: number,
        weight: number,
        height: number,
        length: number,
        width: number,
        topSpeed: number
    };
    const reqBody = req.body as ExpectedReq;
    try {
        const car = await Car.create({...reqBody});
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