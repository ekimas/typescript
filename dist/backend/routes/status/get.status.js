"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    method: 'get',
    path: '/api/status',
    validators: [],
    handler: async (req, res) => {
        res.send(`I'm alive!`);
    },
};
