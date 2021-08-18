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
exports.createDrive = exports.getDriveFromId = exports.getDrives = void 0;
const drive_model_1 = __importDefault(require("../model/drive.model"));
const getDrives = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drives = yield drive_model_1.default.find();
        res.status(200).json(drives);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getDrives = getDrives;
const getDriveFromId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    try {
        const drive = yield drive_model_1.default.findById(params.driveId);
        if (!drive) {
            throw new Error('Drive document with this id does not exist!');
        }
        res.status(200).json(drive);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getDriveFromId = getDriveFromId;
const createDrive = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    try {
        // Check if Drive document with a given type already exists
        if (yield drive_model_1.default.exists({ type: reqBody.type })) {
            throw new Error('Drive document with this type already exists!');
        }
        const drive = yield drive_model_1.default.create({
            type: reqBody.type
        });
        res.status(201).json({
            message: 'Successfully created a Drive document',
            drive: drive
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
exports.createDrive = createDrive;
