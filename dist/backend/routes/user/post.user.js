"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("../../database");
const request_utils_1 = require("../utils/request.utils");
const hash_utils_1 = require("../utils/hash.utils");
const middleware_utils_1 = require("../utils/middleware.utils");
const SALT = process.env.PASSWORD_SALT ?? 'XYZ';
exports.default = {
    method: 'post',
    path: '/api/user',
    validators: [
        middleware_utils_1.authorize,
        (0, express_validator_1.body)('email').isEmail(),
        (0, express_validator_1.body)('password').not().isEmpty(),
    ],
    handler: async (req, res) => (0, request_utils_1.handleRequest)({
        req,
        res,
        responseSuccessStatus: http_status_codes_1.StatusCodes.CREATED,
        messages: { uniqueConstraintFailed: 'Email must be unique.' },
        execute: async () => {
            const { email, name, password, companyId, eventIds } = req.body;
            const passwordHash = (0, hash_utils_1.createHash)(password, SALT);
            return database_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash,
                    company: {
                        connect: {
                            id: companyId,
                        },
                    },
                    events: {
                        connect: eventIds.map((eventId) => ({
                            id: eventId,
                        })),
                    },
                },
            });
        },
    }),
};
