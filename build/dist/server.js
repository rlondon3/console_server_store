"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = (0, express_1.default)();
var address = '0.0.0.3051';
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/', function (_req, res) {
    res.send('You are connected to the Database using an Express server...');
});
(0, orders_1.default)(app);
(0, products_1.default)(app);
(0, users_1.default)(app);
app.listen(3051, function () {
    console.log("Starting app using the server on localhost: ".concat(address));
});
exports.default = app;
//# sourceMappingURL=server.js.map