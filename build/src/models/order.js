"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const sql = 'SELECT * FROM orders';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (error) {
            throw new Error(`Could not get orders: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find orders: ${error}`);
        }
    }
    async create(order) {
        try {
            const sql = 'INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [order.order_status, order.user_id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add order: ${error}`);
        }
    }
    async productOrdered(add) {
        let conn;
        try {
            conn = await database_1.default.connect();
            const sqlOrderStatus = 'SELECT order_status FROM orders WHERE id = $1';
            const resultOrderStatus = await conn.query(sqlOrderStatus, [add.order_id]);
            if (resultOrderStatus.rows.length === 0) {
                throw new Error('Order not found.');
            }
            const orderStatus = resultOrderStatus.rows[0].order_status;
            if (orderStatus !== 'active' && orderStatus !== 'open') {
                throw new Error('Could not place order. Order status is not active or open.');
            }
            const sqlInsert = 'INSERT INTO products_ordered (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            await conn.query(sqlInsert, [add.order_id, add.product_id, add.quantity]);
            const sqlCheckQuantity = 'SELECT qty FROM products WHERE id = $1 FOR UPDATE';
            const sqlUpdateQuantity = 'UPDATE products SET qty = qty - $1 WHERE id = $2 RETURNING qty';
            const resultCheckQuantity = await conn.query(sqlCheckQuantity, [add.product_id]);
            const currentQuantity = resultCheckQuantity.rows[0].quantity;
            if (currentQuantity < add.quantity) {
                throw new Error('Insufficient stock! Change quantity or try back later.');
            }
            const resultUpdateQuantity = await conn.query(sqlUpdateQuantity, [add.quantity, add.product_id]);
            conn.release();
            return resultUpdateQuantity.rows[0];
        }
        catch (error) {
            if (conn) {
                conn.release();
            }
            throw new Error(`Error processing product order: ${error.message}`);
        }
    }
    async update(order) {
        try {
            const sql = 'UPDATE orders SET user_id=($1), order_status=($2) WHERE id=($3) RETURNING *';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [
                order.user_id,
                order.order_status,
                order.id
            ]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`COuld not update order: ${order}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete order: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
//# sourceMappingURL=order.js.map