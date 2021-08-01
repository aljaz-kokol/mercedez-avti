import { Router } from 'express';

import { getCars } from '../controller/car.controller'

const router = Router();

router.get('/', getCars);

export default router;