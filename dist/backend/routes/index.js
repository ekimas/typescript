"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_user_status_1 = __importDefault(require("./status/get.user.status"));
const get_company_status_1 = __importDefault(require("./status/get.company.status"));
const post_user_1 = __importDefault(require("./user/post.user"));
const login_user_1 = __importDefault(require("./user/login.user"));
const delete_user_1 = __importDefault(require("./user/delete.user"));
const get_user_1 = __importDefault(require("./user/get.user"));
const update_user_1 = __importDefault(require("./user/update.user"));
const post_company_1 = __importDefault(require("./company/post.company"));
const post_event_1 = __importDefault(require("./event/post.event"));
const router = express_1.default.Router();
// home page route
router.get('/', (req, res) => {
    res.send('Example home page');
});
const apiRoutes = [
    get_company_status_1.default,
    get_user_status_1.default,
    post_user_1.default,
    login_user_1.default,
    delete_user_1.default,
    get_user_1.default,
    update_user_1.default,
    post_event_1.default,
    post_company_1.default,
];
apiRoutes.forEach((route) => router[route.method](route.path, route.validators, route.handler));
exports.default = router;
