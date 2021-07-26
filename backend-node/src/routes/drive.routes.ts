import { Router } from 'express';

import { getDrives, getDriveFromId, createDrive } from '../controller/drive.controller';

const router = Router();

router.get('/', getDrives);
router.get('/:driveId', getDriveFromId);

router.post('/', createDrive);

export default router;