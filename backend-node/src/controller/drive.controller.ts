import { Request, Response, NextFunction } from 'express';

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
        const drive = await Drive.findById(params.driveId);
        if (!drive) {
            throw new Error('Drive document with this id does not exist!');
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