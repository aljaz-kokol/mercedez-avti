import { Router } from 'express';

import { getCars, getCarFromId, createCar } from '../controller/car.controller'

const router = Router();

router.get('/', getCars);
router.get('/:carId', getCarFromId);

router.post('/car', createCar);

export default router;