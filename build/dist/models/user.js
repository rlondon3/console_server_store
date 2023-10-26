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
exports.UserStore = void 0;
var database_1 = __importDefault(require("../database"));
var dotenv_1 = __importDefault(require("dotenv"));
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
var _a = process.env, SALT_ROUNDS = _a.SALT_ROUNDS, PEPPER = _a.PEPPER;
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users;';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Can't retrieve users: ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE id=($1);';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Can't find user: ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, res, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO users (firstname, lastname, email, address, username, password, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                        hash = bcrypt_1.default.hashSync(user.password + "".concat(PEPPER, ".processs.env"), parseInt("".concat(SALT_ROUNDS, ".process.env")));
                        return [4 /*yield*/, conn.query(sql, [user.firstname, user.lastname, user.email, user.address, user.username, hash, user.isAdmin])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Could not add user\" ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.update = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, hash, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE users SET firstname=($1), lastname=($2), email=($3), address=($4), username=($5), password=($6), isAdmin=($7) WHERE id=($8) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        hash = bcrypt_1.default.hashSync(user.password + "".concat(PEPPER), parseInt("".concat(SALT_ROUNDS)));
                        return [4 /*yield*/, conn.query(sql, [user.firstname, user.lastname, user.email, user.address, user.username, hash, user.isAdmin, user.id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Could not update user: ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, alterSequenceSql, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sql = 'DELETE FROM users WHERE id=($1);';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        res = _a.sent();
                        alterSequenceSql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, conn.query(alterSequenceSql)];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 4:
                        error_5 = _a.sent();
                        throw new Error("Could not delete user: ".concat(error_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE username=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        res = _a.sent();
                        if (res.rows.length) {
                            bcrypt_1.default.compareSync(password + "".concat(PEPPER), res.rows[0].password);
                            return [2 /*return*/, res.rows[0]];
                        }
                        return [2 /*return*/, null];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Could not authenticate: ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.emailExists = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 4, 5]);
                        sql = 'SELECT COUNT(*) FROM users WHERE email = $1';
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 3:
                        res = _a.sent();
                        if (res.rows) {
                            return [2 /*return*/, parseInt(res.rows[0].count) > 0];
                        }
                        return [2 /*return*/, false];
                    case 4:
                        conn.release();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.usernameExists = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 4, 5]);
                        sql = 'SELECT COUNT(*) FROM users WHERE username = $1';
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 3:
                        res = _a.sent();
                        if (res.rows) {
                            return [2 /*return*/, parseInt(res.rows[0].count) > 0];
                        }
                        return [2 /*return*/, false];
                    case 4:
                        conn.release();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
//# sourceMappingURL=user.js.map