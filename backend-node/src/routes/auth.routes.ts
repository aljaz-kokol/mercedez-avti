import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login } from '../controller/auth.controller';

import User from '../model/user.model';

const router = Router();

router.post('/signup', [
    body('email', 'Please enter a valid email').isEmail()
    .custom(async value => {
        const exists = await User.exists({ email: value });
        if (exists) {
            return Promise.reject('E-mail address already exists!');
        }
    }),
    body('username').trim().notEmpty().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .custom(async value => {
        const exists = await User.exists({ username: value });
        if (exists) {
            return Promise.reject('Username already exists!');
        }
    }),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('passwordConfirmation').trim().custom((value, { req }) => {
        console.log(`Value: ${value}\npassword: ${req.body.password}`);
        if (value !== req.body.password)
            throw new Error('Password confirmation does not match password!');
        return true;
    })
], signup);

router.post('/login', login);

export default router;