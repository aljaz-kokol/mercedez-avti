"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGearBox = exports.getGearBoxFromId = exports.getGearBoxes = void 0;
const gearbox_model_1 = __importDefault(require("../model/gearbox.model"));
const getGearBoxes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gearBoxes = yield gearbox_model_1.default.find();
        res.status(200).json(gearBoxes);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getGearBoxes = getGearBoxes;
const getGearBoxFromId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    try {
        const gearBox = yield gearbox_model_1.default.findById(params.gearId);
        if (!gearBox) {
            throw new Error('GearBox document with this id does not exist!');
        }
        res.status(200).json(gearBox);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getGearBoxFromId = getGearBoxFromId;
const createGearBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    try {
        // Check if GearBox document with a given type already exists
        if (yield gearbox_model_1.default.findOne({ type: reqBody.type })) {
            throw new Error('GearBox document with this type already exists!');
        }
        // Create new GearBox document
        const newGearBox = yield new gearbox_model_1.default({
            type: reqBody.type
        }).save();
        // Send back a response
        res.status(201).json({
            message: 'GearBox document successfully created',
            gearBox: newGearBox
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.createGearBox = createGearBox;
