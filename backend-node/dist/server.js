"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const variables_util_1 = require("./util/variables.util");
mongoose_1.default.connect(variables_util_1.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app_1.default.listen(3000, () => {
        console.log('Now listening on port 3000');
    });
}).catch(err => console.log(err));
