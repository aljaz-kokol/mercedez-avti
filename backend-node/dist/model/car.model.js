"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CarClass',
        required: true
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CarType',
        required: true
    },
    fuel: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Fuel',
        required: true
    },
    drive: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Drive',
        required: true
    },
    gearbox: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'GearBox',
        required: true
    },
    engine: {
        type: {
            kilowatts: {
                type: Number,
                required: true
            },
            torque: {
                type: Number,
                required: true
            },
            volume: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Date,
        required: true,
    },
    doors: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    topSpeed: {
        type: Number,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    }
});
const Car = mongoose_1.model('Car', carSchema);
exports.default = Car;
