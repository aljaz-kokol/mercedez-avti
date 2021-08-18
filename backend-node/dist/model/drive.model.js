"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const driveSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    }
});
const Drive = mongoose_1.model('Drive', driveSchema);
exports.default = Drive;
