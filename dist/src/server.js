"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)());
app.use((0, cors_1.default)({ "origin": "*" }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});
(0, routes_1.default)(app);
exports.default = app;
