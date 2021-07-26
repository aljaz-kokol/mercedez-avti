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