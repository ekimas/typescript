"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHash = exports.createHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createHash = (data, salt) => {
    const hash = crypto_1.default.createHmac('sha512', salt);
    hash.update(data);
    return hash.digest('hex');
};
exports.createHash = createHash;
const checkHash = (data, hash, salt) => {
    return (0, exports.createHash)(data, salt) === hash;
};
exports.checkHash = checkHash;
