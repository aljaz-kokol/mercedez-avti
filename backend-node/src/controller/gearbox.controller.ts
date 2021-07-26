import { Request, Response, NextFunction } from 'express';

import GearBox from '../model/gearbox.model';

export const getGearBoxes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gearBoxes = await GearBox.find();
        res.status(200).json(gearBoxes);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

export const getGearBoxFromId = async (req: Request, res: Response, next: NextFunction) => {
    type RequiredReq = { gearId: string };
    const params = req.params as RequiredReq;
    try {
        const gearBox = await GearBox.findById(params.gearId);
        if (!gearBox) {
            throw new Error('GearBox document with this id does not exist!');
        }
        res.status(200).json(gearBox);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

export const createGearBox = async (req: Request, res: Response, next: NextFunction) => {
    type RequiredReq = { type: string };
    const reqBody = req.body as RequiredReq;
    try {
        // Check if GearBox document with a given type already exists
        if (await GearBox.findOne({ type: reqBody.type })) {
            throw new Error('GearBox document with this type already exists!');
        }
        // Create new GearBox document
        const newGearBox = await new GearBox({
            type: reqBody.type
        }).save();
        // Send back a response
        res.status(201).json({
            message: 'GearBox document successfully created',
            gearBox: newGearBox
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}