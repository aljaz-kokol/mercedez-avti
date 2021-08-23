import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/user.model';
import { CustomError } from '../errors/custom.error';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        username: string;
        email: string;
        password: string;
    };
    const reqBody = req.body as ExpectedReq;
    const errors = validationResult(req);

    const username = reqBody.username;
    const email = reqBody.email;
    const password = reqBody.password;
    try {
        if (!errors.isEmpty()) {
            throw new CustomError('Validation failed!', errors.array(), 422);
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({
            username: username,
            email: email,
            password: passwordHash
        });
        res.status(201).json({
            message: 'User created!',
            user
        });
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}