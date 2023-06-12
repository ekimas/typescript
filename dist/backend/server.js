"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes"));
const startServer = ({ port, corsOptions, limiter }) => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)(corsOptions));
    app.disable('x-powered-by');
    app.use((0, express_rate_limit_1.default)({ windowMs: limiter.time, max: limiter.max }));
    app.use(express_1.default.json());
    app.use(routes_1.default);
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};
exports.startServer = startServer;
