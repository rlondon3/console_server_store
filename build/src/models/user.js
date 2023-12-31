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
    async index() {
        try {
            const sql = 'SELECT * FROM users;';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (error) {
            throw new Error(`Can't retrieve users: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Can't find user: ${error}`);
        }
    }
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstname, lastname, email, address, username, password, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password + `${PEPPER}.processs.env`, parseInt(`${SALT_ROUNDS}.process.env`));
            const res = await conn.query(sql, [user.firstname, user.lastname, user.email, user.address, user.username, hash, user.isAdmin]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add user" ${error}`);
        }
    }
    // tslint:disable-next-line: no-unused-variable
    async update(user, _id) {
        try {
            const sql = 'UPDATE users SET firstname=($1), lastname=($2), email=($3), address=($4), username=($5), password=($6), isAdmin=($7) WHERE id=($8) RETURNING *';
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(user.password + `${PEPPER}`, parseInt(`${SALT_ROUNDS}`));
            const res = await conn.query(sql, [user.firstname, user.lastname, user.email, user.address, user.username, hash, user.isAdmin, user.id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not update user: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1);';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete user: ${error}`);
        }
    }
    async authenticate(username, password) {
        try {
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [username]);
            if (res.rows.length) {
                bcrypt_1.default.compareSync(password + `${PEPPER}`, res.rows[0].password);
                return res.rows[0];
            }
            return null;
        }
        catch (error) {
            throw new Error(`Could not authenticate: ${error}`);
        }
    }
    async emailExists(email) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT COUNT(*) FROM users WHERE email = $1';
            const res = await conn.query(sql, [email]);
            if (res.rows) {
                return parseInt(res.rows[0].count) > 0;
            }
            return false;
        }
        finally {
            conn.release();
        }
    }
    async usernameExists(username) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT COUNT(*) FROM users WHERE username = $1';
            const res = await conn.query(sql, [username]);
            if (res.rows) {
                return parseInt(res.rows[0].count) > 0;
            }
            return false;
        }
        finally {
            conn.release();
        }
    }
}
exports.UserStore = UserStore;
//# sourceMappingURL=user.js.map