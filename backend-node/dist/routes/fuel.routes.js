"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fuel_controller_1 = require("../controller/fuel.controller");
const router = express_1.Router();
router.get('/', fuel_controller_1.getFuels);
router.get('/:fuelId', fuel_controller_1.getFuelFromId);
router.post('/', fuel_controller_1.createFuel);
exports.default = router;
