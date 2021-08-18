"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("../controller/news.controller");
const router = express_1.Router();
router.get('/', news_controller_1.getNews);
router.get('/:newsId', news_controller_1.getNewsFromId);
router.post('/', news_controller_1.createNews);
exports.default = router;
