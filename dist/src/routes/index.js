"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clubCategory_router_1 = __importDefault(require("./clubCategory.router"));
const club_router_1 = __importDefault(require("./club.router"));
const upload_router_1 = __importDefault(require("./upload.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/v1', router);
    router.use('/clubCategory', clubCategory_router_1.default);
    router.use('/club', club_router_1.default);
    router.use('/upload', upload_router_1.default);
}
exports.default = routerApi;
