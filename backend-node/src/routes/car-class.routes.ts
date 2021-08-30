import { Router } from 'express';
import { getCarClasses, getCarClassFromId, createCarClass } from '../controller/car-class.controller';
import { isAdmin } from '../middleware/is-admin.middleware';
import { isAuth } from '../middleware/is-auth.middleware';

const router = Router();

router.get('/', getCarClasses);
router.get('/:classId', getCarClassFromId);

router.post('/', [
    isAuth,
    isAdmin
], createCarClass);

export default router;