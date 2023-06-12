"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_utils_1 = require("../utils/middleware.utils");
const express_validator_1 = require("express-validator");
const request_utils_1 = require("../utils/request.utils");
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("../../database");
exports.default = {
    method: 'post',
    path: '/api/company',
    validators: [middleware_utils_1.authorize, (0, express_validator_1.body)('name').not().isEmpty()],
    handler: async (req, res) => (0, request_utils_1.handleRequest)({
        req,
        res,
        responseSuccessStatus: http_status_codes_1.StatusCodes.CREATED,
        messages: {
            uniqueConstraintFailed: 'Name of the company has to be unique.',
        },
        execute: async () => {
            const { name } = req.body;
            return database_1.prisma.company.create({
                data: {
                    name,
                },
            });
        },
    }),
};
