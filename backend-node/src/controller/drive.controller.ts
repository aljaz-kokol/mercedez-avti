import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { ResourceAlreadyExistsError } from '../errors/already-exists.error';
import { CustomError } from '../errors/custom.error';
import { ResourceNotFoundError } from '../errors/not-found.error';

import Drive from '../model/drive.model';

export const getDrives = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const drives = await Drive.find();
        res.status(200).json(drives);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};

export const getDriveFromId  = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { driveId: string };
    const params = req.params as ExpectedReq;
    try {
        if (!Types.ObjectId.isValid(params.driveId)) {
            const error = new CustomError('Drive id is invalid');
            error.statusCode = 400;
            throw error;
        }
        const drive = await Drive.findById(params.driveId);
        if (!drive) {
            throw new ResourceNotFoundError('Drive document with this id does not exist!');
        }
        res.status(200).json(drive);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};

export const createDrive = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = { type: string };
    const reqBody = req.body as ExpectedReq;
    try {
        // Check if Drive document with a given type already exists
        if (await Drive.exists({ type: reqBody.type })) {
            throw new ResourceAlreadyExistsError('Drive document with this type already exists!');
        }
        const drive = await Drive.create({
            type: reqBody.type
        });
        res.status(201).json({
            message: 'Successfully created a Drive document',
            drive: drive
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};