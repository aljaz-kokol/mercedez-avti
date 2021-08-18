"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const news_routes_1 = __importDefault(require("./routes/news.routes"));
const car_class_routes_1 = __importDefault(require("./routes/car-class.routes"));
const fuel_routes_1 = __importDefault(require("./routes/fuel.routes"));
const gearbox_routes_1 = __importDefault(require("./routes/gearbox.routes"));
const drive_routes_1 = __importDefault(require("./routes/drive.routes"));
const car_type_routes_1 = __importDefault(require("./routes/car-type.routes"));
const car_routes_1 = __importDefault(require("./routes/car.routes"));
const app = express_1.default();
app.use(express_1.default.json());
app.use('/api/images', express_1.default.static(path_1.default.join('images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-ALlow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    next();
});
// Routes
app.use('/api/news', news_routes_1.default);
app.use('/api/car-class', car_class_routes_1.default);
app.use('/api/fuel', fuel_routes_1.default);
app.use('/api/gearbox', gearbox_routes_1.default);
app.use('/api/drive', drive_routes_1.default);
app.use('/api/car-type', car_type_routes_1.default);
app.use('/api/car', car_routes_1.default);
// Simple Error handling
app.use((err, req, res, next) => {
    res.status(500).json(err);
});
exports.default = app;
