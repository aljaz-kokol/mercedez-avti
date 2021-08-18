"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fuelSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    }
});
const Fuel = mongoose_1.model('Fuel', fuelSchema);
exports.default = Fuel;
