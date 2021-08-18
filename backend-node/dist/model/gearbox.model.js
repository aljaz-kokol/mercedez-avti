"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gearBoxSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    }
});
const GearBox = mongoose_1.model('GearBox', gearBoxSchema);
exports.default = GearBox;
