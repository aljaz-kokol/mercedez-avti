import { Router } from 'express';

import { getCars, getCarFromId, createCar, getCarsFromClass } from '../controller/car.controller'
import { isAdmin } from '../middleware/is-admin.middleware';
import { isAuth } from '../middleware/is-auth.middleware';
import imageUpload from '../util/image-upload';

const router = Router();

router.get('/', getCars);
router.get('/:carId', getCarFromId);
router.get('/class/:classId', getCarsFromClass);

router.post('/', [
    isAuth,
    isAdmin,
    imageUpload.array('images'),
], createCar);

export default router;