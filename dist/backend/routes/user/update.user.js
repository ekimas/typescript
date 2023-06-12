"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const middleware_utils_1 = require("../utils/middleware.utils");
const request_utils_1 = require("../utils/request.utils");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
exports.default = {
    method: 'put',
    path: '/api/user',
    validators: [middleware_utils_1.authorize],
    handler: async (req, res) => (0, request_utils_1.handleRequest)({
        req,
        res,
        responseSuccessStatus: http_status_codes_1.StatusCodes.CREATED,
        messages: { uniqueConstraintFailed: 'You need a permission' },
        execute: async () => {
            try {
                const { name, email, companyId } = req.body;
                const { id } = req.query;
                const userId = parseInt(id, 10);
                if (!name && !email && !companyId) {
                    return res
                        .status(400)
                        .send('At least one field is required');
                }
                else {
                    return prisma.user.update({
                        where: {
                            id: userId,
                        },
                        data: {
                            name,
                            email,
                            company: companyId
                                ? {
                                    connect: { id: companyId },
                                }
                                : undefined,
                        },
                    });
                }
            }
            catch (e) {
                return res
                    .status(500)
                    .json({ error: 'Failed to update user' });
            }
        },
    }),
};
