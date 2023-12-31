"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticate_1 = require("../services/authenticate");
dotenv_1.default.config();
var store = new user_1.UserStore();
var index = function (_req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, store.index()];
                case 1:
                    user = _a.sent();
                    res.json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(400);
                    res.json(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var show = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, store.show(parseInt(req.params.id))];
                case 1:
                    user = _a.sent();
                    res.json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(400);
                    res.json(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var create = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var user, emailExists, usernameExists, newUser, token, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        address: req.body.address,
                        username: req.body.username,
                        password: req.body.password,
                        isAdmin: req.body.isAdmin
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, store.emailExists(user.email)];
                case 2:
                    emailExists = _a.sent();
                    return [4 /*yield*/, store.usernameExists(user.username)];
                case 3:
                    usernameExists = _a.sent();
                    if (emailExists) {
                        return [2 /*return*/, res.status(400).json({ error: 'Email already exists!' })];
                    }
                    if (usernameExists) {
                        return [2 /*return*/, res.status(400).json({ error: 'Username already exists!' })];
                    }
                    return [4 /*yield*/, store.create(user)];
                case 4:
                    newUser = _a.sent();
                    token = jsonwebtoken_1.default.sign({
                        user: newUser,
                    }, "".concat(process.env.TOKEN_SECRET));
                    return [2 /*return*/, res.json(token)];
                case 5:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.status(400).json(error_3)];
                case 6: return [2 /*return*/];
            }
        });
    });
};
var update = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var user, updates, token, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        id: parseInt(req.params.id),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        address: req.body.address,
                        username: req.body.username,
                        password: req.body.password,
                        isAdmin: req.body.isAdmin
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, store.update(user)];
                case 2:
                    updates = _a.sent();
                    token = jsonwebtoken_1.default.sign({
                        user: updates,
                    }, "".concat(process.env.TOKEN_SECRET));
                    res.status(200).json(token);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    res.status(400);
                    res.json(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var deletes = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var deleteUser, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, store.delete(parseInt(req.params.id))];
                case 1:
                    deleteUser = _a.sent();
                    res.json(deleteUser);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(400);
                    res.json(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var authenticate = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var authUser, token, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, store.authenticate(req.body.username, req.body.password)];
                case 1:
                    authUser = _a.sent();
                    if (authUser === null) {
                        throw new Error('Not Authorized!');
                    }
                    else {
                        token = jsonwebtoken_1.default.sign({
                            user: authUser,
                        }, "".concat(process.env.TOKEN_SECRET));
                        res.json(token);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.status(400);
                    res.json(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var users_route = function (app) {
    app.post('/verify/users', authenticate_1.authenticationToken, index);
    app.post('/verify/user/:id', authenticate_1.authenticationToken, show);
    app.post('/create/user', create);
    app.put('/user/:id', authenticate_1.authenticateUserId, update);
    app.delete('/useR/:id', authenticate_1.authenticateUserId, deletes);
    app.post('/user/authenticate', authenticate);
};
exports.default = users_route;
//# sourceMappingURL=users.js.map