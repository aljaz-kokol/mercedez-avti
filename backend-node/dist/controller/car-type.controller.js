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
exports.createCarType = exports.getCarTypeFromId = exports.getCarTypes = void 0;
const car_type_model_1 = __importDefault(require("../model/car-type.model"));
const getCarTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carTypes = yield car_type_model_1.default.find();
        res.status(200).json(carTypes);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getCarTypes = getCarTypes;
const getCarTypeFromId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    try {
        const carType = yield car_type_model_1.default.findById(params.typeId);
        if (!carType) {
            throw new Error('CarType document with this id does not exist!');
        }
        res.status(200).json(carType);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getCarTypeFromId = getCarTypeFromId;
const createCarType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    try {
        // Check if CarType with a given id already exists
        if (yield car_type_model_1.default.exists({ type: reqBody.type })) {
            throw new Error('CarType document with this type already exists!');
        }
        const carType = yield car_type_model_1.default.create({
            type: reqBody.type,
            abbreviation: reqBody.abbreviation
        });
        res.status(201).json({
            message: 'Successfully created a CarType document',
            carType
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
exports.createCarType = createCarType;
