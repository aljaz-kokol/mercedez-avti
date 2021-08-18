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
exports.createFuel = exports.getFuelFromId = exports.getFuels = void 0;
const fuel_model_1 = __importDefault(require("../model/fuel.model"));
const getFuels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fuels = yield fuel_model_1.default.find();
        res.status(200).json(fuels);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getFuels = getFuels;
const getFuelFromId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    try {
        const fuel = yield fuel_model_1.default.findById(params.fuelId);
        if (!fuel) {
            throw new Error('Fuel document with this id does not exist!');
        }
        res.status(200).json(fuel);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getFuelFromId = getFuelFromId;
const createFuel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    try {
        //Check if a Fuel document with a given type already exists
        if (yield fuel_model_1.default.findOne({ type: reqBody.type })) {
            throw new Error('Fuel document with this type already exists!');
        }
        const newFuel = yield new fuel_model_1.default({
            type: reqBody.type
        }).save();
        res.status(201).json({
            message: 'Successfully created a Fuel document',
            fuel: newFuel
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
exports.createFuel = createFuel;
