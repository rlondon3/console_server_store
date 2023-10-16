"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../database"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
dotenv_1.default.config();
const { SALT_ROUNDS, PEPPER } = process.env;
class UserStore {
    index() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users;';
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql);
                conn.release();
                return res.rows;
            }
            catch (error) {
                throw new Error(`Can't retrieve users: ${error}`);
            }
        });
    }
    show(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1);';
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows[0];
            }
            catch (error) {
                throw new Error(`Can't find user: ${error}`);
            }
        });
    }
    create(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (usersname, passowrd, isAdmin) VALUES ($1, $2, $3) RETURNING *;';
                const hash = bcrypt_1.default.hashSync(user.password + `${PEPPER}.processs.env`, parseInt(`${SALT_ROUNDS}.process.env`));
                const res = yield conn.query(sql, [user.username, hash]);
                conn.release();
                return res.rows[0];
            }
            catch (error) {
                throw new Error(`Could not add user" ${error}`);
            }
        });
    }
    update(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE users SET username=($1), password=($2), isAdmin=($3) WHERE id=($4) RETURNING *;';
                const conn = yield database_1.default.connect();
                const hash = bcrypt_1.default.hashSync(user.password + `${PEPPER}`, parseInt(`${SALT_ROUNDS}`));
                const res = yield conn.query(sql, [user.username, hash, user.isAdmin, user.id]);
                conn.release();
                return res.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update user: ${error}`);
            }
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1);';
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete user: ${error}`);
            }
        });
    }
    authenticate(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE username=($1);';
                const conn = yield database_1.default.connect();
                const res = yield conn.query(sql, [username]);
                if (res.rows.length) {
                    bcrypt_1.default.compareSync(password + `${PEPPER}`, res.rows[0].passowrd);
                    return res.rows[0];
                }
                return null;
            }
            catch (error) {
                throw new Error(`Could not authenticate: ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
//# sourceMappingURL=user.js.map