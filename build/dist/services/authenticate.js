"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserId = exports.authenticationToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var authenticationToken = function (req, res, next) {
    try {
        var authHead = req.headers.authorization;
        var token = authHead.split(' ')[1];
        jsonwebtoken_1.default.verify(token, "".concat(process.env.TOKEN_SECRET));
        next();
    }
    catch (error) {
        res.status(400);
        res.json("Not authorized: ".concat(error));
    }
};
exports.authenticationToken = authenticationToken;
var authenticateUserId = function (req, res, next) {
    try {
        var authHead = req.headers.authorization;
        var token = authHead.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, "".concat(process.env.TOKEN_SECRET));
        var id = decoded.user.id;
        if (id !== parseInt(req.params.id)) {
            throw new Error('ID is invalid!');
        }
        next();
    }
    catch (error) {
        res.status(401);
        res.json(error);
        return;
    }
};
exports.authenticateUserId = authenticateUserId;
//# sourceMappingURL=authenticate.js.map