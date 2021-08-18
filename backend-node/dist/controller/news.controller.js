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
exports.createNews = exports.getNewsFromId = exports.getNews = void 0;
const news_model_1 = __importDefault(require("../model/news.model"));
// Get all news documents from the database
const getNews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield news_model_1.default.find();
        res.status(200).json(news);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getNews = getNews;
// Get one news document with specified id
const getNewsFromId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqParams = req.params;
    const newsId = reqParams.newsId;
    try {
        const news = yield news_model_1.default.findById(newsId);
        if (!news) {
            throw new Error('News document with this id does not exist');
        }
        res.status(200).json(news);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
});
exports.getNewsFromId = getNewsFromId;
// Create a new news document and save it in the database
const createNews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const title = reqBody.title;
    const body = reqBody.body;
    const summary = reqBody.summary;
    const imagePath = reqBody.imagePath;
    const mongoNews = new news_model_1.default({
        title: title,
        body: body,
        summary: summary,
        imagePath: imagePath
    });
    try {
        // Check if news document with a given title already exists
        if (yield news_model_1.default.findOne({ title: title })) {
            throw Error('News with this title already exists');
        }
        const saveNews = yield mongoNews.save();
        res.status(201).json({
            message: 'News successfully created',
            news: saveNews
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
exports.createNews = createNews;
