import { Router } from 'express';

import { getFuels, getFuelFromId } from '../controller/fuel.controller';


const router = Router();

router.get('/', getFuels);
router.get('/:fuelId', getFuelFromId);

export default router;