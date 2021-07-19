import { Router } from 'express';
import { getCarClasses, getCarClassFromId } from '../controller/car-class.controller';

const router = Router();

router.get('/', getCarClasses);
router.get('/:classId', getCarClassFromId);

export default router;