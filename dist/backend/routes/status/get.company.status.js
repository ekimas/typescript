"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
exports.default = {
    method: 'get',
    path: '/api/company/status',
    validators: [],
    handler: async (req, res) => {
        const allCompanies = await database_1.prisma.company.findMany();
        res.send(allCompanies);
    },
};
