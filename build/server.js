"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
const address = '0.0.0.3050';
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/', function (_req, res) {
    res.send('You are connected to the Database using an Express server...');
});
app.listen(3050, function () {
    console.log(`Starting app using a server on: localhost: ${address}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map