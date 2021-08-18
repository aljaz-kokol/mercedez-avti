"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carTypeSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    }
});
const CarType = mongoose_1.model('CarType', carTypeSchema);
exports.default = CarType;
