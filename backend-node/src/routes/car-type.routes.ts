import { Router } from 'express';

import { getCarTypes, getCarTypeFromId, createCarType } from '../controller/car-type.controller';

const router = Router();

router.get('/', getCarTypes);
router.get('/:typeId', getCarTypeFromId)


router.post('/', createCarType);

export default router;