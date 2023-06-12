"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPrismaError = void 0;
const runtime_1 = require("@prisma/client/runtime");
const http_status_codes_1 = require("http-status-codes");
const getPrismaErrorResponse = (message) => {
    return {
        status: http_status_codes_1.StatusCodes.BAD_REQUEST,
        message: message ?? http_status_codes_1.ReasonPhrases.BAD_REQUEST,
    };
};
const checkPrismaError = (err, messages) => {
    const response = {
        status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
    if (err instanceof runtime_1.PrismaClientKnownRequestError) {
        const code = err.code;
        switch (code) {
            case 'P2002':
                return getPrismaErrorResponse(messages?.uniqueConstraintFailed);
        }
    }
    return response;
};
exports.checkPrismaError = checkPrismaError;
