"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_type_controller_1 = require("../controller/car-type.controller");
const router = express_1.Router();
router.get('/', car_type_controller_1.getCarTypes);
router.get('/:typeId', car_type_controller_1.getCarTypeFromId);
router.post('/', car_type_controller_1.createCarType);
exports.default = router;
