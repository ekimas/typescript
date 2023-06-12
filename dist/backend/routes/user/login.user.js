"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("../../database");
const request_utils_1 = require("../utils/request.utils");
const hash_utils_1 = require("../utils/hash.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const SALT = process.env.PASSWORD_SALT ?? 'XYZ';
const SECRET = process.env.TOKEN_SECRET ?? 'XYZ';
exports.default = {
    method: 'get',
    path: '/api/login',
    validators: [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').not().isEmpty()],
    handler: async (req, res) => (0, request_utils_1.handleRequest)({
        req,
        res,
        responseSuccessStatus: http_status_codes_1.StatusCodes.OK,
        responseFailStatus: http_status_codes_1.StatusCodes.UNAUTHORIZED,
        execute: async () => {
            const { email, password } = req.body;
            const passwordHash = (0, hash_utils_1.createHash)(password, SALT);
            const user = await database_1.prisma.user.findFirst({ where: { email } });
            const passwordValid = user
                ? user.password === passwordHash
                : false;
            if (!user || !passwordValid)
                throw {
                    status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                    message: http_status_codes_1.ReasonPhrases.UNAUTHORIZED,
                    isCustomError: true,
                };
            return {
                token: (0, jwt_utils_1.createToken)(user, SECRET, '7d'),
            };
        },
    }),
};
