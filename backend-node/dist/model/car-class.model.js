"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carClassSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
});
const CarClass = mongoose_1.model('CarClass', carClassSchema);
exports.default = CarClass;
