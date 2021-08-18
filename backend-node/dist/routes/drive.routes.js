"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const drive_controller_1 = require("../controller/drive.controller");
const router = express_1.Router();
router.get('/', drive_controller_1.getDrives);
router.get('/:driveId', drive_controller_1.getDriveFromId);
router.post('/', drive_controller_1.createDrive);
exports.default = router;
