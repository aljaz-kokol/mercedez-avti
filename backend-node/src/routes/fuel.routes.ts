import { Router } from 'express';

import { getFuels, getFuelFromId, createFuel } from '../controller/fuel.controller';

const router = Router();

router.get('/', getFuels);
router.get('/:fuelId', getFuelFromId);

router.post('/', createFuel);

export default router;