"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'nunca pares de aprender';
const verifyToken = async (req) => {
    const { authorization } = req.headers;
    const token = (authorization || '').replace('Bearer ', '');
    try {
        const verified = await (0, jsonwebtoken_1.verify)(token, new TextEncoder().encode(JWT_SECRET_KEY));
        return verified;
    }
    catch (e) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
const authMiddleware = async (req, res, next) => {
    try {
        const payload = await (0, exports.verifyToken)(req);
        req.user = { id: payload.userId };
    }
    catch (e) {
        // ignore
    }
    finally {
        next();
    }
};
exports.default = authMiddleware;
