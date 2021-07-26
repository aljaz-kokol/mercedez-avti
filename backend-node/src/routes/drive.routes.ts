import { Router } from 'express';

import { getDrives } from '../controller/drive.controller';

const router = Router();

router.get('/', getDrives);

export default router;