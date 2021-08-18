"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_class_controller_1 = require("../controller/car-class.controller");
const router = express_1.Router();
router.get('/', car_class_controller_1.getCarClasses);
router.get('/:classId', car_class_controller_1.getCarClassFromId);
router.post('/', car_class_controller_1.createCarClass);
exports.default = router;
