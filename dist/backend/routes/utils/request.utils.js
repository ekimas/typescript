"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const prisma_utils_1 = require("./prisma.utils");
const handleRequest = async ({ req, res, execute, responseSuccessStatus, responseFailStatus, messages, }) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(responseFailStatus ?? http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    try {
        const result = await execute();
        res.status(responseSuccessStatus ?? http_status_codes_1.StatusCodes.OK).json({
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        const parsedError = err;
        if (parsedError.isCustomError) {
            res.status(parsedError.status).json({
                errors: [parsedError.message],
            });
        }
        else {
            const response = (0, prisma_utils_1.checkPrismaError)(err, messages);
            res.status(response.status).json({
                errors: [response.message],
            });
        }
    }
};
exports.handleRequest = handleRequest;
