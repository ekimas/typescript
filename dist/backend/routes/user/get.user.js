"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
exports.default = {
    method: 'get',
    path: '/api/user',
    validators: [],
    handler: async (req, res) => {
        const { id } = req.query;
        const userId = parseInt(id, 10);
        const allUsers = await database_1.prisma.user.findFirst({
            where: { id: userId },
        });
        res.send(allUsers);
    },
};
