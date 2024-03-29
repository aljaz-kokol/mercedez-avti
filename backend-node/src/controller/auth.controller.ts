import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { CustomError } from '../errors/custom.error';
import { jwtPrivateKey } from '../util/variables.util';
import User from '../model/user.model';
import CarType from '../model/car-type.model';
import { ResourceNotFoundError } from '../errors/not-found.error';

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
            throw new CustomError(
                'Validation failed!', 
                errors.array().map(err => {
                    return { 
                        parameter: err.param,
                        message: err.msg
                     };
                }),
                422
            );
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({
            username: username,
            email: email,
            password: passwordHash
        });
        res.status(201).json({
            message: 'Account successfully created!',
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
    type ExpectedReq = {
        username: string;
        password: string;
    };
    const tokenExpiration = 3600; // 3600 --> 60min
    const reqBody = req.body as ExpectedReq;
    const username = reqBody.username;
    const password = reqBody.password;
    try {
        const user = await User.findOne({$or: [
            { email: username },
            { username: username }
        ]});
        // Check if the user with the given email or username was found and that the given password is correct
        if (!user || !bcrypt.compareSync(password, user.password)) {
            const error = new CustomError('Incorrect username or password');
            error.statusCode = 401;
            throw error;
        }
        // Create a JSON Web Token (JWT) that expires in 20min
        const token = jwt.sign({
            username: username,
            userId: user._id
        }, 
        jwtPrivateKey, 
        { expiresIn: tokenExpiration });
        
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            expiresIn: tokenExpiration
        });
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
}

export const getUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!isValidObjectId(req.userId)) {
            const error = new CustomError('User id is invalid');
            error.statusCode = 400;
            throw error;
        }
        if (!await User.exists({ _id: req.userId })) {
            throw new ResourceNotFoundError('User with this id does not exist');
        }
        const user = await User.findById(req.userId);
        res.status(200).json({
            userStatus: user?.isAdmin
        });
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}