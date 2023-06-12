"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expiresIn || '30d',
    });
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    const parsedToken = token.replace('Bearer ', '');
    try {
        return {
            isValid: true,
            content: jsonwebtoken_1.default.verify(parsedToken, secret),
        };
    }
    catch (err) {
        return {
            isValid: false,
            content: {},
        };
    }
};
exports.verifyToken = verifyToken;
