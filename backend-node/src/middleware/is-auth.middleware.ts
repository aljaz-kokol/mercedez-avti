import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { CustomError } from '../errors/custom.error';
import { jwtPrivateKey } from '../util/variables.util';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    // Get value from the Authorization header
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new CustomError('Not Authenticated');
        error.statusCode = 401;
        error.name = 'Authentication error'
        throw error;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, jwtPrivateKey) as { username: string; userId: string };
        if (!decodedToken) {
            const error = new CustomError('Not Authenticated');
            error.statusCode = 401;
            error.name = 'Authentication error'
            throw error;
        }
        req.userId = decodedToken.userId;
        next();
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    
}