"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    }
}, { timestamps: true, versionKey: false });
const News = mongoose_1.model('News', newsSchema);
exports.default = News;
