import { Router } from 'express';

import { getCarTypes } from '../controller/car-type.controller';

const router = Router();

router.get('/', getCarTypes);

export default router;