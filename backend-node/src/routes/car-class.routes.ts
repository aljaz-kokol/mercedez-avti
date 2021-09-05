import { Router } from 'express';
import { getCarClasses, getCarClassFromId, createCarClass, createSubclass } from '../controller/car-class.controller';
import { isAdmin } from '../middleware/is-admin.middleware';
import { isAuth } from '../middleware/is-auth.middleware';

const router = Router();

router.get('/', getCarClasses);
router.get('/:classId', getCarClassFromId);

// Create car class
router.post('/', [
    isAuth,
    isAdmin
], createCarClass);


// Create subclass of car-class
router.patch('/:classId', [
    isAuth,
    isAdmin
], createSubclass);

export default router;