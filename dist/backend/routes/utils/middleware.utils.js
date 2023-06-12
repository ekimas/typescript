"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jwt_utils_1 = require("./jwt.utils");
const http_status_codes_1 = require("http-status-codes");
const SECRET = process.env.TOKEN_SECRET ?? 'XYZ';
const authorize = (req, res, next) => {
    const token = req.headers.authorization;
    const parsedToken = token?.replace('Bearer ', '');
    const result = (0, jwt_utils_1.verifyToken)(parsedToken ?? '', SECRET);
    if (!token || !result.isValid) {
        res.send(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: [http_status_codes_1.ReasonPhrases.UNAUTHORIZED],
        });
    }
    else {
        next();
    }
};
exports.authorize = authorize;
