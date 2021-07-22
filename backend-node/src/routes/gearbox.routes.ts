import { Router } from 'express';

import { getGearBoxes, getGearBoxFromId, createGearBox } from '../controller/gearbox.controller';

const router = Router();

router.get('/', getGearBoxes);
router.get('/:gearId', getGearBoxFromId)

router.post('/', createGearBox);

export default router;