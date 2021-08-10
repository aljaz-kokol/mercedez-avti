import { Router } from 'express';

import { getCars, getCarFromId, createCar, getCarsFromClass } from '../controller/car.controller'

const router = Router();

router.get('/', getCars);
router.get('/:carId', getCarFromId);
router.get('/class/:classId', getCarsFromClass);

router.post('/', createCar);

export default router;