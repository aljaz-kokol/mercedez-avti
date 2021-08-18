"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gearbox_controller_1 = require("../controller/gearbox.controller");
const router = express_1.Router();
router.get('/', gearbox_controller_1.getGearBoxes);
router.get('/:gearId', gearbox_controller_1.getGearBoxFromId);
router.post('/', gearbox_controller_1.createGearBox);
exports.default = router;
