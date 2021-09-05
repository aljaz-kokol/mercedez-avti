import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom.error';
import User from '../model/user.model';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId);
        if (!user?.isAdmin) {
            const error = new CustomError('User does not have admin privileges');
            error.statusCode = 401;
            error.name = 'Not Authorized';
            throw error;
        }
        next();
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}