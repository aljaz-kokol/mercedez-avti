import { Router } from 'express';

import { getDrives, getDriveFromId } from '../controller/drive.controller';

const router = Router();

router.get('/', getDrives);
router.get('/:driveId', getDriveFromId);

export default router;