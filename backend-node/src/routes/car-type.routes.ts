import { Router } from 'express';

import { getCarTypes, getCarTypeFromId } from '../controller/car-type.controller';

const router = Router();

router.get('/', getCarTypes);
router.get('/:typeId', getCarTypeFromId)

export default router;