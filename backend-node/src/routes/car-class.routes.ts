import { Router } from 'express';
import { getCarClasses } from '../controller/car-class.controller';

const router = Router();

router.get('/', getCarClasses);

export default router;