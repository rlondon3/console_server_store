"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const sql = 'SELECT * FROM products';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (error) {
            throw new Error(`Could not get products: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find product: ${error}`);
        }
    }
    async create(product) {
        try {
            const sql = 'INSERT INTO products (name, description, price, qty) VALUES ($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [
                product.name,
                product.description,
                product.price,
                product.qty
            ]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create product: ${error}`);
        }
    }
    async update(product) {
        try {
            const sql = 'UPDATE products SET name=($1), description=($2), price=($3), qty=($4) WHERE id=($5) RETURNING *';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [
                product.name,
                product.description,
                product.price,
                product.qty,
                product.id
            ]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not update product: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete product: ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
//# sourceMappingURL=product.js.map