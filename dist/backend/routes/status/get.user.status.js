"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
exports.default = {
    method: 'get',
    path: '/api/user/status',
    validators: [],
    handler: async (req, res) => {
        const allUsers = await database_1.prisma.user.findMany();
        res.send(allUsers);
    },
};
