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
exports.getCarsFromClass = exports.createCar = exports.getCarFromId = exports.getCars = void 0;
const car_class_model_1 = __importDefault(require("../model/car-class.model"));
const car_model_1 = __importDefault(require("../model/car.model"));
const getCars = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield car_model_1.default.find();
        res.status(200).json(cars);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getCars = getCars;
const getCarFromId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    try {
        const car = yield car_model_1.default.findById(params.carId);
        if (!car) {
            throw new Error('Car document with this id does not exist!');
        }
        res.status(200).json(car);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getCarFromId = getCarFromId;
const createCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    try {
        const car = yield car_model_1.default.create(Object.assign({}, reqBody));
        res.status(201).json({
            message: 'Car document successfully created',
            car
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
exports.createCar = createCar;
const getCarsFromClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const classId = req.params.classId;
    try {
        // Check if car class with given id exists else throw an error
        if (!(yield car_class_model_1.default.exists({ _id: classId }))) {
            throw new Error(`Can't find cars related to this class. Class does not exist`);
        }
        const cars = yield car_model_1.default.find({ class: classId });
        res.status(200).json(cars);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getCarsFromClass = getCarsFromClass;
