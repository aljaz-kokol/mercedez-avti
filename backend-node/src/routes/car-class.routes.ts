import { Router } from 'express';
import { getCarClasses, getCarClassFromId, createCarClass } from '../controller/car-class.controller';

const router = Router();

router.get('/', getCarClasses);
router.get('/:classId', getCarClassFromId);

router.post('/', createCarClass);

export default router;