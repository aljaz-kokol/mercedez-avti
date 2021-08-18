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
exports.createCarClass = exports.getCarClassFromId = exports.getCarClasses = void 0;
const car_class_model_1 = __importDefault(require("../model/car-class.model"));
const getCarClasses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carClasses = yield car_class_model_1.default.find();
        res.status(200).json(carClasses);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getCarClasses = getCarClasses;
const getCarClassFromId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = (req.params);
    try {
        const carClass = yield car_class_model_1.default.findById(params.classId);
        if (!carClass) {
            throw new Error('car-class with this id does not exist!');
        }
        res.status(200).json(carClass);
    }
    catch (err) {
        if (!err.stautsCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getCarClassFromId = getCarClassFromId;
const createCarClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = (req.body);
    try {
        // Check if CarClass with this name already exists
        if (yield car_class_model_1.default.findOne({ name: reqBody.name })) {
            throw new Error('CarClass with this name already exists!');
        }
        const carClass = new car_class_model_1.default({
            name: reqBody.name
        });
        const savedCarClass = yield carClass.save();
        res.status(201).json({
            carClass: savedCarClass,
            message: 'CarClass successfully created'
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
exports.createCarClass = createCarClass;
