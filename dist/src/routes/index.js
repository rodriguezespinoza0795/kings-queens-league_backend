"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const avocado_router_1 = __importDefault(require("./avocado.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/v1', router);
    router.use('/avocado', avocado_router_1.default);
}
exports.default = routerApi;
