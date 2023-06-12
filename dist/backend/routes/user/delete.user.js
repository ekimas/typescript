"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const middleware_utils_1 = require("../utils/middleware.utils");
const request_utils_1 = require("../utils/request.utils");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
exports.default = {
    method: 'delete',
    path: '/api/user',
    validators: [middleware_utils_1.authorize],
    handler: async (req, res) => (0, request_utils_1.handleRequest)({
        req,
        res,
        responseSuccessStatus: http_status_codes_1.StatusCodes.CREATED,
        messages: { uniqueConstraintFailed: 'You need a permission' },
        execute: async () => {
            //const id = parseInt(req.query.id as , 10)
            const { id } = req.query;
            const userId = parseInt(id, 10);
            return prisma.user.delete({
                where: {
                    id: userId,
                },
            });
        },
    }),
};
